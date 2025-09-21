import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

const useAuthenticatedFetch = () => {
  const { token } = useAuth();

  return async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };
};

// Search professionals
export const useProfessionals = (searchParams: {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
} = {}) => {
  const authenticatedFetch = useAuthenticatedFetch();

  const queryString = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  });

  return useQuery({
    queryKey: ['professionals', searchParams],
    queryFn: () => authenticatedFetch(`/user/search/professionals?${queryString}`),
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

// Get user by ID
export const useUser = (userId: string) => {
  const authenticatedFetch = useAuthenticatedFetch();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => authenticatedFetch(`/user/${userId}`),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Get user's bookings
export const useBookings = (status?: string, page = 1, limit = 20) => {
  const authenticatedFetch = useAuthenticatedFetch();

  const queryString = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status && { status })
  });

  return useQuery({
    queryKey: ['bookings', status, page, limit],
    queryFn: () => authenticatedFetch(`/booking/my-bookings?${queryString}`),
    staleTime: 30 * 1000 // 30 seconds
  });
};

// Get booking by ID
export const useBooking = (bookingId: string) => {
  const authenticatedFetch = useAuthenticatedFetch();

  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => authenticatedFetch(`/booking/${bookingId}`),
    enabled: !!bookingId,
    staleTime: 30 * 1000 // 30 seconds
  });
};

// Create booking
export const useCreateBooking = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: any) =>
      authenticatedFetch('/booking', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
};

// Update booking status
export const useUpdateBookingStatus = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
      authenticatedFetch(`/booking/${bookingId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),
    onSuccess: (_, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
};

// Toggle availability (professionals only)
export const useToggleAvailability = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (isAvailable: boolean) =>
      authenticatedFetch('/user/availability', {
        method: 'PATCH',
        body: JSON.stringify({ isAvailable })
      }),
    onSuccess: (data) => {
      if (data.success && data.user) {
        updateUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    }
  });
};