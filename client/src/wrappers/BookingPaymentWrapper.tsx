import { useLocation, useRoute } from "wouter";
import BookingPayment from "@/components/BookingPayment";
import { useNotifications, useProfessionals } from "@/hooks";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function BookingPaymentWrapper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/booking/payment/:bookingId");
  const { addNotification } = useNotifications();
  const { professionals } = useProfessionals();
  
  if (!match || !params?.bookingId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Booking not found</p>
      </div>
    );
  }
  
  // Mock booking payment data - in a real app, this would come from an API or state management
  const mockBookingPayment = {
    id: params.bookingId,
    professional: {
      id: "1",
      name: "Sarah",
      profileImage: femaleProfile,
      isVerified: true
    },
    date: "Tomorrow, Dec 14",
    timeSlot: "14:00",
    duration: 2,
    location: "Your place",
    totalAmount: 90,
    platformFee: 9,
    sessionAmount: 81
  };
  
  const handleBack = () => {
    setLocation(`/booking/details/${params.bookingId}`);
  };
  
  const handlePaymentComplete = (paymentData: any) => {
    // Navigate back to bookings
    setLocation("/bookings");
    
    // Trigger payment completion notification
    addNotification({
      type: 'booking_paid',
      title: 'Payment Successful',
      message: 'Your payment has been processed successfully. Booking confirmed!',
      userImage: femaleProfile,
      userName: mockBookingPayment.professional.name
    });
  };
  
  const handleSkipPayment = () => {
    setLocation("/bookings");
  };
  
  return (
    <BookingPayment
      booking={mockBookingPayment}
      onBack={handleBack}
      onPaymentComplete={handlePaymentComplete}
      onSkipPayment={handleSkipPayment}
    />
  );
}