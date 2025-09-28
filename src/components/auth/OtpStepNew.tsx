import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { useOtpForm } from "@/hooks/useOtpForm";
import { AuthStep } from "@/types/auth";
import { processPhoneNumberForCountry, formatPhoneNumber } from "@/utils/authValidation";

interface OtpStepNewProps {
  isLoading: boolean;
  error: string;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
}

const OtpStepNew = ({
  isLoading,
  error,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep
}: OtpStepNewProps) => {
  // Get phone data from localStorage or form context
  const phoneNumber = localStorage.getItem('temp_phone_number') || '';
  const countryCode = localStorage.getItem('temp_country_code') || '+233';

  const { form, resendTimer, handleOtpSubmit, handleResendCode } = useOtpForm({
    phoneNumber,
    countryCode,
    setCurrentStep,
    setIsLoading,
    setError,
    clearError
  });

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to {countryCode} {formatPhoneNumber(processPhoneNumberForCountry(phoneNumber, countryCode))}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <FormField
            control={form.control}
            name="otpCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="6-digit code"
                    {...field}
                    maxLength={6}
                    className="text-center text-lg tracking-wider"
                    disabled={isLoading}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
          </p>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResendCode}
            disabled={isLoading}
          >
            Resend Code
          </Button>
        )}
      </div>
    </Card>
  );
};

export default OtpStepNew;