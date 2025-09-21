import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, AlertCircle, Loader2 } from "lucide-react";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { sanitizePhoneNumber } from "@/utils/authValidation";

interface PhoneStepProps {
  phoneNumber: string;
  countryCode: string;
  isLoading: boolean;
  error: string;
  onPhoneNumberChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
}

const PhoneStep = ({
  phoneNumber,
  countryCode,
  isLoading,
  error,
  onPhoneNumberChange,
  onCountryCodeChange,
  onSubmit,
  onNavigateTerms,
  onNavigatePrivacy
}: PhoneStepProps) => {
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Your Phone Number</h2>
        <p className="text-muted-foreground">
          We'll send you a verification code to get started
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-2">
          <CountryCodeSelect 
            value={countryCode} 
            onValueChange={onCountryCodeChange}
            disabled={isLoading}
          />
          
          <Input
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(sanitizePhoneNumber(e.target.value))}
            className="flex-1"
            required
            disabled={isLoading}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={15}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
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

      <p className="text-xs text-muted-foreground text-center mt-4">
        By continuing, you agree to our{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={onNavigateTerms}
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={onNavigatePrivacy}
        >
          Privacy Policy
        </button>
      </p>
    </Card>
  );
};

export default PhoneStep;