import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  User,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Timer,
  DollarSign,
  Users,
  Loader
} from "lucide-react";

interface SessionParticipant {
  id: string;
  name: string;
  profileImage: string;
  role: "professional" | "client";
  hasConfirmed: boolean;
  confirmedAt?: string;
}

interface SessionData {
  id: string;
  bookingId: string;
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  totalAmount: number;
  professional: SessionParticipant;
  client: SessionParticipant;
  status: "waiting_confirmation" | "ready_to_start" | "in_progress" | "completed";
  startedAt?: string;
  scheduledEndTime?: string;
}

interface SessionStartProps {
  session: SessionData;
  currentUserId: string;
  userRole: "professional" | "client";
  onBack: () => void;
  onConfirmStart: () => void;
  onStartSession: () => void;
  onEndSession?: () => void;
}

export default function SessionStart({ 
  session, 
  currentUserId,
  userRole,
  onBack, 
  onConfirmStart,
  onStartSession,
  onEndSession 
}: SessionStartProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const currentUser = userRole === "professional" ? session.professional : session.client;
  const otherUser = userRole === "professional" ? session.client : session.professional;

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

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Calculate time remaining in session
  useEffect(() => {
    if (session.status === "in_progress" && session.scheduledEndTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const endTime = new Date(session.scheduledEndTime!);
        const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / (1000 * 60)));
        setTimeRemaining(remaining);

        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [session.status, session.scheduledEndTime]);

  const handleConfirmStart = async () => {
    setIsConfirming(true);
    
    // Simulate confirmation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirmStart();
    setIsConfirming(false);
  };

  const bothConfirmed = session.professional.hasConfirmed && session.client.hasConfirmed;
  const canStartSession = session.status === "ready_to_start" && bothConfirmed;

  // Session in progress view
  if (session.status === "in_progress") {
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
              
              <h1 className="font-semibold">Session Active</h1>
              
              <Badge variant="default" className="bg-green-600">
                <Timer className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          {/* Session Progress */}
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Play className="w-5 h-5" />
                Session in Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                  {formatTimeRemaining(timeRemaining)}
                </div>
                <p className="text-green-700 dark:text-green-300">
                  Time remaining
                </p>
              </div>

              <Progress 
                value={((session.duration * 60 - timeRemaining) / (session.duration * 60)) * 100} 
                className="w-full"
              />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-green-700 dark:text-green-300">Started</p>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {session.startedAt ? new Date(session.startedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-green-700 dark:text-green-300">Scheduled End</p>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {session.scheduledEndTime ? new Date(session.scheduledEndTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium" data-testid="session-with">
                    {otherUser.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "professional" ? "Your client" : "Your professional"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="session-date">{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="session-duration">{session.duration}h session</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="session-location">{session.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          {userRole === "professional" && (
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Payment Active
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      You'll receive GH₵{session.totalAmount} when session ends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* End Session Button */}
          {onEndSession && timeRemaining <= 5 && (
            <Button
              onClick={onEndSession}
              className="w-full"
              size="lg"
              data-testid="button-end-session"
            >
              End Session
            </Button>
          )}
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
            
            <h1 className="font-semibold">Start Session</h1>
            
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Session Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Session Ready to Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={otherUser.profileImage} alt={otherUser.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium" data-testid="session-with">
                  {otherUser.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {userRole === "professional" ? "Your client" : "Your professional"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-date">{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-time">{getTimeLabel(session.timeSlot)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-duration">{session.duration}h duration</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-amount">GH₵{session.totalAmount}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span data-testid="session-location">{session.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Status */}
        <Card>
          <CardHeader>
            <CardTitle>Confirmation Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Professional Confirmation */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={session.professional.profileImage} alt={session.professional.name} />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium" data-testid="professional-name">
                      {session.professional.name}
                    </p>
                    <p className="text-sm text-muted-foreground">Professional</p>
                  </div>
                </div>
                <div className="text-right">
                  {session.professional.hasConfirmed ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Loader className="w-3 h-3 mr-1" />
                      Waiting
                    </Badge>
                  )}
                  {session.professional.confirmedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(session.professional.confirmedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  )}
                </div>
              </div>

              {/* Client Confirmation */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={session.client.profileImage} alt={session.client.name} />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium" data-testid="client-name">
                      {session.client.name}
                    </p>
                    <p className="text-sm text-muted-foreground">Client</p>
                  </div>
                </div>
                <div className="text-right">
                  {session.client.hasConfirmed ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Loader className="w-3 h-3 mr-1" />
                      Waiting
                    </Badge>
                  )}
                  {session.client.confirmedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(session.client.confirmedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Alert>
          <DollarSign className="h-4 w-4" />
          <AlertDescription>
            <strong>Payment Information:</strong> Payment will only be processed once both parties confirm and the session starts. 
            {userRole === "professional" && " You'll receive payment when the session completes successfully."}
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!currentUser.hasConfirmed ? (
            <Button
              onClick={handleConfirmStart}
              disabled={isConfirming}
              className="w-full"
              size="lg"
              data-testid="button-confirm-session"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isConfirming ? "Confirming..." : "Confirm Ready to Start"}
            </Button>
          ) : (
            <div className="text-center">
              <Badge variant="default" className="bg-green-600 mb-4">
                <CheckCircle className="w-3 h-3 mr-1" />
                You've Confirmed
              </Badge>
              {!bothConfirmed && (
                <p className="text-muted-foreground">
                  Waiting for {otherUser.name} to confirm...
                </p>
              )}
            </div>
          )}

          {canStartSession && (
            <Button
              onClick={onStartSession}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              data-testid="button-start-session"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Session Now
            </Button>
          )}

          {!canStartSession && currentUser.hasConfirmed && (
            <p className="text-center text-sm text-muted-foreground">
              Session will start automatically once both parties confirm
            </p>
          )}
        </div>
      </div>
    </div>
  );
}