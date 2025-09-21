import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, Shield } from 'lucide-react';
import { useSendVerificationCode, useVerifyCode } from '@/hooks/useAuth';
import CountryCodeSelect from './CountryCodeSelect';

export default function PhoneAuth() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [countryCode, setCountryCode] = useState('+233'); // Default to Ghana
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const sendCode = useSendVerificationCode();
  const verifyCode = useVerifyCode();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Client-side validation
    if (phoneNumber.length < 7) {
      setError('Phone number must be at least 7 digits long');
      return;
    }
    
    if (phoneNumber.length > 15) {
      setError('Phone number cannot be longer than 15 digits');
      return;
    }
    
    if (!/^\d+$/.test(phoneNumber)) {
      setError('Phone number must contain only digits');
      return;
    }

    // Format phone number with selected country code
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber.replace(/\D/g, '')}`;

    try {
      await sendCode.mutateAsync({ phoneNumber: formattedPhone });
      setStep('verification');
    } catch (error: any) {
      setError(error.message || 'Failed to send verification code');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber.replace(/\D/g, '')}`;

    try {
      const result = await verifyCode.mutateAsync({ 
        phoneNumber: formattedPhone, 
        code: verificationCode 
      });
      
      // Check if user has completed basic info
      if (result.user && (!result.user.firstName || !result.user.lastName)) {
        navigate('/setup/basic-info');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Invalid verification code');
    }
  };

  const handleResendCode = async () => {
    setError('');
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
    
    try {
      await sendCode.mutateAsync({ phoneNumber: formattedPhone });
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification code');
    }
  };

  if (step === 'phone') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Enter Your Phone Number</CardTitle>
          <CardDescription>
            We'll send you a verification code to confirm your number
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSendCode}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <div className="flex gap-2">
                <CountryCodeSelect 
                  value={countryCode} 
                  onValueChange={setCountryCode}
                  disabled={sendCode.isPending}
                />
                
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers and limit to 15 digits (international standard)
                    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
                    setPhoneNumber(value);
                  }}
                  disabled={sendCode.isPending}
                  className="flex-1"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={15}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={sendCode.isPending}
            >
              {sendCode.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Code...
                </>
              ) : (
                'Send Verification Code'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Enter Verification Code</CardTitle>
        <CardDescription>
          We sent a 6-digit code to {countryCode}{phoneNumber}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleVerifyCode}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Verification Code
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                disabled={verifyCode.isPending}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleResendCode}
              disabled={sendCode.isPending}
              className="text-sm"
            >
              {sendCode.isPending ? 'Resending...' : "Didn't receive the code? Resend"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={verifyCode.isPending || verificationCode.length !== 6}
          >
            {verifyCode.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Continue'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep('phone')}
            disabled={verifyCode.isPending}
            className="w-full"
          >
            Change Phone Number
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}