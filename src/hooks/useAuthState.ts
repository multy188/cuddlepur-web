import { useState, useCallback } from 'react';
import { AuthStep, UserInfo, Preferences } from '@/types/auth';
import { VALIDATION_RULES } from '@/constants/auth';

export const useAuthState = () => {
  // Step state
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Phone step state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+233");
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Form data state
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    location: ""
  });

  const [preferences, setPreferences] = useState<Preferences>({
    openToIncall: false,
    openToOutcall: false,
    whatFriendsSay: "",
    drinking: "",
    smoking: "",
    married: "",
    occupation: ""
  });

  // Photo upload state
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  // Location suggestions state
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Utility functions
  const clearError = useCallback(() => setError(""), []);

  const startResendTimer = useCallback(() => {
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
  }, []);

  return {
    // State
    currentStep, setCurrentStep,
    isLoading, setIsLoading,
    error, setError,
    phoneNumber, setPhoneNumber,
    countryCode, setCountryCode,
    otpCode, setOtpCode,
    resendTimer,
    userInfo, setUserInfo,
    preferences, setPreferences,
    uploadedPhotos, setUploadedPhotos,
    filteredSuggestions, setFilteredSuggestions,
    showSuggestions, setShowSuggestions,
    
    // Utilities
    clearError,
    startResendTimer
  };
};