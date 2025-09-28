import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import BookingCard from "@/components/BookingCard";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export default function BookingPageWrapper() {
  const [, setLocation] = useLocation();
  
  const handleViewDetails = (id: string) => {
    console.log('Navigating to booking details:', id);
    setLocation(`/booking/details/${id}`);
  };
  
  const handlePay = (id: string) => {
    console.log('Navigating to booking payment:', id);
    setLocation(`/booking/payment/${id}`);
  };
  
  const handleMessage = (id: string) => {
    console.log('Navigating to messages:', id);
    setLocation("/messages");
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <ThemeToggle />
        </div>
        
        <div className="space-y-4">
          <BookingCard
            id="1"
            professionalName="Sarah"
            professionalImage={femaleProfile}
            status="accepted"
            date="Tomorrow"
            time="2:00 PM"
            duration={2}
            location="Your place, 123 Main St"
            amount={90}
            notes="Looking forward to a relaxing session"
            onViewDetails={handleViewDetails}
            onMessage={handleMessage}
            onPay={handlePay}
            onCancel={(id) => console.log('Cancel:', id)}
          />
          
          <BookingCard
            id="2"
            professionalName="Michael"
            professionalImage={maleProfile}
            status="confirmed"
            date="Friday, Dec 15"
            time="6:30 PM"
            duration={1}
            location="Coffee House, Downtown"
            amount={45}
            onViewDetails={handleViewDetails}
            onMessage={handleMessage}
            onCancel={(id) => console.log('Cancel:', id)}
          />
        </div>
      </div>
    </div>
  );
}