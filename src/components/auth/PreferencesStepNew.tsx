import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { usePreferencesForm } from "@/hooks/usePreferencesForm";
import { AuthStep } from "@/types/auth";
import { PREFERENCE_OPTIONS } from "@/constants/auth";
import PreferenceSelectField from "./preferences/PreferenceSelectField";
import SessionPreferencesSection from "./preferences/SessionPreferencesSection";

interface PreferencesStepNewProps {
  isLoading: boolean;
  error: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const PreferencesStepNew = ({
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep
}: PreferencesStepNewProps) => {
  const { form, handleSubmit } = usePreferencesForm({
    setCurrentStep,
    setIsLoading,
    setError,
    clearError
  });

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Preferences</h2>
        <p className="text-muted-foreground">Tell us about your preferences and lifestyle</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <FormField
            control={form.control}
            name="whatFriendsSay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do your friends say about you? *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us what your friends would say about your personality..."
                    className="min-h-[80px] resize-none"
                    disabled={isLoading}
                    maxLength={300}
                  />
                </FormControl>
                <FormDescription className="text-right">
                  {field.value.length}/300 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SessionPreferencesSection
            control={form.control}
            disabled={isLoading}
          />

          <PreferenceSelectField
            control={form.control}
            name="drinking"
            label="Drinking"
            placeholder="Select drinking preference"
            options={PREFERENCE_OPTIONS.drinking}
            disabled={isLoading}
          />

          <PreferenceSelectField
            control={form.control}
            name="smoking"
            label="Smoking"
            placeholder="Select smoking preference"
            options={PREFERENCE_OPTIONS.smoking}
            disabled={isLoading}
          />

          <PreferenceSelectField
            control={form.control}
            name="married"
            label="Relationship Status"
            placeholder="Select relationship status"
            options={PREFERENCE_OPTIONS.married}
            disabled={isLoading}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your occupation or profession"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !form.formState.isValid}
          >
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
      </Form>
    </Card>
  );
};

export default PreferencesStepNew;