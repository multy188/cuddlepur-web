import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Shield, Phone, CheckCircle, AlertCircle, Upload, X, ImagePlus, Loader2 } from "lucide-react";
import CountryCodeSelect from "./CountryCodeSelect";

type AuthStep = "phone" | "otp" | "basicInfo" | "photoUpload" | "complete";

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
    phone: 25,
    otp: 50,
    basicInfo: 75,
    photoUpload: 100,
    complete: 100
  };

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Client-side validation
    if (phoneNumber.length < 7) {
      setError("Phone number must be at least 7 digits long.");
      setIsLoading(false);
      return;
    }
    
    if (phoneNumber.length > 15) {
      setError("Phone number cannot be longer than 15 digits.");
      setIsLoading(false);
      return;
    }
    
    if (!/^\d+$/.test(phoneNumber)) {
      setError("Phone number must contain only digits.");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber: countryCode + phoneNumber })
      });

      if (!response.ok) {
        let errorMessage = 'Unable to send verification code';
        
        try {
          const error = await response.json();
          errorMessage = error.error || error.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status-based messages
          if (response.status === 429) {
            errorMessage = 'Too many attempts. Please try again in a few minutes.';
          } else if (response.status === 400) {
            errorMessage = 'Please check your phone number and try again.';
          } else if (response.status >= 500) {
            errorMessage = 'Our servers are experiencing issues. Please try again shortly.';
          } else {
            errorMessage = 'Unable to send verification code. Please try again.';
          }
        }
        
        throw new Error(errorMessage);
      }

      console.log('OTP sent to:', countryCode + phoneNumber);
      setCurrentStep("otp");
      setResendTimer(60);
      
      // Start timer countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      // Handle network errors and fetch failures
      if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
        setError('Please check your internet connection and try again.');
      } else {
        setError(error.message || 'Unable to send verification code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          phoneNumber: countryCode + phoneNumber,
          code: otpCode 
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to verify code';
        
        try {
          const error = await response.json();
          errorMessage = error.error || error.message || errorMessage;
        } catch (e) {
          if (response.status === 400) {
            errorMessage = 'The verification code is invalid or has expired. Please try again.';
          } else if (response.status === 429) {
            errorMessage = 'Too many attempts. Please wait a few minutes before trying again.';
          } else if (response.status >= 500) {
            errorMessage = 'Our servers are experiencing issues. Please try again shortly.';
          } else {
            errorMessage = 'Unable to verify code. Please try again.';
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('cuddlepur_token', data.token);
      }
      
      console.log('OTP verified successfully');
      setCurrentStep("basicInfo");
    } catch (error: any) {
      // Handle network errors and fetch failures
      if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
        setError('Please check your internet connection and try again.');
      } else {
        setError(error.message || 'Unable to verify code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber: countryCode + phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Failed to resend code');
      }

      setResendTimer(60);
      
      // Start timer countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      // Handle network errors and fetch failures
      if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
        setError('Please check your internet connection and try again.');
      } else {
        setError('Unable to resend code. Please try again.');
      }
    }
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save basic info
    console.log('Saving basic info:', userInfo);
    setCurrentStep("photoUpload");
  };

  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      const newPhotos = Array.from(files);
      const totalPhotos = uploadedPhotos.length + newPhotos.length;
      
      if (totalPhotos > 10) {
        alert('You can upload a maximum of 10 photos');
        return;
      }
      
      setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, 10));
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePhotoSubmit = () => {
    // TODO: Upload photos to S3
    console.log('Uploading photos:', uploadedPhotos);
    onComplete();
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-2">
          <CountryCodeSelect 
            value={countryCode} 
            onValueChange={setCountryCode}
            disabled={isLoading}
          />
          
          <Input
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => {
              // Only allow numbers and limit to 15 digits (international standard)
              const value = e.target.value.replace(/\D/g, '').slice(0, 15);
              setPhoneNumber(value);
            }}
            className="flex-1"
            data-testid="input-phone"
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
          data-testid="button-send-code"
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Input
          placeholder="6-digit code"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          maxLength={6}
          className="text-center text-lg tracking-wider"
          data-testid="input-otp"
          required
          disabled={isLoading}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={otpCode.length !== 6 || isLoading}
          data-testid="button-verify-code"
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
            data-testid="button-resend"
            onClick={handleResendCode}
          >
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

  const renderPhotoUploadStep = () => (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <ImagePlus className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Add Your Photos (Optional)</h2>
        <p className="text-muted-foreground">
          Upload up to 10 photos to complete your profile
        </p>
      </div>

      <div className="space-y-4">
        {/* Photo upload area */}
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handlePhotoUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            data-testid="input-photo-upload"
          />
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">Drop photos here or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">
            {uploadedPhotos.length}/10 photos uploaded
          </p>
        </div>

        {/* Preview uploaded photos */}
        {uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                  data-testid={`button-remove-photo-${index}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => onComplete()} 
            className="flex-1"
            data-testid="button-skip-photos"
          >
            Skip for now
          </Button>
          <Button 
            onClick={handlePhotoSubmit} 
            className="flex-1"
            disabled={uploadedPhotos.length === 0}
            data-testid="button-upload-photos"
          >
            Upload Photos
          </Button>
        </div>
      </div>
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
        {currentStep === "photoUpload" && renderPhotoUploadStep()}
      </div>
    </div>
  );
}