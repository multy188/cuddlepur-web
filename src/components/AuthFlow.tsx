import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Types
import { AuthFlowProps, UserInfo, Preferences } from "@/types/auth";

// Hooks
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { usePhoneHandlers } from "@/hooks/usePhoneHandlers";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { usePhotoHandlers } from "@/hooks/usePhotoHandlers";
import { useLocationHandlers } from "@/hooks/useLocationHandlers";

// Components
import AuthHeader from "@/components/auth/AuthHeader";
import AuthStepRenderer from "@/components/auth/AuthStepRenderer";

const AuthFlow = ({ onComplete, onBack, onNavigateTerms, onNavigatePrivacy }: AuthFlowProps) => {
  const { login } = useAuth();
  
  // State management
  const state = useAuthState();
  
  // Auth flow logic
  const { handleSignOut, signOutPending, isAuthenticated } = useAuthFlow({
    setCurrentStep: state.setCurrentStep,
    setError: state.setError,
    setUserInfo: state.setUserInfo,
    setPreferences: state.setPreferences
  });

  // Phone handlers
  const phoneHandlers = usePhoneHandlers({
    phoneNumber: state.phoneNumber,
    countryCode: state.countryCode,
    otpCode: state.otpCode,
    clearError: state.clearError,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    setCurrentStep: state.setCurrentStep,
    startResendTimer: state.startResendTimer,
    login
  });

  // Form handlers
  const formHandlers = useFormHandlers({
    userInfo: state.userInfo,
    preferences: state.preferences,
    clearError: state.clearError,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    setCurrentStep: state.setCurrentStep,
    login
  });

  // Photo handlers
  const photoHandlers = usePhotoHandlers({
    uploadedPhotos: state.uploadedPhotos,
    setUploadedPhotos: state.setUploadedPhotos,
    clearError: state.clearError,
    setIsLoading: state.setIsLoading,
    setError: state.setError,
    onComplete
  });

  // Location handlers
  const locationHandlers = useLocationHandlers({
    userInfo: state.userInfo,
    filteredSuggestions: state.filteredSuggestions,
    setUserInfo: state.setUserInfo,
    setFilteredSuggestions: state.setFilteredSuggestions,
    setShowSuggestions: state.setShowSuggestions
  });

  // Preferences change handler
  const handlePreferencesChange = useCallback((field: keyof Preferences, value: string | boolean) => {
    state.setPreferences(prev => ({ ...prev, [field]: value }));
  }, [state.setPreferences]);

  return (
    <div className="min-h-screen bg-background p-4">
      <AuthHeader
        currentStep={state.currentStep}
        isAuthenticated={isAuthenticated}
        signOutPending={signOutPending}
        onBack={onBack}
        onSignOut={handleSignOut}
      />
      <div className="animate-in fade-in-50">
        <AuthStepRenderer
          // State
          currentStep={state.currentStep}
          isLoading={state.isLoading}
          error={state.error}
          phoneNumber={state.phoneNumber}
          countryCode={state.countryCode}
          otpCode={state.otpCode}
          resendTimer={state.resendTimer}
          userInfo={state.userInfo}
          preferences={state.preferences}
          uploadedPhotos={state.uploadedPhotos}
          filteredSuggestions={state.filteredSuggestions}
          showSuggestions={state.showSuggestions}
          
          // State setters
          setPhoneNumber={state.setPhoneNumber}
          setCountryCode={state.setCountryCode}
          setOtpCode={state.setOtpCode}
          
          // Handlers
          phoneHandlers={phoneHandlers}
          formHandlers={formHandlers}
          photoHandlers={photoHandlers}
          locationHandlers={locationHandlers}
          onPreferencesChange={handlePreferencesChange}
          
          // Navigation
          onNavigateTerms={onNavigateTerms}
          onNavigatePrivacy={onNavigatePrivacy}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default AuthFlow;