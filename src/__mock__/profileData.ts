import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import type { ProfileData } from "@/types/user";

export const mockProfileData: ProfileData = {
  fullName: "Alex Johnson",
  email: "alex@example.com", 
  phone: "+233 24 123 4567",
  dateOfBirth: "1995-08-15",
  gender: "Prefer not to say",
  location: "Accra, Ghana",
  bio: "Looking for genuine connections and meaningful conversations. I enjoy outdoor activities, reading, and trying new cuisines.",
  interests: ["Reading", "Outdoor Activities", "Cooking", "Music"],
  job: "Marketing Specialist",
  height: "5'7\"",
  ethnicity: "Prefer not to say",
  smoking: "No",
  drinking: "Occasionally", 
  relationshipStatus: "Single",
  hostGuestPreference: "Both",
  isVerified: true,
  profileImages: [femaleProfile],
  hourlyRate: 45,
  availability: {
    morning: true,
    afternoon: false, 
    evening: true
  },
  isProfessional: false
};