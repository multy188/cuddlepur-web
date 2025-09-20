import BookingCard from '../BookingCard';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function BookingCardExample() {
  return (
    <div className="p-4 max-w-lg space-y-4">
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
        onViewDetails={(id) => console.log('View details:', id)}
        onMessage={(id) => console.log('Message:', id)}
        onPay={(id) => console.log('Pay:', id)}
        onCancel={(id) => console.log('Cancel:', id)}
      />
      
      <BookingCard
        id="2"
        professionalName="Michael"
        professionalImage={femaleProfile}
        status="confirmed"
        date="Friday, Dec 15"
        time="6:30 PM"
        duration={1}
        location="Coffee House, Downtown"
        amount={45}
        onViewDetails={(id) => console.log('View details:', id)}
        onMessage={(id) => console.log('Message:', id)}
        onCancel={(id) => console.log('Cancel:', id)}
      />
    </div>
  );
}