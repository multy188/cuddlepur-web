import { useCallback } from 'react';
import { useSendVerificationCode, useVerifyCode } from './useAuth';
import { validatePhoneNumber, processPhoneNumberForCountry } from '@/utils/authValidation';
import { AuthStep } from '@/types/auth';
import { PhoneFormData } from '@/schemas/authSchemas';

interface UsePhoneActionsProps {
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

export const usePhoneActions = ({
  setIsLoading,
  setError,
  setCurrentStep,
}: UsePhoneActionsProps) => {
  const sendCodeMutation = useSendVerificationCode();
  const verifyCodeMutation = useVerifyCode();

  const sendVerificationCode = useCallback(async (data: PhoneFormData) => {
    setError('')
    setIsLoading(true);

    try {
      // Validate phone number
      const validationError = validatePhoneNumber(data.phoneNumber);
      if (validationError) {
        setError(validationError);
        return;
      }

      const processedPhoneNumber = processPhoneNumberForCountry(data.phoneNumber, data.countryCode);
      const fullPhoneNumber = `${data.countryCode}${processedPhoneNumber}`;

      await sendCodeMutation.mutateAsync({ phoneNumber: fullPhoneNumber });

      // Store phone data temporarily for OTP step
      localStorage.setItem('temp_phone_number', data.phoneNumber);
      localStorage.setItem('temp_country_code', data.countryCode);

      setCurrentStep("otp");
    } catch (error: any) {
      setError(error.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sendCodeMutation, setIsLoading, setError, setCurrentStep]);

  const verifyOtpCode = useCallback(async (phoneNumber: string, countryCode: string, otpCode: string) => {
    setError('')
    setIsLoading(true);

    try {
      const processedPhoneNumber = processPhoneNumberForCountry(phoneNumber, countryCode);
      const fullPhoneNumber = `${countryCode}${processedPhoneNumber}`;
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
  }, [verifyCodeMutation, setIsLoading, setError, setCurrentStep]);

  const resendCode = useCallback(async (phoneNumber: string, countryCode: string) => {
    setError('')
    setIsLoading(true);

    try {
      const processedPhoneNumber = processPhoneNumberForCountry(phoneNumber, countryCode);
      const fullPhoneNumber = `${countryCode}${processedPhoneNumber}`;
      await sendCodeMutation.mutateAsync({ phoneNumber: fullPhoneNumber });
    } catch (error: any) {
      setError(error.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sendCodeMutation, setIsLoading, setError]);

  return {
    sendVerificationCode,
    verifyOtpCode,
    resendCode
  };
};