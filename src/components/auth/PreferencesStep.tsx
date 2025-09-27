import { Card } from "@/components/ui/card";
import { Preferences, UserInfo, AuthStep } from "@/types/auth";
import PreferenceForm from "./preferences/PreferenceForm";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useCallback } from "react";

interface PreferencesStepProps {
  preferences: Preferences;
  userInfo: UserInfo;
  isLoading: boolean;
  error: string;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const PreferencesStep = ({
  preferences,
  userInfo,
  isLoading,
  error,
  setPreferences,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep
}: PreferencesStepProps) => {
  
  const formHandlers = useFormHandlers({
    userInfo,
    preferences,
    clearError,
    setIsLoading,
    setError,
    setCurrentStep
  });

  const handlePreferencesChange = useCallback((field: keyof Preferences, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  }, [setPreferences]);
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Preferences</h2>
        <p className="text-muted-foreground">Tell us about your preferences and lifestyle</p>
      </div>

      <PreferenceForm
        preferences={preferences}
        isLoading={isLoading}
        error={error}
        onPreferencesChange={handlePreferencesChange}
        onSubmit={formHandlers.handlePreferencesSubmit}
      />
    </Card>
  );
};

export default PreferencesStep;