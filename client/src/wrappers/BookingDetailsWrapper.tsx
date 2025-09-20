import { useLocation, useRoute } from "wouter";
import BookingDetails from "@/components/BookingDetails";
import { useNotifications } from "@/hooks";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function BookingDetailsWrapper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/booking/details/:bookingId");
  const { addNotification } = useNotifications();
  
  if (!match || !params?.bookingId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Booking not found</p>
      </div>
    );
  }
  
  // Mock booking data - in a real app, this would come from an API or state management
  const mockBookingDetails = {
    id: params.bookingId,
    status: "confirmed" as const,
    professional: {
      id: "1",
      name: "Sarah",
      profileImage: femaleProfile,
      isVerified: true,
      rating: 4.8
    },
    date: "Tomorrow, Dec 14",
    timeSlot: "14:00",
    duration: 2,
    location: "Your place",
    locationDetails: "123 Main St, Apartment 4B",
    sessionNotes: "Looking forward to a relaxing session",
    totalAmount: 90,
    platformFee: 9,
    sessionAmount: 81,
    paymentStatus: "paid" as const,
    paymentMethod: "credit_card",
    receiptId: "receipt-456",
    createdAt: new Date().toISOString(),
    cancellationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    refundAmount: 90
  };
  
  const handleBack = () => {
    setLocation("/bookings");
  };
  
  const handlePayNow = () => {
    setLocation(`/booking/payment/${params.bookingId}`);
  };
  
  const handleMessage = () => {
    setLocation("/messages");
  };
  
  const handleRequestTimeChange = () => {
    setLocation(`/time-change/request/${params.bookingId}`);
  };
  
  const handleCancel = () => {
    setLocation("/bookings");
  };
  
  const handleDownloadReceipt = () => {
    setLocation(`/receipt/${mockBookingDetails.receiptId}`);
  };
  
  const handleVerifyIdentity = () => {
    setLocation("/verification/identity");
  };
  
  const handleMeetupVerification = () => {
    setLocation("/verification/identity");
  };
  
  const handleStartSession = () => {
    setLocation(`/session/start/${params.bookingId}`);
  };
  
  const handleReviewSession = () => {
    setLocation(`/session/review/${params.bookingId}`);
  };
  
  return (
    <BookingDetails
      booking={mockBookingDetails}
      userRole="client"
      onBack={handleBack}
      onPayNow={handlePayNow}
      onMessage={handleMessage}
      onRequestTimeChange={handleRequestTimeChange}
      onCancel={handleCancel}
      onDownloadReceipt={handleDownloadReceipt}
      onVerifyIdentity={handleVerifyIdentity}
      onMeetupVerification={handleMeetupVerification}
      onStartSession={handleStartSession}
      onReviewSession={handleReviewSession}
    />
  );
}