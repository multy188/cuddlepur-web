import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";

interface VerificationBannerProps {
  verificationStatus: 'pending' | 'verified' | 'failed';
  onTryAgain?: () => void;
  onSetupProfile?: () => void;
}

export default function VerificationBanner({ verificationStatus, onTryAgain, onSetupProfile }: VerificationBannerProps) {
  if (verificationStatus === 'verified') {
    return null;
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">
                  Verification Failed
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Your identity verification was unsuccessful. Please try again.
                </p>
              </div>
            </div>
            {onTryAgain && (
              <Button 
                size="sm"
                onClick={onTryAgain}
                data-testid="button-try-again-verification"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'pending') {
    return (
      <div className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800 p-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  We are verifying your identification
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This usually takes 24-48 hours to complete.
                </p>
              </div>
            </div>
            {onSetupProfile && (
              <Button 
                size="sm"
                variant="outline"
                onClick={onSetupProfile}
                data-testid="button-setup-profile"
              >
                Set Up Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}