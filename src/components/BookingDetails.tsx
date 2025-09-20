import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  MessageCircle, 
  Download, 
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  CreditCard,
  RefreshCw,
  XCircle,
  Edit
} from "lucide-react";
import { format } from "date-fns";

interface BookingDetailsData {
  id: string;
  status: "requested" | "accepted" | "payment_required" | "confirmed" | "identity_verified" | "meetup_verified" | "session_ready" | "in_progress" | "completed" | "cancelled";
  professional: {
    id: string;
    name: string;
    profileImage: string;
    isVerified: boolean;
    rating: number;
  };
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  locationDetails: string;
  sessionNotes: string;
  totalAmount: number;
  platformFee: number;
  sessionAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  receiptId?: string;
  createdAt: string;
  cancellationDeadline: string;
  refundAmount: number;
}

interface BookingDetailsProps {
  booking: BookingDetailsData;
  userRole?: "professional" | "client";
  onBack: () => void;
  onPayNow: () => void;
  onMessage: () => void;
  onRequestTimeChange: () => void;
  onCancel: () => void;
  onDownloadReceipt: () => void;
  onVerifyIdentity?: () => void;
  onMeetupVerification?: () => void;
  onStartSession?: () => void;
  onReviewSession?: () => void;
}

export default function BookingDetails({ 
  booking, 
  userRole = "client",
  onBack, 
  onPayNow, 
  onMessage, 
  onRequestTimeChange, 
  onCancel,
  onDownloadReceipt,
  onVerifyIdentity,
  onMeetupVerification,
  onStartSession,
  onReviewSession
}: BookingDetailsProps) {
  
  const statusSteps = [
    { key: "requested", label: "Requested", icon: Clock },
    { key: "accepted", label: "Accepted", icon: CheckCircle },
    { key: "payment_required", label: "Payment Required", icon: DollarSign },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "identity_verified", label: "Identity Verified", icon: User },
    { key: "meetup_verified", label: "Meetup Verified", icon: CheckCircle },
    { key: "session_ready", label: "Session Ready", icon: Clock },
    { key: "in_progress", label: "In Progress", icon: RefreshCw },
    { key: "completed", label: "Completed", icon: CheckCircle }
  ];

  const getCurrentStepIndex = () => {
    if (booking.status === "cancelled") return -1;
    return statusSteps.findIndex(step => step.key === booking.status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "in_progress": return "text-blue-600";
      case "session_ready": return "text-green-600";
      case "meetup_verified": return "text-green-600";
      case "identity_verified": return "text-blue-600";
      case "confirmed": return "text-blue-600";
      case "payment_required": return "text-orange-600";
      case "accepted": return "text-blue-600";
      case "requested": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = () => {
    const baseClasses = "font-medium";
    switch (booking.status) {
      case "completed":
        return <Badge className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>Completed</Badge>;
      case "in_progress":
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>Session Started</Badge>;
      case "session_ready":
        return <Badge className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>Ready to Start</Badge>;
      case "meetup_verified":
        return <Badge className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>Meetup Verified</Badge>;
      case "identity_verified":
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>Identity Verified</Badge>;
      case "confirmed":
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>Confirmed</Badge>;
      case "payment_required":
        return <Badge className={`${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`}>Payment Required</Badge>;
      case "accepted":
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>Accepted</Badge>;
      case "requested":
        return <Badge className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>Requested</Badge>;
      case "cancelled":
        return <Badge className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`}>Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const currentStepIndex = getCurrentStepIndex();
  const progressPercentage = booking.status === "cancelled" ? 0 : 
                           booking.status === "completed" ? 100 :
                           ((currentStepIndex + 1) / statusSteps.length) * 100;

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

  const canRequestTimeChange = ["accepted", "confirmed"].includes(booking.status);
  const canCancel = !["completed", "cancelled"].includes(booking.status);
  const showPayment = booking.status === "payment_required";
  const hoursUntilDeadline = Math.max(0, Math.floor((new Date(booking.cancellationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60)));

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
            
            <h1 className="font-semibold">Booking Details</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Booking Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Status</CardTitle>
              {getStatusBadge()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {booking.status === "cancelled" && (
              <div className="text-center py-4">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-medium">This booking has been cancelled</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional & Session Info */}
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={booking.professional.profileImage} alt={booking.professional.name} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h4 className="font-semibold text-lg" data-testid="professional-name">
                  {booking.professional.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>★ {booking.professional.rating}</span>
                  {booking.professional.isVerified && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Date & Time</span>
                  <p className="font-medium" data-testid="session-datetime">
                    {booking.date} • {getTimeLabel(booking.timeSlot)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <p className="font-medium" data-testid="session-duration">
                    {booking.duration} hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <span className="text-sm text-muted-foreground">Location</span>
                  <p className="font-medium" data-testid="session-location">
                    {booking.location}
                  </p>
                  {booking.locationDetails && (
                    <p className="text-sm text-muted-foreground">
                      {booking.locationDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {booking.sessionNotes && (
              <>
                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground">Session Notes</span>
                  <p className="text-sm mt-1" data-testid="session-notes">
                    {booking.sessionNotes}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Payment Status</span>
              <Badge variant={booking.paymentStatus === "paid" ? "default" : 
                           booking.paymentStatus === "failed" ? "destructive" : "secondary"}>
                {booking.paymentStatus === "paid" ? "Paid" :
                 booking.paymentStatus === "failed" ? "Failed" :
                 booking.paymentStatus === "refunded" ? "Refunded" : "Pending"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Session ({booking.duration} hours)</span>
                <span data-testid="session-cost">${booking.sessionAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Platform fee</span>
                <span data-testid="platform-fee">${booking.platformFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span data-testid="total-amount">${booking.totalAmount}</span>
              </div>
            </div>

            {booking.paymentMethod && (
              <div className="flex justify-between text-sm">
                <span>Payment Method</span>
                <span className="capitalize" data-testid="payment-method">
                  {booking.paymentMethod.replace("_", " ")}
                </span>
              </div>
            )}

            {booking.receiptId && booking.paymentStatus === "paid" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDownloadReceipt}
                className="w-full"
                data-testid="button-download-receipt"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        {canCancel && (
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <AlertTriangle className="w-5 h-5" />
                Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-orange-700 dark:text-orange-300">
              <p className="font-medium">
                {hoursUntilDeadline > 12 ? "Full refund available" : 
                 hoursUntilDeadline > 0 ? "50% refund available" : "No refund available"}
              </p>
              <p className="text-sm">
                Current refund amount: <span className="font-medium">${booking.refundAmount}</span>
              </p>
              {hoursUntilDeadline > 0 && hoursUntilDeadline <= 12 && (
                <p className="text-sm">
                  {hoursUntilDeadline} hours until reduced refund
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {showPayment && (
            <Button
              onClick={onPayNow}
              className="w-full"
              size="lg"
              data-testid="button-pay-now"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now - GH₵{booking.totalAmount}
            </Button>
          )}

          {/* Identity Verification Button (for professionals when status is confirmed) */}
          {booking.status === "confirmed" && userRole === "professional" && onVerifyIdentity && (
            <Button
              onClick={onVerifyIdentity}
              className="w-full"
              size="lg"
              data-testid="button-verify-identity"
            >
              <User className="w-4 h-4 mr-2" />
              Verify Client Identity
            </Button>
          )}

          {/* Meetup Verification Button (for meetup day identity verification) */}
          {booking.status === "identity_verified" && onMeetupVerification && (
            <Button
              onClick={onMeetupVerification}
              className="w-full"
              size="lg"
              data-testid="button-meetup-verification"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Start Meetup Verification
            </Button>
          )}

          {/* Session Start Button (when both parties are ready) */}
          {booking.status === "session_ready" && onStartSession && (
            <Button
              onClick={onStartSession}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              data-testid="button-start-session"
            >
              <Clock className="w-4 h-4 mr-2" />
              Start Session
            </Button>
          )}

          {/* Review Session Button (after completion) */}
          {booking.status === "completed" && onReviewSession && (
            <Button
              onClick={onReviewSession}
              className="w-full"
              size="lg"
              data-testid="button-review-session"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Write Review
            </Button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onMessage}
              data-testid="button-message"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message {userRole === "professional" ? "Client" : "Professional"}
            </Button>

            {canRequestTimeChange && (
              <Button
                variant="outline"
                onClick={onRequestTimeChange}
                data-testid="button-request-time-change"
              >
                <Edit className="w-4 h-4 mr-2" />
                Request Time Change
              </Button>
            )}
          </div>

          {canCancel && (
            <Button
              variant="destructive"
              onClick={onCancel}
              className="w-full"
              data-testid="button-cancel-booking"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}