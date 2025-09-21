import { AuthStep, UserInfo, Preferences } from "./auth";

export interface AuthStepRendererProps {
  // State
  currentStep: AuthStep;
  isLoading: boolean;
  error: string;
  phoneNumber: string;
  countryCode: string;
  otpCode: string;
  resendTimer: number;
  userInfo: UserInfo;
  preferences: Preferences;
  uploadedPhotos: File[];
  filteredSuggestions: string[];
  showSuggestions: boolean;
  
  // State setters
  setPhoneNumber: (value: string) => void;
  setCountryCode: (value: string) => void;
  setOtpCode: (value: string) => void;
  
  // Handlers
  phoneHandlers: {
    handlePhoneSubmit: (e: React.FormEvent) => void;
    handleOtpSubmit: (e: React.FormEvent) => void;
    handleResendCode: () => void;
  };
  formHandlers: {
    handleBasicInfoSubmit: (e: React.FormEvent) => void;
    handlePreferencesSubmit: (e: React.FormEvent) => void;
  };
  photoHandlers: {
    handlePhotoUpload: (files: FileList | null) => void;
    removePhoto: (index: number) => void;
    handlePhotoSubmit: () => void;
  };
  locationHandlers: {
    handleLocationChange: (value: string) => void;
    handleLocationFocus: () => void;
    handleLocationBlur: () => void;
    handleSuggestionClick: (city: string) => void;
    handleUserInfoChange: (field: keyof UserInfo, value: string) => void;
  };
  onPreferencesChange: (field: keyof Preferences, value: string | boolean) => void;
  
  // Navigation
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
  onComplete: () => void;
}