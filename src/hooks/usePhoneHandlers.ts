import { useCallback } from 'react';
import { useSendVerificationCode, useVerifyCode } from './useAuth';
import { validatePhoneNumber } from '@/utils/authValidation';
import { AuthStep } from '@/types/auth';

interface UsePhoneHandlersProps {
  phoneNumber: string;
  countryCode: string;
  otpCode: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
  startResendTimer: () => void;
}

export const usePhoneHandlers = ({
  phoneNumber,
  countryCode,
  otpCode,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
  startResendTimer
}: UsePhoneHandlersProps) => {
  const sendCodeMutation = useSendVerificationCode();
  const verifyCodeMutation = useVerifyCode();

  const handlePhoneSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }
    
    try {
      await sendCodeMutation.mutateAsync({ phoneNumber: countryCode + phoneNumber });
      setCurrentStep("otp");
      startResendTimer();
    } catch (error: any) {
      setError(error.message || 'Unable to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, countryCode, clearError, sendCodeMutation, startResendTimer, setIsLoading, setError, setCurrentStep]);

  const handleOtpSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      const data = await verifyCodeMutation.mutateAsync({ 
        phoneNumber: countryCode + phoneNumber, 
        code: otpCode 
      });
      
      if (data.success && data.token && data.user) {
        // Check if user has already completed registration
        const isRegistrationComplete = (user: any) => {
          if (!user) return false;
          
          // Check basic info
          if (!user.firstName || !user.lastName || !user.dateOfBirth || !user.city) {
            return false;
          }
          
          // Check preferences
          if (!user.preferences?.whatFriendsSay || !user.preferences?.drinking || 
              !user.preferences?.smoking || !user.preferences?.married || !user.preferences?.occupation) {
            return false;
          }
          
          // Check photos step completion (either has photos or explicitly skipped)
          if (!user.photos?.length && !user.photosSkipped) {
            return false;
          }
          
          return true;
        };

        // If registration is complete, the AuthWrapper will redirect to dashboard
        // Otherwise, continue with registration flow
        if (!isRegistrationComplete(data.user)) {
          setCurrentStep("basicInfo");
        }
        // If registration is complete, don't set step - let AuthWrapper handle dashboard redirect
      }
    } catch (error: any) {
      setError(error.message || 'Unable to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [otpCode, countryCode, phoneNumber, clearError, verifyCodeMutation, setIsLoading, setError, setCurrentStep]);

  const handleResendCode = useCallback(async () => {
    clearError();
    
    try {
      await sendCodeMutation.mutateAsync({ phoneNumber: countryCode + phoneNumber });
      startResendTimer();
    } catch (error: any) {
      setError(error.message || 'Unable to resend code. Please try again.');
    }
  }, [countryCode, phoneNumber, clearError, sendCodeMutation, startResendTimer, setError]);

  return {
    handlePhoneSubmit,
    handleOtpSubmit,
    handleResendCode
  };
};