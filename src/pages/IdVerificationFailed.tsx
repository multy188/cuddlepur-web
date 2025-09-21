import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, HelpCircle, Mail } from 'lucide-react';

interface IdVerificationFailedProps {
  onBack?: () => void;
}

export default function IdVerificationFailed({ onBack }: IdVerificationFailedProps) {
  const [, navigate] = useLocation();

  const handleRetryVerification = () => {
    navigate('/setup/id-verification');
  };

  const handleContactSupport = () => {
    navigate('/help');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="flex items-center justify-center min-h-full">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-900">ID Verification Failed</CardTitle>
            <CardDescription>
              We were unable to verify your identity with the documents provided.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your ID verification was unsuccessful. Please review the common issues below and try again.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Common Issues:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Blurry or unclear images:</strong> Make sure your ID is well-lit and all text is clearly readable
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Expired documents:</strong> Ensure your ID is current and not expired
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Partial images:</strong> The entire ID must be visible in the photo, including all corners
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Information mismatch:</strong> The name and details must match your profile information
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Unsupported document type:</strong> We only accept government-issued photo IDs
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Tips for Better Photos:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use good lighting and avoid shadows</li>
                <li>• Place your ID on a flat, contrasting surface</li>
                <li>• Hold your camera directly above the ID</li>
                <li>• Ensure the entire ID fits in the frame</li>
                <li>• Check that all text is sharp and readable</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleRetryVerification}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Verification Again
              </Button>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleContactSupport}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>

              {onBack && (
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={onBack}
                >
                  Go Back
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                For security reasons, you must complete ID verification to access the platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}