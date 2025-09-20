import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Eye, 
  Check, 
  X, 
  Clock, 
  User, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  Shield
} from "lucide-react";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

interface UserVerificationQueueProps {
  onNavigate: (page: string) => void;
}

interface VerificationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  profileImage: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  documentType: string;
  documentNumber: string;
  notes?: string;
  riskLevel: 'low' | 'medium' | 'high';
  previousRejections: number;
  verificationImages: string[];
  additionalInfo: {
    profession?: string;
    experience?: string;
    specialties?: string[];
    background?: string;
  };
}

export default function UserVerificationQueue({ onNavigate }: UserVerificationQueueProps) {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // TODO: Replace with real data from API
  const verificationRequests: VerificationRequest[] = [
    {
      id: "VR-001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+233 54 123 4567",
      age: 28,
      location: "Accra, Ghana",
      profileImage: femaleProfile,
      submittedAt: "2025-09-20T10:30:00Z",
      status: "pending",
      documentType: "National ID",
      documentNumber: "GHA-123456789",
      riskLevel: "low",
      previousRejections: 0,
      verificationImages: [femaleProfile, femaleProfile],
      additionalInfo: {
        profession: "Massage Therapist",
        experience: "5 years",
        specialties: ["Relaxation", "Stress Relief"],
        background: "Certified massage therapist with extensive experience in therapeutic massage."
      }
    },
    {
      id: "VR-002",
      name: "Michael Asante",
      email: "m.asante@email.com",
      phone: "+233 24 987 6543",
      age: 32,
      location: "Kumasi, Ghana",
      profileImage: maleProfile,
      submittedAt: "2025-09-20T08:15:00Z",
      status: "reviewing",
      documentType: "Passport",
      documentNumber: "G0123456",
      riskLevel: "medium",
      previousRejections: 1,
      verificationImages: [maleProfile, maleProfile],
      additionalInfo: {
        profession: "Counselor",
        experience: "8 years",
        specialties: ["Mental Health", "Emotional Support"],
        background: "Licensed counselor specializing in supportive companionship."
      }
    },
    {
      id: "VR-003",
      name: "Emma Osei",
      email: "emma.osei@email.com", 
      phone: "+233 55 456 7890",
      age: 26,
      location: "Takoradi, Ghana",
      profileImage: femaleProfile,
      submittedAt: "2025-09-19T16:45:00Z",
      status: "pending",
      documentType: "Driver's License",
      documentNumber: "DL-789012345",
      riskLevel: "high",
      previousRejections: 2,
      verificationImages: [femaleProfile],
      notes: "Multiple rejections due to unclear documentation",
      additionalInfo: {
        profession: "Life Coach",
        experience: "3 years",
        specialties: ["Personal Development", "Motivation"]
      }
    }
  ];

  const pendingRequests = verificationRequests.filter(req => req.status === 'pending');
  const reviewingRequests = verificationRequests.filter(req => req.status === 'reviewing');

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const handleApprove = (requestId: string) => {
    console.log("Approving verification:", requestId);
    setSelectedRequest(null);
    // TODO: API call to approve verification
  };

  const handleReject = (requestId: string) => {
    console.log("Rejecting verification:", requestId);
    setSelectedRequest(null);
    // TODO: API call to reject verification
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (selectedRequest) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedRequest(null)}
              data-testid="button-back-to-queue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Queue
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Verification Review</h1>
              <p className="text-muted-foreground">Request ID: {selectedRequest.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Applicant Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Applicant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedRequest.profileImage} alt={selectedRequest.name} />
                      <AvatarFallback>{selectedRequest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold" data-testid="applicant-name">
                        {selectedRequest.name}
                      </h3>
                      <p className="text-muted-foreground">Age: {selectedRequest.age}</p>
                      <Badge className={getRiskLevelColor(selectedRequest.riskLevel)}>
                        {selectedRequest.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm" data-testid="applicant-email">{selectedRequest.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm" data-testid="applicant-phone">{selectedRequest.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm" data-testid="applicant-location">{selectedRequest.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Submitted: {formatDate(selectedRequest.submittedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Identity Document
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Document Type</label>
                      <p className="text-sm text-muted-foreground" data-testid="document-type">
                        {selectedRequest.documentType}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Document Number</label>
                      <p className="text-sm text-muted-foreground" data-testid="document-number">
                        {selectedRequest.documentNumber}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Document Images</label>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedRequest.verificationImages.map((image, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Document ${index + 1}`}
                            className="w-full h-full object-cover"
                            data-testid={`document-image-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedRequest.additionalInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Profession</label>
                        <p className="text-sm text-muted-foreground" data-testid="professional-role">
                          {selectedRequest.additionalInfo.profession}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Experience</label>
                        <p className="text-sm text-muted-foreground" data-testid="professional-experience">
                          {selectedRequest.additionalInfo.experience}
                        </p>
                      </div>
                    </div>

                    {selectedRequest.additionalInfo.specialties && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Specialties</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedRequest.additionalInfo.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" data-testid={`specialty-${index}`}>
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRequest.additionalInfo.background && (
                      <div>
                        <label className="text-sm font-medium">Background</label>
                        <p className="text-sm text-muted-foreground mt-1" data-testid="professional-background">
                          {selectedRequest.additionalInfo.background}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Status: {selectedRequest.status.toUpperCase()}</span>
                  </div>
                  
                  {selectedRequest.previousRejections > 0 && (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm">
                        {selectedRequest.previousRejections} previous rejection(s)
                      </span>
                    </div>
                  )}

                  {selectedRequest.notes && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800" data-testid="admin-notes">
                        <strong>Notes:</strong> {selectedRequest.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => handleApprove(selectedRequest.id)}
                    data-testid="button-approve-verification"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve Verification
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => handleReject(selectedRequest.id)}
                    data-testid="button-reject-verification"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    data-testid="button-request-additional-info"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Request More Info
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Verification Queue</h1>
            <p className="text-muted-foreground">Review and manage verification requests</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => onNavigate("admin-dashboard")}
            data-testid="button-back-to-admin"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold" data-testid="stat-pending">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Review</p>
                  <p className="text-2xl font-bold" data-testid="stat-reviewing">{reviewingRequests.length}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold text-red-600" data-testid="stat-high-risk">
                    {verificationRequests.filter(req => req.riskLevel === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="reviewing" data-testid="tab-reviewing">
                  In Review ({reviewingRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedRequest(request)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={request.profileImage} alt={request.name} />
                            <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold" data-testid={`request-name-${request.id}`}>
                              {request.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.additionalInfo?.profession} • {request.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted: {formatDate(request.submittedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskLevelColor(request.riskLevel)}>
                            {request.riskLevel.toUpperCase()}
                          </Badge>
                          {request.previousRejections > 0 && (
                            <Badge variant="outline" className="border-orange-200 text-orange-700">
                              {request.previousRejections} Rejections
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviewing" className="space-y-4 mt-6">
                {reviewingRequests.map((request) => (
                  <Card key={request.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedRequest(request)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={request.profileImage} alt={request.name} />
                            <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold" data-testid={`request-name-${request.id}`}>
                              {request.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.additionalInfo?.profession} • {request.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted: {formatDate(request.submittedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskLevelColor(request.riskLevel)}>
                            {request.riskLevel.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            IN REVIEW
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}