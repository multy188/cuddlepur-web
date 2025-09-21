import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Preferences } from "@/types/auth";
import { PREFERENCE_OPTIONS } from "@/constants/auth";

interface OtherPreferencesProps {
  preferences: Preferences;
  onPreferencesChange: (field: keyof Preferences, value: string | boolean) => void;
}

const OtherPreferences = ({ preferences, onPreferencesChange }: OtherPreferencesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Other Preferences</h3>
      
      {Object.entries(PREFERENCE_OPTIONS).map(([key, options]) => (
        <div key={key}>
          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} *</Label>
          <Select 
            value={preferences[key as keyof typeof preferences] as string} 
            onValueChange={(value) => onPreferencesChange(key as keyof Preferences, value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${key} preference`} />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <div>
        <Label htmlFor="occupation">Occupation *</Label>
        <Input
          id="occupation"
          value={preferences.occupation}
          onChange={(e) => onPreferencesChange('occupation', e.target.value)}
          placeholder="Your occupation or profession"
          required
        />
      </div>
    </div>
  );
};

export default OtherPreferences;