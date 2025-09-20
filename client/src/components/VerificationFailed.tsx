import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Upload, 
  RefreshCw, 
  MessageCircle, 
  FileText,
  Camera 
} from "lucide-react";

interface VerificationFailedProps {
  onBack: () => void;
  onRetry: () => void;
  attemptCount?: number;
}

export default function VerificationFailed({ 
  onBack, 
  onRetry, 
  attemptCount = 1 
}: VerificationFailedProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const maxAttempts = 3;
  const remainingAttempts = maxAttempts - attemptCount;

  // Mock failure reasons - in real app this would come from the backend
  const failureReasons = [
    "Document image was too blurry or unclear",
    "The uploaded document does not match accepted ID types", 
    "Selfie does not clearly match the ID photo",
    "Document appears to be expired or damaged"
  ];

  const currentReason = failureReasons[0]; // In real app, this would be dynamic

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} data-testid="button-back-verification">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Main Card */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-50 dark:bg-red-950 p-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-red-800 dark:text-red-200">
              Verification Failed
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We couldn't verify your identity with the submitted documents
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Failure Reason */}
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Reason for Failure:
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {currentReason}
              </p>
            </div>

            {/* Attempts Remaining */}
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Attempts Remaining:
              </span>
              <Badge 
                variant={remainingAttempts > 1 ? "secondary" : "destructive"}
                data-testid="badge-attempts-remaining"
              >
                {remainingAttempts} of {maxAttempts}
              </Badge>
            </div>

            <Separator />

            {/* Action Options */}
            <div className="space-y-4">
              <h3 className="font-semibold">What would you like to do?</h3>
              
              {/* Try Again with Same Documents */}
              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedOption === 'retry' 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedOption('retry')}
                data-testid="option-retry"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Try Again</p>
                      <p className="text-sm text-muted-foreground">
                        Re-submit the same documents with better quality
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload New Documents */}
              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedOption === 'new-docs' 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedOption('new-docs')}
                data-testid="option-new-documents"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Upload New Documents</p>
                      <p className="text-sm text-muted-foreground">
                        Use different ID documents or retake photos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={onRetry}
                disabled={remainingAttempts <= 0 || !selectedOption}
                data-testid="button-proceed-verification"
              >
                {selectedOption === 'retry' && <RefreshCw className="h-4 w-4 mr-2" />}
                {selectedOption === 'new-docs' && <Upload className="h-4 w-4 mr-2" />}
                {selectedOption === 'retry' ? 'Try Again' : 'Upload New Documents'}
              </Button>

              {remainingAttempts <= 0 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum attempts reached. Please contact support for assistance.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Help Section */}
            <div className="space-y-3">
              <h4 className="font-medium">Need Help?</h4>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-contact-support"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-verification-guide"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Verification Guide
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Tips for Successful Verification:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Ensure good lighting when taking photos</li>
                <li>• Make sure all text on ID is clearly readable</li>
                <li>• Face the camera directly for selfie verification</li>
                <li>• Use accepted document types only</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}