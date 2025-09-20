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
  Flag, 
  AlertTriangle,
  User,
  Camera,
  MessageSquare,
  Calendar,
  ExternalLink
} from "lucide-react";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

interface ContentModerationProps {
  onNavigate: (page: string) => void;
}

interface FlaggedContent {
  id: string;
  type: 'profile' | 'message' | 'photo' | 'review';
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  contentUrl?: string;
  flaggedAt: string;
  flaggedBy: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'removed' | 'warning_issued';
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  context?: {
    bookingId?: string;
    conversationId?: string;
    profileSection?: string;
  };
}

export default function ContentModeration({ onNavigate }: ContentModerationProps) {
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // TODO: Replace with real data from API
  const flaggedContent: FlaggedContent[] = [
    {
      id: "FLAG-001",
      type: "profile",
      userId: "USR-123",
      userName: "John Doe",
      userImage: maleProfile,
      content: "Looking for intimate connections and more than just companionship...",
      flaggedAt: "2025-09-20T14:30:00Z",
      flaggedBy: "USR-456",
      reason: "Inappropriate sexual content",
      severity: "high",
      status: "pending",
      context: {
        profileSection: "bio"
      }
    },
    {
      id: "FLAG-002",
      type: "photo",
      userId: "USR-789",
      userName: "Jane Smith",
      userImage: femaleProfile,
      content: "Suggestive profile photo showing inappropriate attire",
      contentUrl: femaleProfile,
      flaggedAt: "2025-09-20T12:15:00Z",
      flaggedBy: "USR-101",
      reason: "Inappropriate imagery",
      severity: "medium",
      status: "pending"
    },
    {
      id: "FLAG-003",
      type: "message",
      userId: "USR-234",
      userName: "Mike Johnson",
      userImage: maleProfile,
      content: "Hey beautiful, want to meet privately for some real fun? I can pay extra...",
      flaggedAt: "2025-09-20T10:45:00Z",
      flaggedBy: "USR-567",
      reason: "Solicitation of sexual services",
      severity: "critical",
      status: "pending",
      context: {
        conversationId: "CONV-123",
        bookingId: "BK-456"
      }
    },
    {
      id: "FLAG-004",
      type: "review",
      userId: "USR-345",
      userName: "Alex Brown",
      userImage: femaleProfile,
      content: "This person asked for inappropriate things during our session. Very uncomfortable experience.",
      flaggedAt: "2025-09-19T16:20:00Z",
      flaggedBy: "USR-678",
      reason: "False accusations",
      severity: "medium",
      status: "approved",
      reviewedBy: "Admin Sarah",
      reviewedAt: "2025-09-20T09:00:00Z",
      notes: "Legitimate safety concern. Review approved to stay visible."
    },
    {
      id: "FLAG-005",
      type: "profile",
      userId: "USR-456",
      userName: "Sam Wilson",
      userImage: maleProfile,
      content: "I hate women and think they should all serve men. Looking for submissive companions only.",
      flaggedAt: "2025-09-19T14:10:00Z",
      flaggedBy: "USR-789",
      reason: "Hate speech and discrimination",
      severity: "critical",
      status: "removed",
      reviewedBy: "Admin John",
      reviewedAt: "2025-09-19T15:30:00Z",
      notes: "Content removed immediately. User issued final warning."
    }
  ];

  const pendingContent = flaggedContent.filter(item => item.status === 'pending');
  const reviewedContent = flaggedContent.filter(item => item.status !== 'pending');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "removed": return "bg-red-100 text-red-800 border-red-200";
      case "warning_issued": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "profile": return <User className="w-4 h-4" />;
      case "photo": return <Camera className="w-4 h-4" />;
      case "message": return <MessageSquare className="w-4 h-4" />;
      case "review": return <Star className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const handleApprove = (contentId: string) => {
    console.log("Approving content:", contentId);
    setSelectedContent(null);
    // TODO: API call to approve content
  };

  const handleRemove = (contentId: string) => {
    console.log("Removing content:", contentId);
    setSelectedContent(null);
    // TODO: API call to remove content
  };

  const handleIssueWarning = (contentId: string) => {
    console.log("Issuing warning for content:", contentId);
    setSelectedContent(null);
    // TODO: API call to issue warning
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (selectedContent) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedContent(null)}
              data-testid="button-back-to-queue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Queue
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Content Review</h1>
              <p className="text-muted-foreground">Flag ID: {selectedContent.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(selectedContent.type)}
                    Flagged {selectedContent.type.charAt(0).toUpperCase() + selectedContent.type.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={selectedContent.userImage} alt={selectedContent.userName} />
                      <AvatarFallback>{selectedContent.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold" data-testid="content-user-name">
                        {selectedContent.userName}
                      </h3>
                      <p className="text-sm text-muted-foreground">User ID: {selectedContent.userId}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getSeverityColor(selectedContent.severity)}>
                          {selectedContent.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {selectedContent.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Flagged Content:</h4>
                    <p className="text-sm" data-testid="flagged-content">
                      {selectedContent.content}
                    </p>
                    
                    {selectedContent.contentUrl && (
                      <div className="mt-3">
                        <h5 className="font-medium mb-2">Associated Media:</h5>
                        <div className="w-32 h-32 bg-muted-foreground/10 rounded-lg overflow-hidden">
                          <img 
                            src={selectedContent.contentUrl} 
                            alt="Flagged content"
                            className="w-full h-full object-cover"
                            data-testid="flagged-media"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Flagged By</label>
                      <p className="text-sm text-muted-foreground" data-testid="flagged-by">
                        {selectedContent.flaggedBy}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date Flagged</label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedContent.flaggedAt)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Reason for Flag</label>
                      <p className="text-sm text-muted-foreground" data-testid="flag-reason">
                        {selectedContent.reason}
                      </p>
                    </div>
                  </div>

                  {selectedContent.context && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium mb-2">Additional Context:</h4>
                      <div className="space-y-1 text-sm">
                        {selectedContent.context.bookingId && (
                          <div className="flex items-center justify-between">
                            <span>Booking ID:</span>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              {selectedContent.context.bookingId}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        )}
                        {selectedContent.context.conversationId && (
                          <div className="flex items-center justify-between">
                            <span>Conversation ID:</span>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              {selectedContent.context.conversationId}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        )}
                        {selectedContent.context.profileSection && (
                          <div className="flex items-center justify-between">
                            <span>Profile Section:</span>
                            <span className="font-medium">{selectedContent.context.profileSection}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedContent.status !== 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedContent.status)}>
                        {selectedContent.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm">
                        Reviewed by {selectedContent.reviewedBy} on {selectedContent.reviewedAt && formatDate(selectedContent.reviewedAt)}
                      </span>
                    </div>
                    
                    {selectedContent.notes && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm" data-testid="review-notes">
                          <strong>Notes:</strong> {selectedContent.notes}
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
                  <CardTitle>Content Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    <span className="text-sm">Status: {selectedContent.status.toUpperCase()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Severity: {selectedContent.severity.toUpperCase()}</span>
                  </div>
                </CardContent>
              </Card>

              {selectedContent.status === 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Moderation Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleApprove(selectedContent.id)}
                      data-testid="button-approve-content"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve Content
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                      onClick={() => handleIssueWarning(selectedContent.id)}
                      data-testid="button-issue-warning"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Issue Warning
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => handleRemove(selectedContent.id)}
                      data-testid="button-remove-content"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove Content
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>User Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-view-user-profile"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View User Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-view-user-history"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View User History
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
            <h1 className="text-3xl font-bold">Content Moderation</h1>
            <p className="text-muted-foreground">Review and manage flagged content</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold" data-testid="stat-pending">{pendingContent.length}</p>
                </div>
                <Flag className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Severity</p>
                  <p className="text-2xl font-bold text-red-600" data-testid="stat-critical">
                    {flaggedContent.filter(item => item.severity === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Content Removed</p>
                  <p className="text-2xl font-bold" data-testid="stat-removed">
                    {flaggedContent.filter(item => item.status === 'removed').length}
                  </p>
                </div>
                <X className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Content Approved</p>
                  <p className="text-2xl font-bold text-green-600" data-testid="stat-approved">
                    {flaggedContent.filter(item => item.status === 'approved').length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Flagged Content Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending Review ({pendingContent.length})
                </TabsTrigger>
                <TabsTrigger value="reviewed" data-testid="tab-reviewed">
                  Reviewed ({reviewedContent.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingContent.map((content) => (
                  <Card key={content.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedContent(content)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={content.userImage} alt={content.userName} />
                            <AvatarFallback>{content.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(content.type)}
                              <h3 className="font-semibold" data-testid={`content-user-${content.id}`}>
                                {content.userName}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2" data-testid={`content-preview-${content.id}`}>
                              {content.content.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Flagged: {formatDate(content.flaggedAt)} • Reason: {content.reason}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getSeverityColor(content.severity)}>
                            {content.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {content.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviewed" className="space-y-4 mt-6">
                {reviewedContent.map((content) => (
                  <Card key={content.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedContent(content)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={content.userImage} alt={content.userName} />
                            <AvatarFallback>{content.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(content.type)}
                              <h3 className="font-semibold" data-testid={`content-user-${content.id}`}>
                                {content.userName}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {content.content.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Reviewed: {content.reviewedAt && formatDate(content.reviewedAt)} by {content.reviewedBy}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getStatusColor(content.status)}>
                            {content.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {content.type.toUpperCase()}
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