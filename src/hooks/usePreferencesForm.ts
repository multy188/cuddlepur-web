import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { preferencesSchema, PreferencesFormData } from '@/schemas/authSchemas';
import { useUpdateProfile } from './useAuth';
import { useAuth } from '@/contexts/AuthContext';
import { AuthStep } from '@/types/auth';

interface UsePreferencesFormProps {
  setCurrentStep: (step: AuthStep) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const usePreferencesForm = ({
  setCurrentStep,
  setIsLoading,
  setError,
  clearError
}: UsePreferencesFormProps) => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      openToIncall: user?.preferences?.openToIncall || false,
      openToOutcall: user?.preferences?.openToOutcall || false,
      whatFriendsSay: user?.preferences?.whatFriendsSay || "",
      drinking: user?.preferences?.drinking || "",
      smoking: user?.preferences?.smoking || "",
      married: user?.preferences?.married || "",
      occupation: user?.preferences?.occupation || ""
    },
    mode: "onChange"
  });

  const handleSubmit = async (data: PreferencesFormData) => {
    clearError();
    
    // Validate required fields
    const requiredFields = ['whatFriendsSay', 'drinking', 'smoking', 'married', 'occupation'];
    const missingFields = requiredFields.filter(field => !data[field as keyof PreferencesFormData]);
    
    if (missingFields.length > 0) {
      setError(`Please complete all fields: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Submitting preferences data:', data);
      const result = await updateProfileMutation.mutateAsync({ preferences: data });
      console.log('Update result:', result);
      setCurrentStep("photos");
    } catch (error: any) {
      console.error('Preferences update error:', error);
      setError(error.message || 'Unable to save your preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit
  };
};