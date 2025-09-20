import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX, Calendar, Phone, FileText, ExternalLink } from "lucide-react";

interface AgeVerificationFailedProps {
  onContactSupport?: () => void;
}

export default function AgeVerificationFailed({ onContactSupport }: AgeVerificationFailedProps) {
  
  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      console.log('Contacting support for age verification dispute');
    }
  };

  const alternativeResources = [
    {
      title: "Youth Helpline Ghana",
      description: "Support and counseling services for young people",
      contact: "0302-123-456"
    },
    {
      title: "Department of Social Welfare",
      description: "Government support services for youth and families",
      contact: "0302-987-654"
    },
    {
      title: "Ghana Youth Authority",
      description: "Programs and resources for youth development",
      contact: "0302-555-789"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Notice */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
              <ShieldX className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-xl text-orange-600">Age Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We're unable to verify that you meet the minimum age requirement of 18+ to use our platform.
            </p>
          </CardContent>
        </Card>

        {/* Age Requirement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-5 w-5" />
              Age Requirement Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">18+ Only Platform</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Our platform is exclusively for adults aged 18 and older. This is a legal requirement to ensure the safety and appropriateness of our services.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Why This Restriction Exists:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Legal compliance with local and international laws</li>
                <li>• Protection of minors from inappropriate content</li>
                <li>• Ensuring mature decision-making for services</li>
                <li>• Maintaining a safe environment for all users</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Explanation of Restriction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldX className="h-5 w-5" />
              Account Access Restriction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on the information provided during registration, we cannot verify that you meet our age requirement. Access to all platform features has been restricted.
            </p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Account creation has been denied</p>
              <p>• No services are available to users under 18</p>
              <p>• This decision is final and cannot be appealed unless there was an error in age verification</p>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Process */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Think This Is An Error?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you believe there was an error in our age verification process and you are 18 or older, you can contact our support team for review.
            </p>
            
            <Button 
              onClick={handleContactSupport}
              className="w-full"
              variant="outline"
              data-testid="button-dispute-age-verification"
            >
              <Phone className="h-4 w-4 mr-2" />
              Dispute Age Verification
            </Button>
            
            <p className="text-xs text-muted-foreground">
              You will need to provide valid government-issued identification showing you are 18 or older.
            </p>
          </CardContent>
        </Card>

        {/* Alternative Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ExternalLink className="h-5 w-5" />
              Alternative Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              While you cannot use our platform, there are other resources available for support and assistance:
            </p>
            
            {alternativeResources.map((resource, index) => (
              <div key={index} className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs h-8"
                  data-testid={`button-resource-${index}`}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {resource.contact}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Legal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Our age verification process complies with applicable laws in Ghana and international standards for online platforms.
            </p>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-xs h-8"
              data-testid="button-terms-service"
            >
              <FileText className="h-3 w-3 mr-2" />
              Terms of Service
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-xs h-8"
              data-testid="button-privacy-policy"
            >
              <FileText className="h-3 w-3 mr-2" />
              Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* Future Access */}
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="text-center pt-6">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              You can apply again once you turn 18
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              We'll be here when you're eligible to join our platform
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}