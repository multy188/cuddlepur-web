import { useCallback } from 'react';
import { useAuthApi } from './useAuthApi';
import { formatUserDataForApi, getAuthToken } from '@/utils/authHelpers';
import { AuthStep, UserInfo, Preferences } from '@/types/auth';

interface UseFormHandlersProps {
  userInfo: UserInfo;
  preferences: Preferences;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
  login: (token: string, user: any) => void;
}

export const useFormHandlers = ({
  userInfo,
  preferences,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
  login
}: UseFormHandlersProps) => {
  const api = useAuthApi();

  const handleBasicInfoSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication required');

      const data = await api.updateProfile(token, formatUserDataForApi(userInfo));
      
      if (data.user && login) {
        login(token, data.user);
      }
      
      setCurrentStep("preferences");
    } catch (error: any) {
      setError(error.message || 'Unable to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, clearError, api, login, setIsLoading, setError, setCurrentStep]);

  const handlePreferencesSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validate required fields
    const requiredFields = ['whatFriendsSay', 'drinking', 'smoking', 'married', 'occupation'];
    const missingFields = requiredFields.filter(field => !preferences[field as keyof Preferences]);
    
    if (missingFields.length > 0) {
      setError(`Please complete all fields: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication required');

      const data = await api.updateProfile(token, { preferences });
      
      if (data.user && login) {
        login(token, data.user);
      }
      
      // Update localStorage with new user data including preferences
      const currentUser = localStorage.getItem('cuddlepur_user');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        userData.preferences = preferences;
        localStorage.setItem('cuddlepur_user', JSON.stringify(userData));
      }
      
      setCurrentStep("photos");
    } catch (error: any) {
      setError(error.message || 'Unable to save your preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [preferences, clearError, api, login, setIsLoading, setError, setCurrentStep]);

  return {
    handleBasicInfoSubmit,
    handlePreferencesSubmit
  };
};