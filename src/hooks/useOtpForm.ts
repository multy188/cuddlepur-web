import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, OtpFormData } from '@/schemas/authSchemas';
import { usePhoneActions } from './usePhoneActions';
import { useAuth } from '@/contexts/AuthContext';
import { AuthStep } from '@/types/auth';
import { VALIDATION_RULES } from '@/constants/auth';

interface UseOtpFormProps {
  phoneNumber: string;
  countryCode: string;
  setCurrentStep: (step: AuthStep) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useOtpForm = ({
  phoneNumber,
  countryCode,
  setCurrentStep,
  setIsLoading,
  setError,
  clearError
}: UseOtpFormProps) => {
  const { login } = useAuth();
  const [resendTimer, setResendTimer] = useState(0);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otpCode: ""
    },
    mode: "onChange"
  });

  const startResendTimer = () => {
    setResendTimer(VALIDATION_RULES.RESEND_TIMER_DURATION);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const phoneActions = usePhoneActions({
    clearError,
    setIsLoading,
    setError,
    setCurrentStep,
    startResendTimer,
    login
  });

  const handleOtpSubmit = (data: OtpFormData) => {
    phoneActions.verifyOtpCode(phoneNumber, countryCode, data.otpCode);
  };

  const handleResendCode = () => {
    phoneActions.resendCode(phoneNumber, countryCode);
  };

  return {
    form,
    resendTimer,
    handleOtpSubmit,
    handleResendCode
  };
};