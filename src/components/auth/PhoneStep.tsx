import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Phone, AlertCircle, Loader2 } from "lucide-react";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { sanitizePhoneNumber } from "@/utils/authValidation";
import { usePhoneForm } from "@/hooks/usePhoneForm";
import { usePhoneActions } from "@/hooks/usePhoneActions";
import { AuthStep } from "@/types/auth";
import { useLocation } from "wouter";

interface PhoneStepProps {
  isLoading: boolean;
  error: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const PhoneStep = ({
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep
}: PhoneStepProps) => {
  const [, setLocation] = useLocation();
  
  const form = usePhoneForm();
  
  const startResendTimer = () => {
    // Timer logic can be added here if needed for UI feedback
    // For now, we just need the function for usePhoneActions
  };
  
  const phoneActions = usePhoneActions({
    clearError,
    setIsLoading,
    setError,
    setCurrentStep,
    startResendTimer
  });

  const handleNavigateTerms = () => {
    setLocation("/terms");
  };

  const handleNavigatePrivacy = () => {
    setLocation("/privacy");
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Your Phone Number</h2>
        <p className="text-muted-foreground">
          We'll send you a verification code to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(phoneActions.sendVerificationCode)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountryCodeSelect 
                      value={field.value} 
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      onChange={(e) => field.onChange(sanitizePhoneNumber(e.target.value))}
                      disabled={isLoading}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Code...
              </>
            ) : (
              'Send Verification Code'
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By continuing, you agree to our{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={handleNavigateTerms}
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={handleNavigatePrivacy}
        >
          Privacy Policy
        </button>
      </p>
    </Card>
  );
};

export default PhoneStep;