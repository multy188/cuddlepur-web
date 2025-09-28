import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Phone, AlertCircle, Loader2 } from "lucide-react";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { sanitizePhoneNumber, formatPhoneNumber } from "@/utils/authValidation";
import { usePhoneForm } from "@/hooks/usePhoneForm";
import { usePhoneActions } from "@/hooks/usePhoneActions";
import { AuthStep } from "@/types/auth";
import { useLocation } from "wouter";

interface PhoneStepProps {
  isLoading: boolean;
  error: string;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const PhoneStep = ({
  isLoading,
  error,
  setIsLoading,
  setError,
  setCurrentStep,
}: PhoneStepProps) => {
  const [, setLocation] = useLocation();

  const form = usePhoneForm();

  const phoneActions = usePhoneActions({
    setIsLoading,
    setError,
    setCurrentStep,
  });

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
        <form
          onSubmit={form.handleSubmit(phoneActions.sendVerificationCode)}
          className="space-y-4"
        >
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
                      placeholder="xxx xxx-xxxx"
                      value={formatPhoneNumber(field.value || '')}
                      onChange={(e) => {
                        const sanitized = sanitizePhoneNumber(e.target.value);
                        field.onChange(sanitized);
                      }}
                      disabled={isLoading}
                      type="tel"
                      inputMode="numeric"
                      maxLength={20} // Increased to account for formatting characters
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
              "Send Verification Code"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By continuing, you agree to our{" "}
        <button
          className="text-primary underline hover:text-primary/80"
          onClick={() => setLocation("/terms")}
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          className="text-primary underline hover:text-primary/80"
          onClick={() => setLocation("/privacy")}
        >
          Privacy Policy
        </button>
      </p>
    </Card>
  );
};

export default PhoneStep;
