import { Card } from "@/components/ui/card";
import { Preferences } from "@/types/auth";
import PreferenceForm from "./preferences/PreferenceForm";

interface PreferencesStepProps {
  preferences: Preferences;
  isLoading: boolean;
  error: string;
  onPreferencesChange: (field: keyof Preferences, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PreferencesStep = ({
  preferences,
  isLoading,
  error,
  onPreferencesChange,
  onSubmit
}: PreferencesStepProps) => {
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
        onPreferencesChange={onPreferencesChange}
        onSubmit={onSubmit}
      />
    </Card>
  );
};

export default PreferencesStep;