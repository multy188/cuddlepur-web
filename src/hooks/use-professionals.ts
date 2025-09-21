import { useProfessionals as useApiProfessionals, useUser } from './useApi';
import type { Professional } from '@types';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

interface UseProfessionalsOptions {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
}

export function useProfessionals(options: UseProfessionalsOptions = {}) {
  const { data, isLoading, error } = useApiProfessionals(options);

  // Create mock professionals for testing when database is empty
  const mockProfessionals = [
    {
      id: 'mock-1',
      name: 'Sarah Johnson',
      profileImage: femaleProfile,
      profileImages: [femaleProfile],
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 45,
      location: 'Accra, Greater Accra',
      bio: 'Professional cuddler with 3+ years experience. Specializing in emotional support and relaxation.',
      services: ['Platonic Cuddling', 'Emotional Support', 'Relaxation'],
      experience: '3+ years of professional cuddling experience',
      isVerified: true,
      isOnline: true,
      responseTime: '~10 min',
      completedSessions: 156,
      expertise: ['Platonic Cuddling', 'Emotional Support'],
      age: 28,
      languages: ['English', 'Twi'],
      workingHours: '9 AM - 10 PM',
      certifications: ['Certified Professional Cuddler'],
      portfolioImages: [],
      description: 'Warm, caring professional who creates safe spaces for connection and comfort.',
      availability: 'Available now'
    },
    {
      id: 'mock-2',
      name: 'Michael Asante',
      profileImage: maleProfile,
      profileImages: [maleProfile],
      rating: 4.7,
      reviewCount: 89,
      hourlyRate: 40,
      location: 'Kumasi, Ashanti',
      bio: 'Compassionate professional offering platonic companionship and emotional support.',
      services: ['Platonic Cuddling', 'Companionship', 'Conversation'],
      experience: '2+ years helping people feel more connected',
      isVerified: true,
      isOnline: false,
      responseTime: '~15 min',
      completedSessions: 98,
      expertise: ['Platonic Cuddling', 'Companionship'],
      age: 32,
      languages: ['English', 'Twi'],
      workingHours: '8 AM - 9 PM',
      certifications: ['Professional Cuddling Certification'],
      portfolioImages: [],
      description: 'Patient and understanding, dedicated to providing comfort and genuine connection.',
      availability: 'Currently unavailable',
      lastSeen: '2 hours ago'
    },
    {
      id: 'mock-3',
      name: 'Grace Mensah',
      profileImage: femaleProfile,
      profileImages: [femaleProfile],
      rating: 4.8,
      reviewCount: 203,
      hourlyRate: 50,
      location: 'Cape Coast, Central',
      bio: 'Experienced therapeutic companion specializing in stress relief and emotional wellness.',
      services: ['Therapeutic Touch', 'Stress Relief', 'Mindfulness'],
      experience: '4+ years in therapeutic companionship',
      isVerified: true,
      isOnline: true,
      responseTime: '~5 min',
      completedSessions: 267,
      expertise: ['Therapeutic Touch', 'Stress Relief'],
      age: 30,
      languages: ['English', 'Fante'],
      workingHours: '10 AM - 11 PM',
      certifications: ['Therapeutic Touch Certification', 'Mindfulness Coach'],
      portfolioImages: [],
      description: 'Specializing in creating peaceful, healing environments for relaxation and renewal.',
      availability: 'Available now'
    }
  ];

  const professionalsWithImages = data?.professionals?.map((prof: any) => ({
    id: prof.id,
    name: prof.firstName && prof.lastName ? `${prof.firstName} ${prof.lastName}` : 'Professional',
    profileImage: prof.profilePicture || femaleProfile,
    profileImages: [prof.profilePicture || femaleProfile],
    rating: prof.averageRating || 0,
    reviewCount: prof.totalReviews || 0,
    hourlyRate: prof.hourlyRate || 0,
    location: prof.city && prof.state ? `${prof.city}, ${prof.state}` : 'Location not specified',
    bio: prof.bio || 'No bio available',
    services: prof.services || [],
    experience: prof.experience || 'No experience listed',
    isVerified: true,
    isOnline: prof.isAvailable || false,
    responseTime: '~15 min',
    completedSessions: Math.floor(Math.random() * 100) + 10,
    expertise: prof.services || [],
    age: 25,
    languages: ['English'],
    workingHours: '9 AM - 11 PM',
    certifications: [],
    portfolioImages: [],
    description: prof.bio || 'Professional cuddling services',
    availability: prof.isAvailable ? 'Available now' : 'Currently unavailable'
  })) || [];

  // If no real professionals found, return mock data for testing
  const finalProfessionals = professionalsWithImages.length > 0 ? professionalsWithImages : mockProfessionals;

  return {
    professionals: finalProfessionals,
    isLoading,
    error,
    pagination: data?.pagination,
    getProfessionalById: (id: string) => finalProfessionals.find(p => p.id === id),
    onlineProfessionals: finalProfessionals.filter(p => p.isOnline),
    verifiedProfessionals: finalProfessionals.filter(p => p.isVerified),
  };
}

export function useProfessional(id: string) {
  const { data, isLoading, error } = useUser(id);
  
  if (!data?.user) {
    return { professional: null, isLoading, error };
  }

  const prof = data.user;
  const professional = {
    id: prof.id,
    name: prof.firstName && prof.lastName ? `${prof.firstName} ${prof.lastName}` : 'Professional',
    profileImage: prof.profilePicture || femaleProfile,
    profileImages: [prof.profilePicture || femaleProfile],
    rating: prof.averageRating || 0,
    reviewCount: prof.totalReviews || 0,
    hourlyRate: prof.hourlyRate || 0,
    location: prof.city && prof.state ? `${prof.city}, ${prof.state}` : 'Location not specified',
    bio: prof.bio || 'No bio available',
    services: prof.services || [],
    experience: prof.experience || 'No experience listed',
    isVerified: true,
    isOnline: prof.isAvailable || false,
    responseTime: '~15 min',
    completedSessions: Math.floor(Math.random() * 100) + 10,
    expertise: prof.services || [],
    age: 25,
    languages: ['English'],
    workingHours: '9 AM - 11 PM',
    certifications: [],
    portfolioImages: [],
    description: prof.bio || 'Professional cuddling services',
    availability: prof.isAvailable ? 'Available now' : 'Currently unavailable'
  };

  return { professional, isLoading, error };
}