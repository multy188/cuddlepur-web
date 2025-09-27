import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PreferencesFormData } from "@/schemas/authSchemas";

interface PreferenceSelectFieldProps {
  control: Control<PreferencesFormData>;
  name: keyof PreferencesFormData;
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  disabled?: boolean;
}

const PreferenceSelectField = ({
  control,
  name,
  label,
  placeholder,
  options,
  disabled
}: PreferenceSelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value as string} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PreferenceSelectField;