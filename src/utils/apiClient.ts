import { clearAuthStorage } from './authHelpers';

interface ApiError extends Error {
  status?: number;
}

export const makeApiCall = async (url: string, options: RequestInit) => {
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
};