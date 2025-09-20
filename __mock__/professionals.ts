import type { Professional } from '@types';

export const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    location: "Downtown, Ghana",
    distance: "2.5 km away",
    rating: 4.8,
    reviewCount: 47,
    hourlyRate: 45,
    bio: "Certified massage therapist specializing in relaxation and stress relief. I love creating safe, comfortable spaces for meaningful connection.",
    profileImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    profileImages: ["@assets/generated_images/Professional_profile_photo_f962fff8.png", "@assets/generated_images/Professional_profile_photo_f962fff8.png", "@assets/generated_images/Professional_profile_photo_f962fff8.png"],
    isOnline: true,
    isVerified: true,
    specialties: ["Relaxation", "Stress Relief", "Conversation"],
    height: "5'6\"",
    ethnicity: "African",
    job: "Massage Therapist",
    smoking: "No",
    drinking: "Occasionally",
    relationshipStatus: "Single",
    availability: {
      morning: true,
      afternoon: false,
      evening: true
    },
    reviews: [
      {
        id: "1",
        reviewer: "John D.",
        rating: 5,
        comment: "Sarah was wonderful company! Very respectful and great conversation.",
        date: "2 weeks ago"
      },
      {
        id: "2",
        reviewer: "Lisa M.",
        rating: 4,
        comment: "Had a lovely afternoon exploring the city. Highly recommend!",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: "2",
    name: "Michael", 
    age: 32,
    location: "East Legon, Ghana",
    distance: "4.1 km away",
    rating: 4.9,
    reviewCount: 63,
    hourlyRate: 50,
    bio: "Professional counselor offering supportive companionship and conversation. Experienced in creating comfortable, judgment-free environments.",
    profileImage: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png",
    profileImages: ["@assets/generated_images/Male_professional_profile_photo_38a68cd4.png", "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"],
    isOnline: true,
    lastSeen: "Active 1 hour ago",
    isVerified: true,
    specialties: ["Conversation", "Support", "Counseling"],
    height: "6'0\"",
    ethnicity: "African",
    job: "Professional Counselor",
    smoking: "No",
    drinking: "No",
    relationshipStatus: "In a relationship",
    availability: {
      morning: false,
      afternoon: true,
      evening: true
    },
    reviews: [
      {
        id: "3",
        reviewer: "Emma K.",
        rating: 5,
        comment: "Michael is an excellent listener and provides great emotional support.",
        date: "1 week ago"
      },
      {
        id: "4",
        reviewer: "David S.",
        rating: 5,
        comment: "Professional and caring. Really helped me through a difficult time.",
        date: "2 weeks ago"
      }
    ]
  }
];