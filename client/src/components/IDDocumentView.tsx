import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  FileText,
  Camera,
  Flag
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  profileImage: string;
  idDocument: {
    type: "national_id" | "passport" | "drivers_license";
    number: string;
    frontImage: string;
    backImage?: string;
    expiryDate: string;
    issuingAuthority: string;
  };
  personalDetails: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
  };
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

interface IDDocumentViewProps {
  user: UserData;
  booking: BookingData;
  onBack: () => void;
  onVerifyIdentity: (verificationData: any) => void;
  onReportIssue: (issueData: any) => void;
}

export default function IDDocumentView({ user, booking, onBack, onVerifyIdentity, onReportIssue }: IDDocumentViewProps) {
  const [verificationChecks, setVerificationChecks] = useState({
    photoMatches: false,
    documentValid: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const handleCheckChange = (check: keyof typeof verificationChecks, value: boolean) => {
    setVerificationChecks(prev => ({
      ...prev,
      [check]: value
    }));
  };

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

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      national_id: "National ID",
      passport: "Passport",
      drivers_license: "Driver's License"
    };
    return labels[type] || type;
  };

  const allChecksComplete = Object.values(verificationChecks).every(check => check);

  const handleVerifyIdentity = async () => {
    if (!allChecksComplete) return;

    setIsSubmitting(true);

    const verificationData = {
      bookingId: booking.id,
      userId: user.id,
      verificationChecks,
      verifiedAt: new Date().toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onVerifyIdentity(verificationData);
    setIsSubmitting(false);
  };

  const handleReportIssue = async () => {
    if (!reportReason) return;

    setIsSubmitting(true);

    const issueData = {
      bookingId: booking.id,
      userId: user.id,
      reason: reportReason,
      details: reportDetails,
      reportedAt: new Date().toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onReportIssue(issueData);
    setIsSubmitting(false);
  };

  if (showReportForm) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReportForm(false)}
                data-testid="button-back-to-verification"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h1 className="font-semibold">Report Issue</h1>
              
              <div className="w-10" />
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <Flag className="w-5 h-5" />
                Report Identity Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Issue Type</Label>
                <div className="mt-2 space-y-2">
                  {[
                    { value: "fake_document", label: "Fake or altered document" },
                    { value: "wrong_person", label: "Document doesn't match person" },
                    { value: "expired_document", label: "Expired document" },
                    { value: "unclear_image", label: "Document image unclear" },
                    { value: "other", label: "Other issue" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={option.value}
                        name="reportReason"
                        value={option.value}
                        checked={reportReason === option.value}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="w-4 h-4"
                        data-testid={`radio-report-${option.value}`}
                      />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="report-details">Additional Details</Label>
                <Textarea
                  id="report-details"
                  placeholder="Describe the specific issue you've identified..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="min-h-[100px] mt-2"
                  data-testid="textarea-report-details"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowReportForm(false)}
              className="flex-1"
              data-testid="button-cancel-report"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReportIssue}
              disabled={!reportReason || isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700"
              data-testid="button-submit-report"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
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
            
            <h1 className="font-semibold">Verify Identity</h1>
            
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Booking Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium" data-testid="client-name">{user.name}</h4>
                <p className="text-sm text-muted-foreground">Your client</p>
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
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-location">{booking.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Identity Verification Required:</strong> Please carefully verify this client's identity matches their submitted documentation before proceeding with the session.
          </AlertDescription>
        </Alert>

        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label className="text-muted-foreground">Full Name</Label>
                <p className="font-medium" data-testid="user-full-name">{user.personalDetails.fullName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Date of Birth</Label>
                <p className="font-medium" data-testid="user-dob">{user.personalDetails.dateOfBirth}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone Number</Label>
                <p className="font-medium" data-testid="user-phone">{user.personalDetails.phoneNumber}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p className="font-medium text-sm" data-testid="user-address">{user.personalDetails.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ID Document */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Identity Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Document Type</Label>
                <p className="font-medium" data-testid="document-type">
                  {getDocumentTypeLabel(user.idDocument.type)}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Document Number</Label>
                <p className="font-medium font-mono" data-testid="document-number">
                  {user.idDocument.number}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Expiry Date</Label>
                <p className="font-medium" data-testid="document-expiry">
                  {user.idDocument.expiryDate}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Issuing Authority</Label>
                <p className="font-medium text-sm" data-testid="issuing-authority">
                  {user.idDocument.issuingAuthority}
                </p>
              </div>
            </div>

            {/* Document Images */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Document Front</Label>
                <div className="mt-2 border rounded-lg p-4 bg-muted/20">
                  <div className="aspect-video bg-muted rounded flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Document Front Image</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click to view full size
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {user.idDocument.backImage && (
                <div>
                  <Label className="text-sm font-medium">Document Back</Label>
                  <div className="mt-2 border rounded-lg p-4 bg-muted/20">
                    <div className="aspect-video bg-muted rounded flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Document Back Image</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to view full size
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verification Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Verification Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                key: "photoMatches" as const, 
                label: "ID matches the user",
                description: "Verify the person matches their ID document"
              },
              { 
                key: "documentValid" as const, 
                label: "Document front is clear and valid",
                description: "Check the front of the document for clarity and validity"
              }
            ].map((item) => (
              <div key={item.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={item.key}
                  checked={verificationChecks[item.key]}
                  onCheckedChange={(checked) => handleCheckChange(item.key, !!checked)}
                  data-testid={`checkbox-${item.key}`}
                />
                <div className="flex-1">
                  <Label htmlFor={item.key} className="cursor-pointer font-medium">
                    {item.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>


        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleVerifyIdentity}
            disabled={!allChecksComplete || isSubmitting}
            className="w-full"
            size="lg"
            data-testid="button-verify-identity"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? "Verifying..." : "Identity Matches - Continue"}
          </Button>

          <Button
            onClick={() => setShowReportForm(true)}
            variant="destructive"
            className="w-full"
            data-testid="button-report-issue"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Issue
          </Button>

          {!allChecksComplete && (
            <p className="text-sm text-muted-foreground text-center">
              Please complete all verification checks to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}