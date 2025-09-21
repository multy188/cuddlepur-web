import { useCallback } from 'react';
import { clearAuthStorage } from '@/utils/authHelpers';

interface ApiError extends Error {
  status?: number;
}

export const useAuthApi = () => {
  const makeApiCall = useCallback(async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch {
        if (response.status === 401) {
          clearAuthStorage();
          errorMessage = 'Session expired. Please verify your phone number again.';
        } else if (response.status === 429) {
          errorMessage = 'Too many attempts. Please try again in a few minutes.';
        } else if (response.status >= 500) {
          errorMessage = 'Our servers are experiencing issues. Please try again shortly.';
        } else {
          errorMessage = 'Please try again.';
        }
      }
      
      const apiError = new Error(errorMessage) as ApiError;
      apiError.status = response.status;
      throw apiError;
    }

    return response.json();
  }, []);

  const sendVerificationCode = useCallback(async (phoneNumber: string) => {
    return makeApiCall('http://localhost:3001/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    });
  }, [makeApiCall]);

  const verifyCode = useCallback(async (phoneNumber: string, code: string) => {
    return makeApiCall('http://localhost:3001/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, code })
    });
  }, [makeApiCall]);

  const updateProfile = useCallback(async (token: string, data: any) => {
    return makeApiCall('http://localhost:3001/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  }, [makeApiCall]);

  const uploadPhotos = useCallback(async (token: string, formData: FormData) => {
    return makeApiCall('http://localhost:3001/api/user/photos', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
  }, [makeApiCall]);

  const validateToken = useCallback(async (token: string) => {
    return makeApiCall('http://localhost:3001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }, [makeApiCall]);

  return {
    sendVerificationCode,
    verifyCode,
    updateProfile,
    uploadPhotos,
    validateToken
  };
};