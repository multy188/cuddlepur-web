import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} data-testid="button-back-terms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="space-y-6">
          {/* Important Notice */}
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    Important Legal Notice
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Please read these Terms of Service carefully before using CuddlePur. 
                    By using our platform, you acknowledge and agree to these terms, including 
                    important liability limitations and your responsibilities as a user.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Effective Date */}
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Effective Date:</strong> December 20, 2024<br/>
                <strong>Last Updated:</strong> December 20, 2024
              </p>
            </CardContent>
          </Card>

          {/* 1. Platform Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                1. Platform Overview and Role
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CuddlePur ("Platform," "we," "us," or "our") operates as a <strong>marketplace facilitator only</strong>, 
                connecting independent service providers ("Companions" or "Professionals") with service recipients 
                ("Clients" or "Users"). We provide technology infrastructure to enable these connections but 
                <strong> do not employ Companions nor provide companionship services directly</strong>.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium text-sm">
                  KEY: CuddlePur acts solely as an intermediary platform for bookings, payments, and communications. 
                  We are not responsible for the quality, safety, or nature of any companionship services provided.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. Service Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>2. Service Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>CuddlePur expressly disclaims all liability for:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quality, safety, appropriateness, or nature of companionship services</li>
                <li>Acts, omissions, conduct, or behavior of Companions or Clients</li>
                <li>Content, data, information, or communications provided by users</li>
                <li>Any injury, damage, loss, or harm arising from service interactions</li>
                <li>Background check accuracy or companion qualification verification</li>
                <li>Travel to/from service locations or venue safety</li>
              </ul>
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium text-sm">
                  WARNING: All services are provided on an "AS IS" and "AS AVAILABLE" basis with NO WARRANTIES 
                  of any kind. Users assume ALL RISKS associated with service arrangements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities and Risk Assumption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">All Users Must:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verify companion credentials, insurance, and background checks independently</li>
                <li>Provide accurate information and maintain appropriate conduct</li>
                <li>Ensure compliance with all applicable local, state, and federal laws</li>
                <li>Assume full responsibility for personal safety and security</li>
                <li>Release CuddlePur from any claims arising from service interactions</li>
              </ul>
              
              <h4 className="font-semibold mt-6">Companions Additionally Must:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain valid professional liability insurance coverage</li>
                <li>Complete all required background checks and certifications</li>
                <li>Provide services in accordance with professional standards</li>
                <li>Indemnify CuddlePur against all third-party claims related to their services</li>
              </ul>

              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                <p className="font-medium text-sm">
                  BY USING THIS PLATFORM, YOU ACKNOWLEDGE THAT YOU PARTICIPATE AT YOUR OWN RISK 
                  AND AGREE TO HOLD CUDDLEPUR HARMLESS FROM ANY CONSEQUENCES.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>4. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>CuddlePur's aggregate liability is strictly limited to the lesser of:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees paid to CuddlePur in the preceding 12 months, OR</li>
                <li>One Thousand Dollars ($1,000)</li>
              </ul>
              
              <p>
                <strong>CuddlePur shall NOT be liable for:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indirect, consequential, special, incidental, or punitive damages</li>
                <li>Lost profits, revenue, data, or business opportunities</li>
                <li>Service interruptions or platform downtime</li>
                <li>Third-party actions or failures</li>
                <li>Physical, emotional, or psychological harm</li>
                <li>Property damage or theft</li>
              </ul>

              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  THESE LIMITATIONS APPLY EVEN IF CUDDLEPUR HAS BEEN ADVISED OF THE POSSIBILITY 
                  OF SUCH DAMAGES AND REGARDLESS OF THE LEGAL THEORY OF LIABILITY.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Indemnification */}
          <Card>
            <CardHeader>
              <CardTitle>5. User Indemnification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You agree to <strong>indemnify, defend, and hold harmless</strong> CuddlePur, its officers, 
                directors, employees, agents, and affiliates from and against all claims, demands, losses, 
                liabilities, costs, and expenses (including reasonable attorney fees) arising out of or 
                relating to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the platform or services obtained through it</li>
                <li>Your breach of these Terms of Service</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Any content or information you provide to the platform</li>
                <li>Your interactions with other users or third parties</li>
                <li>Any companionship services provided or received</li>
                <li>Claims by third parties related to your platform usage</li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Insurance Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>6. Insurance and Risk Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Companion Insurance Requirements:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional liability coverage minimum $1,000,000 per occurrence</li>
                <li>General liability insurance covering service provision</li>
                <li>Valid coverage must be maintained throughout platform participation</li>
              </ul>

              <h4 className="font-semibold mt-4">Platform Insurance Limitations:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>CuddlePur insurance covers technology operations ONLY</li>
                <li>NO coverage for companion services or user interactions</li>
                <li>Users responsible for verifying adequate personal coverage</li>
              </ul>
            </CardContent>
          </Card>

          {/* 7. Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>7. Dispute Resolution and Arbitration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>BINDING ARBITRATION REQUIRED:</strong> All disputes arising out of or relating to 
                these Terms or your use of CuddlePur must be resolved through individual binding arbitration.
              </p>
              
              <h4 className="font-semibold">Process:</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Informal negotiation period (60 days minimum)</li>
                <li>Individual arbitration (NO CLASS ACTIONS permitted)</li>
                <li>Governed by laws of Ghana</li>
                <li>Arbitration costs shared per applicable rules</li>
              </ol>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                  BY AGREEING TO THESE TERMS, YOU WAIVE YOUR RIGHT TO JURY TRIAL AND CLASS ACTION PARTICIPATION.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8. Termination */}
          <Card>
            <CardHeader>
              <CardTitle>8. Termination Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CuddlePur reserves the right to terminate or suspend accounts immediately, 
                with or without notice, for any reason including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Terms of Service violations</li>
                <li>Inappropriate content or conduct</li>
                <li>Safety concerns or reports</li>
                <li>Legal compliance requirements</li>
                <li>Platform maintenance or modifications</li>
              </ul>
              
              <p className="font-medium">
                CuddlePur shall have NO LIABILITY for any consequences resulting from account termination.
              </p>
            </CardContent>
          </Card>

          {/* 9. Release of Claims */}
          <Card>
            <CardHeader>
              <CardTitle>9. Release of Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 font-semibold mb-4">
                  IMPORTANT: BY USING CUDDLEPUR, YOU HEREBY RELEASE AND FOREVER DISCHARGE CUDDLEPUR 
                  FROM ANY AND ALL LIABILITY, CLAIMS, DEMANDS, AND DAMAGES OF EVERY KIND ARISING 
                  OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  This release includes, but is not limited to, claims for personal injury, 
                  property damage, emotional distress, economic loss, or any other harm 
                  that may result from your interactions with other platform users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 10. Modifications and Contact */}
          <Card>
            <CardHeader>
              <CardTitle>10. Modifications and Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CuddlePur reserves the right to modify these Terms at any time. 
                Continued use of the platform constitutes acceptance of modified terms.
              </p>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-semibold mb-2">Contact Information:</h4>
                <p className="text-sm text-muted-foreground">
                  CuddlePur Platform<br/>
                  Email: legal@cuddlepur.com<br/>
                  Phone: +233 XX XXX XXXX<br/>
                  Address: Accra, Ghana
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Acknowledgment */}
          <Card className="border-primary">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="font-semibold text-lg mb-2">
                  By using CuddlePur, you acknowledge that:
                </p>
                <ul className="text-sm space-y-1 text-left max-w-md mx-auto">
                  <li>✓ You have read and understood these Terms</li>
                  <li>✓ You agree to participate at your own risk</li>
                  <li>✓ You release CuddlePur from all liability</li>
                  <li>✓ You agree to binding arbitration</li>
                  <li>✓ You will not sue CuddlePur for any reason</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}