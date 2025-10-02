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

    console.log(`🔍 Making request to: ${API_BASE_URL}${url}`);
    console.log(`🔑 Token present: ${!!token}`);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Request failed:`, errorText);
      let error;
      try {
        error = JSON.parse(errorText);
      } catch (e) {
        error = { error: errorText };
      }
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };
};

// Search users (cuddlers and professionals)
export const useUsers = (searchParams: {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  userType?: string;
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
    queryKey: ['users', searchParams],
    queryFn: () => authenticatedFetch(`/user/search?${queryString}`),
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

// Legacy alias for backward compatibility
export const useProfessionals = (searchParams: {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
} = {}) => {
  // Add userType: 'PROFESSIONAL' to maintain backward compatibility
  return useUsers({ ...searchParams, userType: 'PROFESSIONAL' });
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

// User Photos Management
export interface UserPhoto {
  id: string;
  url: string;
  order: number;
  isProfilePicture: boolean;
  createdAt: string;
}

// Get user photos
export const useUserPhotos = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { token } = useAuth();

  return useQuery({
    queryKey: ['userPhotos'],
    queryFn: async () => {
      const response = await authenticatedFetch('/user/photos');
      return response.photos as UserPhoto[];
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Upload photos
export const useUploadPhotos = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${API_BASE_URL}/user/photos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload photos');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPhotos'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    }
  });
};

// Delete photo
export const useDeletePhoto = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: string) =>
      authenticatedFetch(`/user/photos/${photoId}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPhotos'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    }
  });
};

// Set profile picture
export const useSetProfilePicture = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: string) =>
      authenticatedFetch(`/user/photos/${photoId}/profile-picture`, {
        method: 'PUT'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPhotos'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    }
  });
};

// Messaging - conversations (from Socket.IO service on port 3002)
const SOCKET_API_BASE_URL = 'http://localhost:3002/api';

export const useConversations = (userId: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: async () => {
      const response = await fetch(`${SOCKET_API_BASE_URL}/conversations/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      return response.json();
    },
    enabled: !!userId && !!token,
    staleTime: 30 * 1000 // 30 seconds
  });
};

// Get messages between two users
export const useMessages = (userId: string, otherUserId: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['messages', userId, otherUserId],
    queryFn: async () => {
      const response = await fetch(`${SOCKET_API_BASE_URL}/messages/${userId}/${otherUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    },
    enabled: !!userId && !!otherUserId && !!token,
    staleTime: 10 * 1000 // 10 seconds
  });
};

// Submit ID verification
export const useSubmitIdVerification = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${API_BASE_URL}/auth/verify-id`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit ID verification');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    }
  });
};

// Get presigned URL for image upload
export const useGetImageUploadUrl = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${SOCKET_API_BASE_URL}/messages/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      return response.json() as Promise<{ uploadURL: string; imageUrl: string; key: string }>;
    },
  });
};

// Upload image directly to S3 using presigned URL
export const useUploadToS3 = () => {
  return useMutation({
    mutationFn: async ({ file, uploadURL }: { file: File; uploadURL: string }) => {
      const response = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to S3');
      }

      return response;
    },
  });
};