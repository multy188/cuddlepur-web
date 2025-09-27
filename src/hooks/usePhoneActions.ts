import { useCallback } from 'react';
import { useSendVerificationCode, useVerifyCode } from './useAuth';
import { validatePhoneNumber } from '@/utils/authValidation';
import { AuthStep } from '@/types/auth';
import { PhoneFormData } from '@/schemas/authSchemas';

interface UsePhoneActionsProps {
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
  startResendTimer: () => void;
}

export const usePhoneActions = ({
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
  startResendTimer
}: UsePhoneActionsProps) => {
  const sendCodeMutation = useSendVerificationCode();
  const verifyCodeMutation = useVerifyCode();

  const sendVerificationCode = useCallback(async (data: PhoneFormData) => {
    clearError();
    setIsLoading(true);
    
    try {
      const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
      
      // Validate phone number
      const validationError = validatePhoneNumber(data.phoneNumber);
      if (validationError) {
        setError(validationError);
        return;
      }

      await sendCodeMutation.mutateAsync({ phoneNumber: fullPhoneNumber });
      
      // Store phone data temporarily for OTP step
      localStorage.setItem('temp_phone_number', data.phoneNumber);
      localStorage.setItem('temp_country_code', data.countryCode);
      
      // Start resend timer and move to OTP step
      startResendTimer();
      setCurrentStep("otp");
    } catch (error: any) {
      setError(error.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sendCodeMutation, clearError, setIsLoading, setError, setCurrentStep, startResendTimer]);

  const verifyOtpCode = useCallback(async (phoneNumber: string, countryCode: string, otpCode: string) => {
    clearError();
    setIsLoading(true);
    
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const data = await verifyCodeMutation.mutateAsync({ 
        phoneNumber: fullPhoneNumber, 
        code: otpCode 
      });
      
      if (data.success && data.token && data.user) {
        // Clean up temporary phone data
        localStorage.removeItem('temp_phone_number');
        localStorage.removeItem('temp_country_code');
        
        setCurrentStep("basicInfo");
      }
    } catch (error: any) {
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [verifyCodeMutation, clearError, setIsLoading, setError, setCurrentStep]);

  const resendCode = useCallback(async (phoneNumber: string, countryCode: string) => {
    clearError();
    setIsLoading(true);
    
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      await sendCodeMutation.mutateAsync({ phoneNumber: fullPhoneNumber });
      startResendTimer();
    } catch (error: any) {
      setError(error.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sendCodeMutation, clearError, setIsLoading, setError, startResendTimer]);

  return {
    sendVerificationCode,
    verifyOtpCode,
    resendCode
  };
};