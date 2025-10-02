import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface SearchPreferences {
  location: string;
  gender: string;
  relationshipStatus: string;
  hasPicture: boolean;
  ageRange: [number, number];
  rateRange: [number, number];
  availability: string;
  userType: string;
  radius: number;
}

const STORAGE_KEY = 'cuddlepur_search_preferences';

export function useSearchPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch preferences from API
  const { data, isLoading } = useQuery({
    queryKey: ['searchPreferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${API_URL}/api/user/search-preferences`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // If unauthorized or error, return null (will fall back to localStorage)
      if (!response.ok) {
        console.log('Failed to fetch preferences from API, using localStorage fallback');
        return null;
      }

      const result = await response.json();

      // Store in localStorage as backup
      if (result.preferences) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.preferences));
      }

      return result.preferences as SearchPreferences | null;
    },
    enabled: !!user?.id,
    retry: false, // Don't retry on failure
  });

  // Save preferences mutation
  const savePreferencesMutation = useMutation({
    mutationFn: async (preferences: SearchPreferences) => {
      // Save to localStorage immediately
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));

      if (!user?.id) {
        return { success: true };
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token, preferences saved to localStorage only');
        return { success: true };
      }

      const response = await fetch(`${API_URL}/api/user/search-preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        console.log('Failed to save preferences to API, but saved to localStorage');
        return { success: true }; // Don't throw - localStorage save succeeded
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchPreferences', user?.id] });
    },
  });

  // Get preferences (API first, then localStorage fallback)
  const getPreferences = (): SearchPreferences | null => {
    if (data) return data;

    // Fallback to localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }

    return null;
  };

  return {
    preferences: getPreferences(),
    isLoading,
    savePreferences: savePreferencesMutation.mutate,
    isSaving: savePreferencesMutation.isPending,
  };
}
