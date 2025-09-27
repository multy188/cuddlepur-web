import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { AlertCircle, Loader2 } from "lucide-react";
import { useBasicInfoForm } from "@/hooks/useBasicInfoForm";
import { AuthStep } from "@/types/auth";
import LocationSuggestions from "./LocationSuggestions";

interface BasicInfoStepNewProps {
  isLoading: boolean;
  error: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const BasicInfoStepNew = ({
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep
}: BasicInfoStepNewProps) => {
  const {
    form,
    filteredSuggestions,
    showSuggestions,
    handleLocationChange,
    handleLocationFocus,
    handleLocationBlur,
    handleSuggestionClick,
    handleSubmit
  } = useBasicInfoForm({
    setCurrentStep,
    setIsLoading,
    setError,
    clearError
  });

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="date" 
                    disabled={isLoading}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LocationSuggestions
                    location={field.value}
                    filteredSuggestions={filteredSuggestions}
                    showSuggestions={showSuggestions}
                    onLocationChange={handleLocationChange}
                    onLocationFocus={handleLocationFocus}
                    onLocationBlur={handleLocationBlur}
                    onSuggestionClick={handleSuggestionClick}
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

export default BasicInfoStepNew;