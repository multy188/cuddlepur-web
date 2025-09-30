// Hooks
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useState, useEffect, useCallback } from "react";

// Components
import AuthHeader from "@/components/auth/AuthHeader";
import PhoneStep from "@/components/auth/PhoneStep";
import OtpStepNew from "@/components/auth/OtpStepNew";
import BasicInfoStepNew from "@/components/auth/BasicInfoStepNew";
import PreferencesStepNew from "@/components/auth/PreferencesStepNew";
import PhotosStepNew from "@/components/auth/PhotosStepNew";

// types
import { AuthStep } from "@/types/auth";
import { Loader2 } from "lucide-react";

const AuthFlow = () => {
  // State management - initialize with phone step
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  // Utility functions
  const clearError = useCallback(() => setError(""), []);

  // Memoized callbacks to prevent infinite loops
  const handleSetCurrentStep = useCallback((step: AuthStep) => setCurrentStep(step), []);
  const handleSetError = useCallback((error: string) => setError(error), []);
  const handleSetUserInfo = useCallback(() => {}, []);
  const handleSetPreferences = useCallback(() => {}, []);

  // Auth flow logic
  const { handleSignOut, signOutPending, isAuthenticated } = useAuthFlow({
    setCurrentStep: handleSetCurrentStep,
    setError: handleSetError,
    setUserInfo: handleSetUserInfo,
    setPreferences: handleSetPreferences,
  });

  // Set initializing to false after auth flow has initialized
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <AuthHeader
        currentStep={currentStep}
        isAuthenticated={isAuthenticated}
        signOutPending={signOutPending}
        onSignOut={handleSignOut}
      />
      <div className="animate-in fade-in-50">
        {(() => {
          switch (currentStep) {
            case "phone":
              return (
                <PhoneStep
                  isLoading={isLoading}
                  error={error}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  setCurrentStep={setCurrentStep}
                />
              );

            case "otp":
              return (
                <OtpStepNew
                  isLoading={isLoading}
                  error={error}
                  clearError={clearError}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  setCurrentStep={setCurrentStep}
                />
              );

            case "basicInfo":
              return (
                <BasicInfoStepNew
                  isLoading={isLoading}
                  error={error}
                  clearError={clearError}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  setCurrentStep={setCurrentStep}
                />
              );

            case "preferences":
              return (
                <PreferencesStepNew
                  isLoading={isLoading}
                  error={error}
                  clearError={clearError}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  setCurrentStep={setCurrentStep}
                />
              );

            case "photos":
              return (
                <PhotosStepNew
                  isLoading={isLoading}
                  error={error}
                  clearError={clearError}
                  setIsLoading={setIsLoading}
                  setError={setError}
                />
              );

            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default AuthFlow;
