import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} data-testid="button-back-privacy">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <div className="space-y-6">
          {/* Important Notice */}
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Your Privacy Matters
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    This Privacy Policy explains how CuddlePur collects, uses, and protects your personal information. 
                    We are committed to safeguarding your privacy while providing safe companionship services.
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

          {/* 1. Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Personal Information You Provide:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, date of birth, gender</li>
                <li><strong>Profile Information:</strong> Bio, interests, profile photos, location, preferences</li>
                <li><strong>Verification Data:</strong> Government ID, background check results, professional certifications</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address, transaction history</li>
                <li><strong>Communication Data:</strong> Messages, chat logs, uploaded images, voice recordings</li>
                <li><strong>Feedback:</strong> Reviews, ratings, complaints, support communications</li>
              </ul>

              <h4 className="font-semibold mt-6">Information We Collect Automatically:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent, search queries</li>
                <li><strong>Location Data:</strong> GPS coordinates, approximate location (when permitted)</li>
                <li><strong>Cookies & Tracking:</strong> Session data, preferences, analytics information</li>
              </ul>

              <h4 className="font-semibold mt-6">Information from Third Parties:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Background Check Providers:</strong> Criminal history, identity verification</li>
                <li><strong>Payment Processors:</strong> Transaction confirmations, fraud detection</li>
                <li><strong>Social Media:</strong> Public profile information (if you choose to connect)</li>
                <li><strong>Government Databases:</strong> Age verification, legal status confirmation</li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use your personal information for the following purposes:</p>
              
              <h4 className="font-semibold">Platform Services:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account</li>
                <li>Facilitate connections between companions and clients</li>
                <li>Process bookings and payments</li>
                <li>Enable messaging and communication features</li>
                <li>Provide customer support and resolve disputes</li>
              </ul>

              <h4 className="font-semibold mt-4">Safety & Verification:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conduct background checks and identity verification</li>
                <li>Monitor platform activity for safety and compliance</li>
                <li>Investigate reports of inappropriate behavior</li>
                <li>Prevent fraud, abuse, and illegal activities</li>
                <li>Enforce our Terms of Service and community guidelines</li>
              </ul>

              <h4 className="font-semibold mt-4">Improvement & Analytics:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analyze platform usage to improve features</li>
                <li>Personalize your experience and recommendations</li>
                <li>Conduct research and development</li>
                <li>Generate anonymized statistical reports</li>
              </ul>

              <h4 className="font-semibold mt-4">Communication:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send booking confirmations and updates</li>
                <li>Provide safety alerts and important notices</li>
                <li>Share promotional offers (with your consent)</li>
                <li>Respond to your inquiries and support requests</li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                3. How We Share Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>

              <h4 className="font-semibold">With Other Platform Users:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Profile information visible to potential matches</li>
                <li>Contact details when bookings are confirmed</li>
                <li>Reviews and ratings you provide or receive</li>
                <li>Messages and communications within the platform</li>
              </ul>

              <h4 className="font-semibold mt-4">With Service Providers:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment Processors:</strong> To handle transactions and billing</li>
                <li><strong>Background Check Companies:</strong> For safety verification</li>
                <li><strong>Cloud Storage Providers:</strong> To store and backup data</li>
                <li><strong>Analytics Providers:</strong> To improve platform performance</li>
                <li><strong>Customer Support Tools:</strong> To assist with inquiries</li>
              </ul>

              <h4 className="font-semibold mt-4">For Legal Compliance:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>When required by law or legal process</li>
                <li>To protect our rights and property</li>
                <li>To investigate safety or security concerns</li>
                <li>To prevent fraud or illegal activities</li>
                <li>In connection with business transfers or mergers</li>
              </ul>

              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <p className="text-amber-800 dark:text-amber-200 font-medium text-sm">
                  We require all third parties to protect your information and use it only for specified purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                4. Data Security & Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement comprehensive security measures to protect your personal information:</p>

              <h4 className="font-semibold">Technical Safeguards:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for sensitive communications</li>
                <li>Secure SSL/TLS connections for all data transmission</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for account access</li>
                <li>Automated backup and disaster recovery systems</li>
              </ul>

              <h4 className="font-semibold mt-4">Access Controls:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Role-based access limitations for employees</li>
                <li>Regular access reviews and permissions updates</li>
                <li>Secure development and deployment practices</li>
                <li>Employee training on data protection</li>
              </ul>

              <h4 className="font-semibold mt-4">Data Retention:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information retained while account is active</li>
                <li>Communication logs kept for safety and dispute resolution</li>
                <li>Payment records maintained per legal requirements</li>
                <li>Background check results stored securely</li>
                <li>Data deletion upon account termination (with legal exceptions)</li>
              </ul>

              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium text-sm">
                  While we implement strong security measures, no system is 100% secure. 
                  You are responsible for keeping your account credentials confidential.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Your Privacy Rights */}
          <Card>
            <CardHeader>
              <CardTitle>5. Your Privacy Rights & Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have the following rights regarding your personal information:</p>

              <h4 className="font-semibold">Access & Control:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>View Your Data:</strong> Access all personal information we have about you</li>
                <li><strong>Update Information:</strong> Modify your profile and account details</li>
                <li><strong>Download Data:</strong> Export your information in a portable format</li>
                <li><strong>Delete Account:</strong> Permanently remove your account and data</li>
              </ul>

              <h4 className="font-semibold mt-4">Communication Preferences:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opt out of promotional emails and notifications</li>
                <li>Adjust privacy settings for profile visibility</li>
                <li>Control location sharing permissions</li>
                <li>Manage cookie and tracking preferences</li>
              </ul>

              <h4 className="font-semibold mt-4">Legal Rights (where applicable):</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to be Forgotten:</strong> Request deletion of personal data</li>
                <li><strong>Data Portability:</strong> Receive data in machine-readable format</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Object to Processing:</strong> Withdraw consent for certain uses</li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                  To exercise these rights, contact us at privacy@cuddlepur.com. 
                  We will respond within 30 days of receiving your request.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>6. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">
                CuddlePur is intended for users 18 years and older. We do not knowingly collect 
                personal information from children under 18.
              </p>
              
              <p>
                If we become aware that we have collected information from a child under 18, 
                we will take immediate steps to delete that information. If you believe we have 
                collected information from a minor, please contact us immediately.
              </p>

              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium text-sm">
                  All users must verify they are 18+ during account creation. 
                  Providing false age information violates our Terms of Service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. International Data Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CuddlePur operates primarily in Ghana, but may use service providers 
                located in other countries. When we transfer your personal information 
                internationally, we ensure appropriate safeguards are in place.
              </p>

              <h4 className="font-semibold">Transfer Safeguards:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contractual data protection clauses with service providers</li>
                <li>Adequacy decisions from relevant data protection authorities</li>
                <li>Certification under recognized privacy frameworks</li>
                <li>Your explicit consent where required by law</li>
              </ul>
            </CardContent>
          </Card>

          {/* 8. Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>8. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use cookies and similar technologies to enhance your experience:</p>

              <h4 className="font-semibold">Types of Cookies:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                <li><strong>Performance Cookies:</strong> Help us improve platform performance</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Understand how you use our platform</li>
                <li><strong>Advertising Cookies:</strong> Deliver relevant promotional content</li>
              </ul>

              <p className="text-sm">
                You can control cookie settings through your browser preferences. 
                Disabling certain cookies may limit platform functionality.
              </p>
            </CardContent>
          </Card>

          {/* 9. Updates to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>9. Updates to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our 
                practices, technology, or legal requirements. We will notify you of material 
                changes through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notifications to your registered address</li>
                <li>In-app notifications and announcements</li>
                <li>Prominent notices on our platform</li>
                <li>Updated effective date at the top of this policy</li>
              </ul>
              
              <p>
                Continued use of CuddlePur after changes indicates your acceptance 
                of the updated Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* 10. Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have questions about this Privacy Policy or how we handle your 
                personal information, please contact us:
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-2">CuddlePur Privacy Team</h4>
                  <p className="text-sm space-y-1">
                    <strong>Email:</strong> privacy@cuddlepur.com<br/>
                    <strong>Phone:</strong> +233 XX XXX XXXX<br/>
                    <strong>Address:</strong> CuddlePur Privacy Office<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accra, Ghana<br/>
                    <strong>Response Time:</strong> Within 30 days
                  </p>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  For urgent privacy or safety concerns, please contact us immediately 
                  at emergency@cuddlepur.com or +233 XX XXX XXXX.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Commitment */}
          <Card className="border-primary">
            <CardContent className="p-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Our Privacy Commitment</h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  CuddlePur is committed to protecting your privacy and ensuring transparent 
                  data practices. We will continue to evolve our privacy protections as 
                  technology and regulations advance, always keeping your trust and safety 
                  as our top priority.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}