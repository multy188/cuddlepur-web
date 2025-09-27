import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { usePhoneHandlers } from "@/hooks/usePhoneHandlers";
import { useAuth } from "@/contexts/AuthContext";
import { AuthStep } from "@/types/auth";

interface OtpStepProps {
  otpCode: string;
  countryCode: string;
  phoneNumber: string;
  resendTimer: number;
  isLoading: boolean;
  error: string;
  onOtpCodeChange: (value: string) => void;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCurrentStep: (step: AuthStep) => void;
  startResendTimer: () => void;
}

const OtpStep = ({
  otpCode,
  countryCode,
  phoneNumber,
  resendTimer,
  isLoading,
  error,
  onOtpCodeChange,
  clearError,
  setIsLoading,
  setError,
  setCurrentStep,
  startResendTimer
}: OtpStepProps) => {
  const { login } = useAuth();
  
  const phoneHandlers = usePhoneHandlers({
    phoneNumber,
    countryCode,
    otpCode,
    clearError,
    setIsLoading,
    setError,
    setCurrentStep,
    startResendTimer,
    login
  });
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to {countryCode}{phoneNumber}
        </p>
      </div>

      <form onSubmit={phoneHandlers.handleOtpSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Input
          placeholder="6-digit code"
          value={otpCode}
          onChange={(e) => onOtpCodeChange(e.target.value)}
          maxLength={6}
          className="text-center text-lg tracking-wider"
          required
          disabled={isLoading}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={otpCode.length !== 6 || isLoading}
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

      <div className="text-center mt-4">
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {resendTimer}s
          </p>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={phoneHandlers.handleResendCode}
          >
            Resend Code
          </Button>
        )}
      </div>
    </Card>
  );
};

export default OtpStep;