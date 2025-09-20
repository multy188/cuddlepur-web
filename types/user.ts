export interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Availability {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

export interface Professional {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  profileImage: string;
  profileImages: string[];
  isOnline: boolean;
  lastSeen?: string;
  isVerified: boolean;
  specialties: string[];
  height: string;
  ethnicity: string;
  job: string;
  smoking: string;
  drinking: string;
  relationshipStatus: string;
  availability: Availability;
  reviews: Review[];
  isProfessional?: boolean;
}

export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  time?: string;
}