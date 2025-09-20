import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Mail, FileText, Phone } from "lucide-react";

interface AccountSuspendedProps {
  suspensionReason?: string;
  suspensionDuration?: string;
  suspensionEndDate?: string;
  canAppeal?: boolean;
}

export default function AccountSuspended({ 
  suspensionReason = "Violation of community guidelines",
  suspensionDuration = "7 days",
  suspensionEndDate = "January 28, 2025",
  canAppeal = true
}: AccountSuspendedProps) {
  
  const handleContactSupport = () => {
    console.log('Contacting support for suspended account');
  };

  const handleSubmitAppeal = () => {
    console.log('Submitting appeal for account suspension');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Notice */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">Account Suspended</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your account has been temporarily suspended due to a violation of our platform policies.
            </p>
          </CardContent>
        </Card>

        {/* Suspension Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Suspension Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Reason for Suspension</h4>
              <p className="text-sm text-muted-foreground">{suspensionReason}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Duration</h4>
              <p className="text-sm text-muted-foreground">{suspensionDuration}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Account Will Be Restored</h4>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-600">{suspensionEndDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appeal Process */}
        {canAppeal && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-5 w-5" />
                Appeal Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you believe this suspension is in error, you can submit an appeal. Our team will review your case within 3-5 business days.
              </p>
              
              <Button 
                onClick={handleSubmitAppeal}
                className="w-full"
                variant="outline"
                data-testid="button-submit-appeal"
              >
                <Mail className="h-4 w-4 mr-2" />
                Submit Appeal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have questions about your suspension or need assistance, our support team is here to help.
            </p>
            
            <Button 
              onClick={handleContactSupport}
              className="w-full"
              variant="outline"
              data-testid="button-contact-support"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Platform Rules Reminder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Platform Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please review our community guidelines and terms of service to understand our platform policies.
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                data-testid="button-community-guidelines"
              >
                <FileText className="h-4 w-4 mr-2" />
                Community Guidelines
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                data-testid="button-terms-service"
              >
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Return Information */}
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="text-center pt-6">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              Your account will be automatically restored on {suspensionEndDate}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              You'll receive an email notification when your account is restored
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}