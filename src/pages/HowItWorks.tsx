import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Search, 
  MessageCircle, 
  Heart, 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  Users,
  ArrowLeft
} from "lucide-react";

interface HowItWorksProps {
  onBack: () => void;
}

export default function HowItWorks({ onBack }: HowItWorksProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">How CuddlePur Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to finding safe, professional platonic companionship through our verified platform
          </p>
        </div>

        {/* Main Steps Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-10 w-10 text-primary" />
                </div>
                <div className="hidden md:block absolute top-10 -right-10 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Sign Up & Verify</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create your account and complete our secure verification process. 
                We background-check all users to ensure a safe community.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-chart-1" />
                </div>
                <div className="hidden md:block absolute top-10 -right-10 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Browse & Discover</h3>
              <p className="text-muted-foreground leading-relaxed">
                Search through verified professionals in your area. Filter by location, 
                specialties, ratings, and availability to find your perfect match.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-chart-2" />
                </div>
                <div className="hidden md:block absolute top-10 -right-10 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Connect Safely</h3>
              <p className="text-muted-foreground leading-relaxed">
                Message through our secure platform, discuss your needs, and book 
                sessions. All communication is monitored for safety.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-10 w-10 text-chart-3" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Enjoy & Review</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience professional companionship in a safe environment. 
                Rate and review to help maintain our community standards.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Process */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Detailed Process</h2>
          <div className="space-y-6">
            
            {/* Verification Process */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Verification Process</h3>
                  <p className="text-muted-foreground mb-3">
                    Our comprehensive verification includes ID verification, background checks, 
                    and professional certifications where applicable.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Badge variant="secondary" className="justify-center">Identity Check</Badge>
                    <Badge variant="secondary" className="justify-center">Background Screening</Badge>
                    <Badge variant="secondary" className="justify-center">Reference Verification</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Search & Matching */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-chart-1/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Search className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Search & Matching</h3>
                  <p className="text-muted-foreground mb-3">
                    Use our advanced filters to find professionals who match your preferences, 
                    location, and specific companionship needs.
                  </p>
                  <div className="grid md:grid-cols-4 gap-3">
                    <Badge variant="secondary" className="justify-center">Location</Badge>
                    <Badge variant="secondary" className="justify-center">Specialties</Badge>
                    <Badge variant="secondary" className="justify-center">Availability</Badge>
                    <Badge variant="secondary" className="justify-center">Reviews</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Safety Features */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-chart-2/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Safety Features</h3>
                  <p className="text-muted-foreground mb-3">
                    Multiple layers of protection ensure your safety throughout the entire experience.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Badge variant="secondary" className="justify-center">Secure Messaging</Badge>
                    <Badge variant="secondary" className="justify-center">24/7 Support</Badge>
                    <Badge variant="secondary" className="justify-center">Emergency Contact</Badge>
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Safety Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                For Clients
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Meet in public locations for first sessions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Communicate boundaries clearly before meeting
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Use our secure payment system
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Trust your instincts at all times
                </li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-chart-1" />
                For Professionals
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-chart-1 rounded-full mt-2 flex-shrink-0" />
                  Maintain professional boundaries
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-chart-1 rounded-full mt-2 flex-shrink-0" />
                  Screen clients before meeting
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-chart-1 rounded-full mt-2 flex-shrink-0" />
                  Keep emergency contacts informed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-chart-1 rounded-full mt-2 flex-shrink-0" />
                  Report any concerning behavior
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who have found meaningful connections through CuddlePur
            </p>
            <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
              Start Your Journey
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}