import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, Phone, Users, FileText, Eye } from "lucide-react";
import { useSafety } from '@/hooks';

interface SafetyCenterProps {
  onBack: () => void;
}

export default function SafetyCenter({ onBack }: SafetyCenterProps) {
  const { safetyGuidelines, emergencyContacts, callEmergencyNumber } = useSafety();
  
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
            <h1 className="text-lg font-semibold">Safety Center</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Safety Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {safetyGuidelines.map((guideline, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm">{guideline.title}</h3>
                  <p className="text-sm text-muted-foreground">{guideline.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Report Abuse */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Report Abuse or Violation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you experience or witness any inappropriate behavior, harassment, or violations of our community guidelines, please report it immediately.
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              data-testid="button-report-abuse"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Abuse
            </Button>
          </CardContent>
        </Card>

        {/* Block/Unblock Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-600" />
              Manage Blocked Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and manage users you have blocked. You can unblock users at any time.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              data-testid="button-manage-blocked"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Blocked Users
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{contact.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-call-${contact.number}`}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.number}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Safety Check-in */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Safety Check-in Feature
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Set up automatic safety check-ins during your sessions. We'll send you reminders to confirm you're safe.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              data-testid="button-setup-checkin"
            >
              <Shield className="h-4 w-4 mr-2" />
              Setup Safety Check-in
            </Button>
          </CardContent>
        </Card>

        {/* Platform Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Platform Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              data-testid="button-community-guidelines"
            >
              <FileText className="h-4 w-4 mr-2" />
              Community Guidelines
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              data-testid="button-terms-service"
            >
              <FileText className="h-4 w-4 mr-2" />
              Terms of Service
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
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