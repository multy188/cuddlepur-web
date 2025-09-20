import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, Phone, CheckCircle, AlertCircle } from "lucide-react";

type AuthStep = "phone" | "otp" | "basicInfo" | "verification" | "pending" | "failed";

interface AuthFlowProps {
  onComplete: () => void;
  onBack: () => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
  onVerificationFailed?: () => void;
}

export default function AuthFlow({ onComplete, onBack, onNavigateTerms, onNavigatePrivacy, onVerificationFailed }: AuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+233");
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    location: ""
  });

  // Popular Ghanaian cities for autofill
  const [locationSuggestions] = useState([
    "Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Ashaiman", "Sunyani",
    "Cape Coast", "Obuasi", "Teshie", "Tema", "Madina", "Koforidua",
    "Wa", "Techiman", "Ho", "Nungua", "Lashibi", "Dome", "Gbawe", "Kasoa"
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const stepProgress = {
    phone: 20,
    otp: 40,
    basicInfo: 60,
    verification: 80,
    pending: 100,
    failed: 80
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send OTP
    console.log('Sending OTP to:', countryCode + phoneNumber);
    setCurrentStep("otp");
    setResendTimer(60);
    
    // Simulate timer countdown
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Verify OTP
    console.log('Verifying OTP:', otpCode);
    setCurrentStep("basicInfo");
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save basic info
    console.log('Saving basic info:', userInfo);
    setCurrentStep("verification");
  };

  const handleVerificationSubmit = () => {
    // TODO: Submit for verification
    console.log('Submitting for verification');
    setCurrentStep("pending");
    
    // TODO: Poll for verification status
    // Simulate verification failure for demo (in real app, this would come from backend)
    setTimeout(() => {
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.7; // 30% success rate for demo
      
      if (isSuccess) {
        onComplete();
      } else {
        setCurrentStep("failed");
        if (onVerificationFailed) {
          onVerificationFailed();
        }
      }
    }, 3000);
  };

  const renderPhoneStep = () => (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Your Phone Number</h2>
        <p className="text-muted-foreground">
          We'll send you a verification code to get started
        </p>
      </div>

      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-20" data-testid="select-country-code">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+233">🇬🇭 +233</SelectItem>
              <SelectItem value="+1">🇺🇸 +1</SelectItem>
              <SelectItem value="+44">🇬🇧 +44</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1"
            data-testid="input-phone"
            required
          />
        </div>

        <Button type="submit" className="w-full" data-testid="button-send-code">
          Send Verification Code
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By continuing, you agree to our{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={onNavigateTerms}
          data-testid="link-terms-of-service"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button 
          className="text-primary underline hover:text-primary/80" 
          onClick={onNavigatePrivacy}
          data-testid="link-privacy-policy"
        >
          Privacy Policy
        </button>
      </p>
    </Card>
  );

  const renderOtpStep = () => (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to {countryCode}{phoneNumber}
        </p>
      </div>

      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <Input
          placeholder="6-digit code"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          maxLength={6}
          className="text-center text-lg tracking-wider"
          data-testid="input-otp"
          required
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={otpCode.length !== 6}
          data-testid="button-verify-code"
        >
          Verify Code
        </Button>
      </form>

      <div className="text-center mt-4">
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {resendTimer}s
          </p>
        ) : (
          <Button variant="ghost" size="sm" data-testid="button-resend">
            Resend Code
          </Button>
        )}
      </div>
    </Card>
  );

  const renderBasicInfoStep = () => (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={userInfo.fullName}
            onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
            data-testid="input-full-name"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={userInfo.dateOfBirth}
            onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}
            data-testid="input-date-of-birth"
            required
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select value={userInfo.gender} onValueChange={(value) => setUserInfo({...userInfo, gender: value})}>
            <SelectTrigger data-testid="select-gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Label htmlFor="location">City</Label>
          <Input
            id="location"
            value={userInfo.location}
            onChange={(e) => {
              const value = e.target.value;
              setUserInfo({...userInfo, location: value});
              
              if (value.length > 0) {
                const filtered = locationSuggestions.filter(city =>
                  city.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredSuggestions(filtered);
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            onFocus={() => {
              if (userInfo.location.length > 0 && filteredSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            placeholder="Enter your city"
            data-testid="input-location"
            required
          />
          
          {/* Location Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredSuggestions.slice(0, 8).map((city, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm"
                  onClick={() => {
                    setUserInfo({...userInfo, location: city});
                    setShowSuggestions(false);
                  }}
                  data-testid={`suggestion-${city.toLowerCase().replace(' ', '-')}`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-continue-basic">
          Continue
        </Button>
      </form>
    </Card>
  );

  const renderVerificationStep = () => (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Identity Verification</h2>
        <p className="text-muted-foreground">
          Upload a government ID for account verification
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Accepted documents: Ghana Card, Passport, Driver's License
          </p>
          <Button variant="outline" data-testid="button-upload-id">
            Upload ID Document
          </Button>
        </div>

        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Take a selfie matching your ID photo
          </p>
          <Button variant="outline" data-testid="button-take-selfie">
            Take Selfie
          </Button>
        </div>

        <Button 
          onClick={handleVerificationSubmit} 
          className="w-full"
          data-testid="button-submit-verification"
        >
          Submit for Verification
        </Button>
      </div>
    </Card>
  );

  const renderPendingStep = () => (
    <Card className="p-6 max-w-md mx-auto text-center">
      <CheckCircle className="h-16 w-16 text-chart-1 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Verification Submitted</h2>
      <p className="text-muted-foreground mb-6">
        Review typically takes 24-48 hours. You can browse professionals while waiting.
      </p>
      
      <Badge variant="secondary" className="mb-4">
        Verification in progress
      </Badge>
      
      <Button onClick={onComplete} className="w-full" data-testid="button-continue-app">
        Continue to App
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Progress Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Step {Object.keys(stepProgress).indexOf(currentStep) + 1} of {Object.keys(stepProgress).length}
          </div>
        </div>
        
        <Progress 
          value={stepProgress[currentStep]} 
          className="h-2 bg-gray-700 [&>div]:bg-primary" 
        />
      </div>

      {/* Step Content */}
      <div className="animate-in fade-in-50">
        {currentStep === "phone" && renderPhoneStep()}
        {currentStep === "otp" && renderOtpStep()}
        {currentStep === "basicInfo" && renderBasicInfoStep()}
        {currentStep === "verification" && renderVerificationStep()}
        {currentStep === "pending" && renderPendingStep()}
      </div>
    </div>
  );
}