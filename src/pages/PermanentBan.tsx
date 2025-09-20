import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, FileText, Mail, Phone, AlertTriangle, Database } from "lucide-react";

interface PermanentBanProps {
  banReason?: string;
  canAppeal?: boolean;
}

export default function PermanentBan({ 
  banReason = "Multiple violations of community guidelines and terms of service",
  canAppeal = false
}: PermanentBanProps) {
  
  const handleContactSupport = () => {
    console.log('Contacting support for permanent ban');
  };

  const handleSubmitAppeal = () => {
    console.log('Submitting appeal for permanent ban');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Notice */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">Account Permanently Banned</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your account has been permanently banned from our platform due to serious violations of our community guidelines and terms of service.
            </p>
          </CardContent>
        </Card>

        {/* Ban Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Ban Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Reason for Ban</h4>
              <p className="text-sm text-muted-foreground">{banReason}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Ban Status</h4>
              <p className="text-sm text-red-600 font-medium">Permanent - No expiration date</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">Account Access</h4>
              <p className="text-sm text-muted-foreground">All platform features are permanently disabled</p>
            </div>
          </CardContent>
        </Card>

        {/* Appeal Process (if applicable) */}
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
                In exceptional circumstances, you may submit an appeal for review. Appeals are rarely successful for permanent bans.
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

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-5 w-5" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your account data will be retained for 90 days for legal and safety purposes, after which it will be permanently deleted in accordance with our privacy policy.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  If you have any important data to retrieve, please contact support within 30 days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Account Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <XCircle className="h-5 w-5" />
              Account Creation Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Creating new accounts is strictly prohibited. Any attempts to circumvent this ban will result in immediate account termination.
            </p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Phone numbers and email addresses are permanently blocked</p>
              <p>• Identity verification documents are flagged</p>
              <p>• Device and IP address monitoring is in place</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-5 w-5" />
              Questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have questions about this decision or need assistance with data retrieval, contact our support team.
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

        {/* Platform Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Platform Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              data-testid="button-privacy-policy"
            >
              <FileText className="h-4 w-4 mr-2" />
              Privacy Policy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}