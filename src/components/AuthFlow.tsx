// Hooks
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useState } from "react";

// Components
import AuthHeader from "@/components/auth/AuthHeader";
import PhoneStep from "@/components/auth/PhoneStep";
import OtpStepNew from "@/components/auth/OtpStepNew";
import BasicInfoStepNew from "@/components/auth/BasicInfoStepNew";
import PreferencesStepNew from "@/components/auth/PreferencesStepNew";
import PhotosStepNew from "@/components/auth/PhotosStepNew";

// types
import { AuthStep } from "@/types/auth";

const AuthFlow = () => {
  // State management - only global flow state
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Utility functions
  const clearError = () => setError("");

  // Auth flow logic
  const { handleSignOut, signOutPending, isAuthenticated } = useAuthFlow({
    setCurrentStep: setCurrentStep,
    setError: setError,
    setUserInfo: () => {}, // These will be handled in individual components now
    setPreferences: () => {},
  });

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
