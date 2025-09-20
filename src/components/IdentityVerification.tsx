import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Shield, 
  User,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Camera,
  Phone,
  Users,
  Eye
} from "lucide-react";

interface ProfessionalData {
  id: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
}

interface ClientData {
  id: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
}

interface BookingData {
  id: string;
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  totalAmount: number;
  status: string;
}

interface IdentityVerificationProps {
  professional: ProfessionalData;
  client: ClientData;
  booking: BookingData;
  userRole: "professional" | "client";
  onBack: () => void;
  onConfirmIdentity: () => void;
  onReportConcern: (concern: string) => void;
  onEmergencyContact: () => void;
}

export default function IdentityVerification({ 
  professional, 
  client, 
  booking, 
  userRole,
  onBack, 
  onConfirmIdentity, 
  onReportConcern,
  onEmergencyContact 
}: IdentityVerificationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSafetyTips, setShowSafetyTips] = useState(false);

  const getTimeLabel = (timeSlot: string) => {
    const timeLabels: Record<string, string> = {
      "08:00": "8:00 AM",
      "09:00": "9:00 AM", 
      "10:00": "10:00 AM",
      "11:00": "11:00 AM",
      "12:00": "12:00 PM",
      "13:00": "1:00 PM",
      "14:00": "2:00 PM",
      "15:00": "3:00 PM",
      "16:00": "4:00 PM",
      "17:00": "5:00 PM",
      "18:00": "6:00 PM",
      "19:00": "7:00 PM",
      "20:00": "8:00 PM",
      "21:00": "9:00 PM"
    };
    return timeLabels[timeSlot] || timeSlot;
  };

  const verificationSteps = [
    {
      title: "Meeting Location",
      description: "Confirm you're at the correct meeting location",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Verify Meeting Location</h3>
            <p className="text-muted-foreground">
              Confirm you're both at the agreed meeting location:
            </p>
            <p className="font-medium mt-2" data-testid="meeting-location">
              {booking.location}
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Identity Check", 
      description: "Compare the person with their profile photo",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Visual Identity Confirmation</h3>
            <p className="text-muted-foreground mb-4">
              {userRole === "professional" 
                ? "Compare your client with their profile photo:"
                : "Compare the professional with their profile photo:"}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-3">
                <AvatarImage 
                  src={userRole === "professional" ? client.profileImage : professional.profileImage} 
                  alt={userRole === "professional" ? client.name : professional.name} 
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <p className="font-medium" data-testid="person-to-verify">
                {userRole === "professional" ? client.name : professional.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {userRole === "professional" ? "Your Client" : "Your Professional"}
              </p>
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Photo Comparison Guide:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Compare facial features and general appearance</li>
                <li>• Allow for lighting and angle differences</li>
                <li>• Trust your judgment - if something feels wrong, report it</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      title: "Safety Confirmation",
      description: "Final safety check before starting session",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Safety Confirmation</h3>
            <p className="text-muted-foreground">
              You're about to confirm identity and proceed with the session.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Everything looks good!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      You can proceed with confidence
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> You can stop the verification process at any time if you feel unsafe or notice any inconsistencies.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )
    }
  ];

  const handleNextStep = () => {
    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmIdentity = async () => {
    setIsConfirming(true);
    
    // Simulate confirmation process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirmIdentity();
    setIsConfirming(false);
  };

  const currentStepData = verificationSteps[currentStep];

  if (showSafetyTips) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSafetyTips(false)}
                data-testid="button-back-to-verification"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h1 className="font-semibold">Safety Tips</h1>
              
              <div className="w-10" />
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Meetup Safety Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Before Meeting</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Choose public, well-lit meeting locations</li>
                    <li>• Let someone know where you're going</li>
                    <li>• Trust your instincts</li>
                    <li>• Keep your phone charged</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">During Identity Check</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Take your time to verify identity</li>
                    <li>• Don't rush the verification process</li>
                    <li>• Report any inconsistencies immediately</li>
                    <li>• You can cancel at any time</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Red Flags</h4>
                  <ul className="space-y-1 text-sm text-red-600">
                    <li>• Person looks significantly different from photo</li>
                    <li>• Refusing to show identification</li>
                    <li>• Pressuring to skip verification</li>
                    <li>• Uncomfortable or unsafe feeling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={onEmergencyContact}
              variant="destructive"
              className="flex-1"
              data-testid="button-emergency"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency Contact
            </Button>
            <Button
              onClick={() => setShowSafetyTips(false)}
              variant="outline"
              className="flex-1"
              data-testid="button-continue"
            >
              Continue Verification
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="font-semibold">Identity Verification</h1>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSafetyTips(true)}
              data-testid="button-safety-tips"
            >
              Safety Tips
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Session Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Session Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage 
                  src={userRole === "professional" ? client.profileImage : professional.profileImage} 
                  alt={userRole === "professional" ? client.name : professional.name} 
                />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium" data-testid="session-with">
                  {userRole === "professional" ? client.name : professional.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {userRole === "professional" ? "Your client" : "Your professional"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-date">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-time">{getTimeLabel(booking.timeSlot)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              {verificationSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                      ${isActive ? 'bg-primary border-primary text-primary-foreground' : 
                        isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                        'border-muted text-muted-foreground'}
                    `}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs text-center ${isActive ? 'font-medium' : ''}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{currentStepData.title}</CardTitle>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </CardHeader>
          <CardContent>
            {currentStepData.content}
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                Safety Concerns?
              </h4>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => onReportConcern("identity_mismatch")}
                variant="outline"
                size="sm"
                className="border-yellow-300 text-yellow-800"
                data-testid="button-report-concern"
              >
                Report Concern
              </Button>
              <Button
                onClick={onEmergencyContact}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-800"
                data-testid="button-emergency-contact"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Contact
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="flex-1"
              data-testid="button-previous"
            >
              Previous
            </Button>
          )}

          {currentStep < verificationSteps.length - 1 ? (
            <Button
              onClick={handleNextStep}
              className="flex-1"
              data-testid="button-next"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleConfirmIdentity}
              disabled={isConfirming}
              className="flex-1"
              data-testid="button-confirm-identity"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isConfirming ? "Confirming..." : "Confirm Identity"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}