import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { PreferencesFormData } from "@/schemas/authSchemas";

interface SessionPreferencesSectionProps {
  control: Control<PreferencesFormData>;
  disabled?: boolean;
}

const SessionPreferencesSection = ({ control, disabled }: SessionPreferencesSectionProps) => {
  return (
    <div className="space-y-3">
      <FormLabel>Session Preferences</FormLabel>
      
      <FormField
        control={control}
        name="openToIncall"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <FormLabel className="font-normal">
              Would you host sessions at your location?
            </FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="openToOutcall"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <FormLabel className="font-normal">
              Would you travel to meet at their location?
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SessionPreferencesSection;