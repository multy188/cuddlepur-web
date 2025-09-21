import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

interface SendCodeRequest {
  phoneNumber: string;
}

interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

interface VerifyCodeResponse {
  success: boolean;
  message: string;
  token: string;
  user: any;
}

// Send verification code
export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: async (data: SendCodeRequest) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/send-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          let errorMessage = 'Unable to send verification code';
          
          try {
            const error = await response.json();
            errorMessage = error.error || error.message || errorMessage;
          } catch (e) {
            // If response is not JSON, use status-based messages
            if (response.status === 429) {
              errorMessage = 'Too many attempts. Please try again in a few minutes.';
            } else if (response.status === 400) {
              errorMessage = 'Please check your phone number and try again.';
            } else if (response.status >= 500) {
              errorMessage = 'Our servers are experiencing issues. Please try again shortly.';
            } else {
              errorMessage = 'Unable to send verification code. Please try again.';
            }
          }
          
          throw new Error(errorMessage);
        }

        return response.json();
      } catch (error: any) {
        // Handle network errors and fetch failures
        if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
          throw new Error('Please check your internet connection and try again.');
        }
        
        // Re-throw other errors as-is
        throw error;
      }
    }
  });
};

// Verify code and authenticate
export const useVerifyCode = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          let errorMessage = 'Unable to verify code';
          
          try {
            const error = await response.json();
            errorMessage = error.error || error.message || errorMessage;
          } catch (e) {
            // If response is not JSON, use status-based messages
            if (response.status === 400) {
              errorMessage = 'The verification code is invalid or has expired. Please try again.';
            } else if (response.status === 429) {
              errorMessage = 'Too many attempts. Please wait a few minutes before trying again.';
            } else if (response.status >= 500) {
              errorMessage = 'Our servers are experiencing issues. Please try again shortly.';
            } else {
              errorMessage = 'Unable to verify code. Please try again.';
            }
          }
          
          throw new Error(errorMessage);
        }

        return response.json();
      } catch (error: any) {
        // Handle network errors and fetch failures
        if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
          throw new Error('Please check your internet connection and try again.');
        }
        
        // Re-throw other errors as-is
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.success && data.token && data.user) {
        login(data.token, data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    }
  });
};

// Update user profile
export const useUpdateProfile = () => {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.user) {
        updateUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    }
  });
};

// Sign out
export const useSignOut = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Perform client-side logout only (no server call needed for JWT)
      // This avoids rate limiting issues and is more efficient
      return { success: true };
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
    }
  });
};

// Get current user
export const useCurrentUser = () => {
  const { token, user } = useAuth();

  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: async () => {
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch user');
      }

      const data = await response.json();
      return data.user;
    },
    enabled: !!token,
    initialData: user,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};