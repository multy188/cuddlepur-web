import { useCallback } from 'react';
import { useUpdateProfile } from './useAuth';
import { formatUserDataForApi } from '@/utils/authHelpers';
import { AuthStep, UserInfo, Preferences } from '@/types/auth';

interface UseFormHandlersProps {
  userInfo: UserInfo;
  preferences: Preferences;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void; 
}

export const useFormHandlers = ({
  userInfo,
  preferences,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep, 
}: UseFormHandlersProps) => {
  const updateProfileMutation = useUpdateProfile();

  const handleBasicInfoSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      await updateProfileMutation.mutateAsync(formatUserDataForApi(userInfo));
      setCurrentStep("preferences");
    } catch (error: any) {
      setError(error.message || 'Unable to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, clearError, updateProfileMutation, setIsLoading, setError, setCurrentStep]);

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
      await updateProfileMutation.mutateAsync({ preferences });
      setCurrentStep("photos");
    } catch (error: any) {
      setError(error.message || 'Unable to save your preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [preferences, clearError, updateProfileMutation, setIsLoading, setError, setCurrentStep]);

  return {
    handleBasicInfoSubmit,
    handlePreferencesSubmit
  };
};