import ProfessionalGridCard from '../ProfessionalGridCard';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export default function ProfessionalGridCardExample() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProfessionalGridCard
          id="1"
          name="Sarah"
          age={28}
          location="Downtown, Ghana"
          rating={4.8}
          reviewCount={47}
          hourlyRate={45}
          profileImage={femaleProfile}
          isOnline={true}
          isVerified={true}
          isProfessional={true}
          onClick={(id) => console.log('Clicked professional:', id)}
        />
        
        <ProfessionalGridCard
          id="2"
          name="Michael"
          age={32}
          location="East Legon, Ghana"
          rating={4.9}
          reviewCount={63}
          hourlyRate={50}
          profileImage={maleProfile}
          isOnline={false}
          lastSeen="Active 2 hours ago"
          isVerified={true}
          isProfessional={true}
          onClick={(id) => console.log('Clicked professional:', id)}
        />
      </div>
    </div>
  );
}