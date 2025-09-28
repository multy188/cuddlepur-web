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
      // Remove leading 0 from phone number if it exists (for international format)
      const phoneNumberWithoutLeadingZero = phoneNumber.startsWith('0') 
        ? phoneNumber.substring(1) 
        : phoneNumber;
      
      await sendCodeMutation.mutateAsync({ phoneNumber: countryCode + phoneNumberWithoutLeadingZero });
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
        phoneNumber: countryCode + (phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber), 
        code: otpCode 
      });
      
      if (data.success && data.token && data.user) {
        // Always go to basicInfo after successful verification
        // The Auth page will handle redirect to dashboard if registration is already complete
        setCurrentStep("basicInfo");
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
      // Remove leading 0 from phone number if it exists (for international format)
      const phoneNumberWithoutLeadingZero = phoneNumber.startsWith('0') 
        ? phoneNumber.substring(1) 
        : phoneNumber;
      
      await sendCodeMutation.mutateAsync({ phoneNumber: countryCode + phoneNumberWithoutLeadingZero });
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