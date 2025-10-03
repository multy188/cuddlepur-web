import { useState, useCallback } from 'react';

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
  const [isSaving, setIsSaving] = useState(false);

  // Get preferences from localStorage
  const getPreferences = useCallback((): SearchPreferences | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((preferences: SearchPreferences) => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setIsSaving(false);
  }, []);

  return {
    preferences: getPreferences(),
    isLoading: false,
    savePreferences,
    isSaving,
  };
}
