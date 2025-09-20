import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  User, 
  Clock,
  MapPin,
  Phone,
  Calendar,
  Flag,
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink
} from "lucide-react";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

interface SafetyReportsManagementProps {
  onNavigate: (page: string) => void;
}

interface SafetyReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterImage: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedUserImage: string;
  reportType: 'harassment' | 'inappropriate_behavior' | 'safety_concern' | 'fraud' | 'violence' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  description: string;
  incidentDate: string;
  reportedAt: string;
  location?: string;
  bookingId?: string;
  evidence?: string[];
  assignedTo?: string;
  resolution?: string;
  actionsTaken?: string[];
  followUpRequired: boolean;
  notes?: string;
}

export default function SafetyReportsManagement({ onNavigate }: SafetyReportsManagementProps) {
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // TODO: Replace with real data from API
  const safetyReports: SafetyReport[] = [
    {
      id: "RPT-001",
      reporterId: "USR-123",
      reporterName: "Sarah Johnson",
      reporterImage: femaleProfile,
      reportedUserId: "USR-456",
      reportedUserName: "Mike Thompson",
      reportedUserImage: maleProfile,
      reportType: "inappropriate_behavior",
      severity: "high",
      status: "pending",
      description: "During our booking, he made several inappropriate comments and tried to touch me inappropriately despite clear boundaries being set. I felt unsafe and had to end the session early.",
      incidentDate: "2025-09-19T19:30:00Z",
      reportedAt: "2025-09-20T08:15:00Z",
      location: "Client's location - East Legon",
      bookingId: "BK-789",
      evidence: ["screenshot1.jpg", "audio_recording.mp3"],
      followUpRequired: true
    },
    {
      id: "RPT-002",
      reporterId: "USR-789",
      reporterName: "David Wilson",
      reporterImage: maleProfile,
      reportedUserId: "USR-234",
      reportedUserName: "Lisa Chen",
      reportedUserImage: femaleProfile,
      reportType: "fraud",
      severity: "medium",
      status: "investigating",
      description: "Professional requested payment outside the platform and never showed up for the booked session. When contacted, they denied ever confirming the booking.",
      incidentDate: "2025-09-18T14:00:00Z",
      reportedAt: "2025-09-18T16:30:00Z",
      bookingId: "BK-456",
      assignedTo: "Admin John",
      followUpRequired: true,
      notes: "Checking payment records and communication logs."
    },
    {
      id: "RPT-003",
      reporterId: "USR-345",
      reporterName: "Emma Davis",
      reporterImage: femaleProfile,
      reportedUserId: "USR-567",
      reportedUserName: "Alex Rodriguez",
      reportedUserImage: maleProfile,
      reportType: "harassment",
      severity: "critical",
      status: "resolved",
      description: "User has been sending threatening messages after I declined additional services. Messages include threats of physical harm and doxxing threats.",
      incidentDate: "2025-09-17T20:15:00Z",
      reportedAt: "2025-09-17T21:00:00Z",
      evidence: ["threatening_messages.pdf"],
      assignedTo: "Admin Sarah",
      resolution: "User account permanently banned. Local authorities contacted.",
      actionsTaken: ["Account banned", "Evidence forwarded to police", "Reporter provided safety resources"],
      followUpRequired: false
    },
    {
      id: "RPT-004",
      reporterId: "USR-678",
      reporterName: "Michael Brown",
      reporterImage: maleProfile,
      reportedUserId: "USR-891",
      reportedUserName: "Jessica White",
      reportedUserImage: femaleProfile,
      reportType: "safety_concern",
      severity: "low",
      status: "dismissed",
      description: "Professional seemed intoxicated during our session and was acting strangely.",
      incidentDate: "2025-09-16T18:00:00Z",
      reportedAt: "2025-09-16T22:30:00Z",
      bookingId: "BK-123",
      assignedTo: "Admin John",
      resolution: "Investigation found no evidence of intoxication. Professional had disclosed they were feeling unwell but completed session professionally.",
      actionsTaken: ["Interviewed both parties", "Reviewed session notes"],
      followUpRequired: false
    }
  ];

  const pendingReports = safetyReports.filter(report => report.status === 'pending');
  const investigatingReports = safetyReports.filter(report => report.status === 'investigating');
  const resolvedReports = safetyReports.filter(report => report.status === 'resolved' || report.status === 'dismissed');

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
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "investigating": return "bg-blue-100 text-blue-800 border-blue-200";
      case "dismissed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "harassment": return "bg-red-100 text-red-800 border-red-200";
      case "violence": return "bg-red-100 text-red-800 border-red-200";
      case "inappropriate_behavior": return "bg-orange-100 text-orange-800 border-orange-200";
      case "fraud": return "bg-purple-100 text-purple-800 border-purple-200";
      case "safety_concern": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatReportType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleAssignToSelf = (reportId: string) => {
    console.log("Assigning report to self:", reportId);
    // TODO: API call to assign report
  };

  const handleMarkResolved = (reportId: string) => {
    console.log("Marking report as resolved:", reportId);
    setSelectedReport(null);
    // TODO: API call to resolve report
  };

  const handleDismissReport = (reportId: string) => {
    console.log("Dismissing report:", reportId);
    setSelectedReport(null);
    // TODO: API call to dismiss report
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (selectedReport) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedReport(null)}
              data-testid="button-back-to-reports"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Safety Report Investigation</h1>
              <p className="text-muted-foreground">Report ID: {selectedReport.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5" />
                    Report Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex gap-2">
                      <Badge className={getSeverityColor(selectedReport.severity)}>
                        {selectedReport.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getReportTypeColor(selectedReport.reportType)}>
                        {formatReportType(selectedReport.reportType)}
                      </Badge>
                      <Badge className={getStatusColor(selectedReport.status)}>
                        {selectedReport.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Incident Date</label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedReport.incidentDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Reported Date</label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedReport.reportedAt)}
                      </p>
                    </div>
                    {selectedReport.location && (
                      <div className="col-span-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground" data-testid="report-location">
                            {selectedReport.location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Incident Description</label>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm" data-testid="report-description">
                        {selectedReport.description}
                      </p>
                    </div>
                  </div>

                  {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Evidence Provided</label>
                      <div className="space-y-2">
                        {selectedReport.evidence.map((evidence, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm" data-testid={`evidence-${index}`}>{evidence}</span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                {/* Reporter Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Reporter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedReport.reporterImage} alt={selectedReport.reporterName} />
                        <AvatarFallback>{selectedReport.reporterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold" data-testid="reporter-name">
                          {selectedReport.reporterName}
                        </h3>
                        <p className="text-sm text-muted-foreground">ID: {selectedReport.reporterId}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" data-testid="button-view-reporter">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Reported User Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Reported User
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedReport.reportedUserImage} alt={selectedReport.reportedUserName} />
                        <AvatarFallback>{selectedReport.reportedUserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold" data-testid="reported-user-name">
                          {selectedReport.reportedUserName}
                        </h3>
                        <p className="text-sm text-muted-foreground">ID: {selectedReport.reportedUserId}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" data-testid="button-view-reported-user">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Investigation Notes */}
              {(selectedReport.status === 'resolved' || selectedReport.status === 'dismissed') && (
                <Card>
                  <CardHeader>
                    <CardTitle>Investigation Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedReport.resolution && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Resolution</label>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm" data-testid="resolution-details">
                            {selectedReport.resolution}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedReport.actionsTaken && selectedReport.actionsTaken.length > 0 && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Actions Taken</label>
                        <div className="space-y-1">
                          {selectedReport.actionsTaken.map((action, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm" data-testid={`action-${index}`}>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Resolved by {selectedReport.assignedTo}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investigation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Status: {selectedReport.status.toUpperCase()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Severity: {selectedReport.severity.toUpperCase()}</span>
                  </div>

                  {selectedReport.assignedTo && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Assigned to: {selectedReport.assignedTo}</span>
                    </div>
                  )}

                  {selectedReport.followUpRequired && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Follow-up Required</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedReport.status === 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAssignToSelf(selectedReport.id)}
                      data-testid="button-assign-to-self"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Assign to Me
                    </Button>
                  </CardContent>
                </Card>
              )}

              {selectedReport.status === 'investigating' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Investigation Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleMarkResolved(selectedReport.id)}
                      data-testid="button-mark-resolved"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Resolved
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => handleDismissReport(selectedReport.id)}
                      data-testid="button-dismiss-report"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Dismiss Report
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Related Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedReport.bookingId && (
                    <Button variant="outline" size="sm" className="w-full" data-testid="button-view-booking">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Booking {selectedReport.bookingId}
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-view-communication">
                    <Phone className="w-4 h-4 mr-2" />
                    View Communications
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-user-history">
                    <FileText className="w-4 h-4 mr-2" />
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Safety Reports Management</h1>
            <p className="text-muted-foreground">Investigate and resolve safety incidents</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Investigation</p>
                  <p className="text-2xl font-bold" data-testid="stat-pending">{pendingReports.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Under Investigation</p>
                  <p className="text-2xl font-bold text-blue-600" data-testid="stat-investigating">{investigatingReports.length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Reports</p>
                  <p className="text-2xl font-bold text-red-600" data-testid="stat-critical">
                    {safetyReports.filter(report => report.severity === 'critical').length}
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
                  <p className="text-sm font-medium text-muted-foreground">Resolved This Week</p>
                  <p className="text-2xl font-bold text-green-600" data-testid="stat-resolved">
                    {safetyReports.filter(report => report.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Reports Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger value="investigating" data-testid="tab-investigating">
                  Investigating ({investigatingReports.length})
                </TabsTrigger>
                <TabsTrigger value="resolved" data-testid="tab-resolved">
                  Resolved ({resolvedReports.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingReports.map((report) => (
                  <Card key={report.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedReport(report)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex -space-x-2">
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reporterImage} alt={report.reporterName} />
                              <AvatarFallback>{report.reporterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reportedUserImage} alt={report.reportedUserName} />
                              <AvatarFallback>{report.reportedUserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold" data-testid={`report-title-${report.id}`}>
                                {report.reporterName} reported {report.reportedUserName}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.description.substring(0, 120)}...
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Reported: {formatDate(report.reportedAt)}</span>
                              {report.bookingId && <span>Booking: {report.bookingId}</span>}
                              {report.followUpRequired && (
                                <span className="text-orange-600 font-medium">Follow-up Required</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getSeverityColor(report.severity)}>
                            {report.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getReportTypeColor(report.reportType)}>
                            {formatReportType(report.reportType)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="investigating" className="space-y-4 mt-6">
                {investigatingReports.map((report) => (
                  <Card key={report.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedReport(report)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex -space-x-2">
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reporterImage} alt={report.reporterName} />
                              <AvatarFallback>{report.reporterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reportedUserImage} alt={report.reportedUserName} />
                              <AvatarFallback>{report.reportedUserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold" data-testid={`report-title-${report.id}`}>
                                {report.reporterName} reported {report.reportedUserName}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.description.substring(0, 120)}...
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Assigned to: {report.assignedTo}</span>
                              {report.bookingId && <span>Booking: {report.bookingId}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getStatusColor(report.status)}>
                            INVESTIGATING
                          </Badge>
                          <Badge className={getReportTypeColor(report.reportType)}>
                            {formatReportType(report.reportType)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4 mt-6">
                {resolvedReports.map((report) => (
                  <Card key={report.id} className="hover-elevate cursor-pointer" onClick={() => setSelectedReport(report)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex -space-x-2">
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reporterImage} alt={report.reporterName} />
                              <AvatarFallback>{report.reporterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={report.reportedUserImage} alt={report.reportedUserName} />
                              <AvatarFallback>{report.reportedUserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold" data-testid={`report-title-${report.id}`}>
                                {report.reporterName} reported {report.reportedUserName}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.description.substring(0, 120)}...
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Resolved by: {report.assignedTo}</span>
                              {report.actionsTaken && <span>{report.actionsTaken.length} actions taken</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.toUpperCase()}
                          </Badge>
                          <Badge className={getReportTypeColor(report.reportType)}>
                            {formatReportType(report.reportType)}
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