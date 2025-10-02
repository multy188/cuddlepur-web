import { useUsers, useProfessionals as useApiProfessionals, useUser } from './useApi';

interface UseUsersOptions {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  userType?: string;
  page?: number;
  limit?: number;
}

interface UseProfessionalsOptions {
  location?: string;
  serviceType?: string;
  minRate?: number;
  maxRate?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
}

export function useAllUsers(options: UseUsersOptions = {}) {
  const { data, isLoading, error } = useUsers(options);
  
  const users = data?.users?.map((user: any) => ({
    id: user.id,
    name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User',
    username: user.username,
    gender: user.gender,
    profileImage: user.profilePicture || null,
    profileImages: user.profilePicture ? [user.profilePicture] : [],
    rating: user.averageRating || 0,
    reviewCount: user.totalReviews || 0,
    hourlyRate: user.hourlyRate || 0,
    location: user.city && user.state ? `${user.city}, ${user.state}` : 'Location not specified',
    bio: user.bio || 'No bio available',
    services: user.services || [],
    experience: user.experience || 'No experience listed',
    isVerified: true,
    isOnline: user.isAvailable || false,
    responseTime: '~15 min',
    completedSessions: Math.floor(Math.random() * 100) + 10,
    expertise: user.services || [],
    specialties: user.services || [], // Map services to specialties
    age: 25,
    languages: ['English'],
    workingHours: '9 AM - 11 PM',
    certifications: [],
    portfolioImages: [],
    reviews: [], // Empty reviews array by default
    description: user.bio || 'Professional cuddling services',
    availability: user.isAvailable ? 'Available now' : 'Currently unavailable',
    lastSeen: !user.isAvailable ? '2 hours ago' : undefined,
    userType: user.userType
  })) || [];

  return {
    users,
    isLoading,
    error,
    pagination: data?.pagination,
    getUserById: (id: string) => users.find((u: any) => u.id === id),
    onlineUsers: users.filter((u: any) => u.isOnline),
    verifiedUsers: users.filter((u: any) => u.isVerified),
    professionals: users.filter((u: any) => u.userType === 'PROFESSIONAL'),
    cuddlers: users.filter((u: any) => u.userType === 'CUDDLER'),
  };
}

export function useProfessionals(options: UseProfessionalsOptions = {}) {
  const { data, isLoading, error } = useApiProfessionals(options);
  
  const professionals = data?.users?.map((prof: any) => ({
    id: prof.id,
    name: prof.firstName && prof.lastName ? `${prof.firstName} ${prof.lastName}` : 'Professional',
    username: prof.username,
    profileImage: prof.profilePicture || null,
    profileImages: prof.profilePicture ? [prof.profilePicture] : [],
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
    specialties: prof.services || [], // Map services to specialties
    age: 25,
    languages: ['English'],
    workingHours: '9 AM - 11 PM',
    certifications: [],
    portfolioImages: [],
    reviews: [], // Empty reviews array by default
    description: prof.bio || 'Professional cuddling services',
    availability: prof.isAvailable ? 'Available now' : 'Currently unavailable',
    lastSeen: !prof.isAvailable ? '2 hours ago' : undefined
  })) || [];

  return {
    professionals,
    isLoading,
    error,
    pagination: data?.pagination,
    getProfessionalById: (id: string) => professionals.find((p: any) => p.id === id),
    onlineProfessionals: professionals.filter((p: any) => p.isOnline),
    verifiedProfessionals: professionals.filter((p: any) => p.isVerified),
  };
}

export function useProfessional(id: string) {
  const { data, isLoading, error } = useUser(id);
  
  if (!data?.user) {
    return { professional: null, isLoading, error };
  }

  const prof = data.user;
  
  // Debug logging
  console.log('🔍 useProfessional data:', {
    id: prof.id,
    profilePicture: prof.profilePicture,
    hasProfilePicture: !!prof.profilePicture
  });
  
  const professional = {
    id: prof.id,
    name: prof.firstName && prof.lastName ? `${prof.firstName} ${prof.lastName}` : 'Professional',
    username: prof.username,
    profileImage: prof.profilePicture || null,
    profileImages: prof.photos?.length > 0 ? prof.photos.map((p: any) => p.url) : (prof.profilePicture ? [prof.profilePicture] : []),
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
    specialties: prof.services || [], // Map services to specialties
    age: 25,
    languages: ['English'],
    workingHours: '9 AM - 11 PM',
    certifications: [],
    portfolioImages: [],
    reviews: [], // Empty reviews array by default
    description: prof.bio || 'Professional cuddling services',
    availability: prof.isAvailable ? 'Available now' : 'Currently unavailable'
  };

  return { professional, isLoading, error };
}