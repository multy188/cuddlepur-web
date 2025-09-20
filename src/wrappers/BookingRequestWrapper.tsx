import { useLocation, useRoute } from "wouter";
import BookingRequest from "@/components/BookingRequest";
import { useProfessionals, useNotifications } from "@/hooks";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function BookingRequestWrapper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/booking/request/:professionalId");
  const { professionals } = useProfessionals();
  const { addNotification } = useNotifications();
  
  if (!match || !params?.professionalId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Professional not found</p>
      </div>
    );
  }
  
  const professional = professionals.find(p => p.id === params.professionalId);
  
  if (!professional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Professional not found</p>
      </div>
    );
  }
  
  const handleBack = () => {
    setLocation(`/professional/${params.professionalId}`);
  };
  
  const handleSubmitRequest = (bookingData: any) => {
    // Navigate to payment with booking data
    setLocation(`/booking/payment/${bookingData.professionalId}`);
    
    // Trigger booking request notification
    addNotification({
      type: 'booking_request',
      title: 'Booking Request Sent',
      message: 'Your booking request has been sent to the professional. They will respond within 24 hours.',
      userImage: femaleProfile,
      userName: professional.name
    });
  };
  
  return (
    <BookingRequest
      professional={professional}
      onBack={handleBack}
      onSubmitRequest={handleSubmitRequest}
    />
  );
}