// Hooks
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useState } from "react";

// Components
import AuthHeader from "@/components/auth/AuthHeader";
import AuthStepRenderer from "@/components/auth/AuthStepRenderer";

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
        <AuthStepRenderer
          // Global flow state only
          currentStep={currentStep}
          isLoading={isLoading}
          error={error}
          // Global utilities
          clearError={clearError}
          setIsLoading={setIsLoading}
          setError={setError}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
};

export default AuthFlow;
