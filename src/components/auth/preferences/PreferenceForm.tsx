import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Preferences } from "@/types/auth";
import WhatFriendsSayField from "./WhatFriendsSayField";
import SessionPreferences from "./SessionPreferences";
import OtherPreferences from "./OtherPreferences";

interface PreferenceFormProps {
  preferences: Preferences;
  isLoading: boolean;
  error: string;
  onPreferencesChange: (field: keyof Preferences, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PreferenceForm = ({
  preferences,
  isLoading,
  error,
  onPreferencesChange,
  onSubmit
}: PreferenceFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <WhatFriendsSayField
        value={preferences.whatFriendsSay}
        onChange={(value) => onPreferencesChange('whatFriendsSay', value)}
      />

      <SessionPreferences
        openToIncall={preferences.openToIncall}
        openToOutcall={preferences.openToOutcall}
        onIncallChange={(value) => onPreferencesChange('openToIncall', value)}
        onOutcallChange={(value) => onPreferencesChange('openToOutcall', value)}
      />

      <OtherPreferences
        preferences={preferences}
        onPreferencesChange={onPreferencesChange}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  );
};

export default PreferenceForm;