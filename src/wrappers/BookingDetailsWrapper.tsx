import { useLocation, useRoute } from "wouter";
import BookingDetails from "@/components/BookingDetails";
import { useNotifications } from "@/hooks";
import { getBookingDetails } from "@mock/bookingDetails";

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
  
  const bookingDetails = getBookingDetails(params.bookingId);
  
  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Booking not found</p>
      </div>
    );
  }
  
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
    setLocation(`/receipt/${bookingDetails.receiptId}`);
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
      booking={bookingDetails}
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