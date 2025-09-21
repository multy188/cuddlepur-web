import { useCallback } from 'react';
import { useAuthApi } from './useAuthApi';
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
  login: (token: string, user: any) => void;
}

export const usePhoneHandlers = ({
  phoneNumber,
  countryCode,
  otpCode,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
  startResendTimer,
  login
}: UsePhoneHandlersProps) => {
  const api = useAuthApi();

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
      await api.sendVerificationCode(countryCode + phoneNumber);
      setCurrentStep("otp");
      startResendTimer();
    } catch (error: any) {
      setError(error.message || 'Unable to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, countryCode, clearError, api, startResendTimer, setIsLoading, setError, setCurrentStep]);

  const handleOtpSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      const data = await api.verifyCode(countryCode + phoneNumber, otpCode);
      
      if (data.token && data.user) {
        login(data.token, data.user);
        setCurrentStep("basicInfo");
      }
    } catch (error: any) {
      setError(error.message || 'Unable to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [otpCode, countryCode, phoneNumber, clearError, api, login, setIsLoading, setError, setCurrentStep]);

  const handleResendCode = useCallback(async () => {
    clearError();
    
    try {
      await api.sendVerificationCode(countryCode + phoneNumber);
      startResendTimer();
    } catch (error: any) {
      setError(error.message || 'Unable to resend code. Please try again.');
    }
  }, [countryCode, phoneNumber, clearError, api, startResendTimer, setError]);

  return {
    handlePhoneSubmit,
    handleOtpSubmit,
    handleResendCode
  };
};