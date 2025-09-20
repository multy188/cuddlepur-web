import ProfileCard from '../ProfileCard';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function ProfileCardExample() {
  return (
    <div className="p-4 max-w-2xl">
      <ProfileCard
        id="1"
        name="Sarah"
        age={28}
        location="Downtown, Ghana"
        distance="2.5 km away"
        rating={4.8}
        reviewCount={47}
        hourlyRate={45}
        bio="Certified massage therapist specializing in relaxation and stress relief. I love creating safe, comfortable spaces for meaningful connection."
        profileImage={femaleProfile}
        isOnline={true}
        isVerified={true}
        specialties={["Relaxation", "Stress Relief", "Conversation"]}
        onViewProfile={(id) => console.log('View profile:', id)}
        onBookSession={(id) => console.log('Book session:', id)}
        onLike={(id) => console.log('Like profile:', id)}
      />
    </div>
  );
}