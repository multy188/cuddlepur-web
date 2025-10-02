import { useState, useMemo } from 'react';
import {
  professionalDashboardData,
  upcomingBookings,
  newRequests,
  featuredProfessionals
} from '@mock/dashboardData';
import type {
  ProfessionalDashboardData,
  UpcomingBooking,
  NewRequest,
  Professional
} from '@types';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";
import { useUsers } from './useApi';
import { useUsersDetails } from './useUserDetails';

export function useDashboard() {
  const [availability, setAvailability] = useState({
    morning: true,
    afternoon: true,
    evening: false
  });

  // Fetch 10 most recently created users
  const { data: recentUsersData, isLoading: isLoadingRecentUsers } = useUsers({
    limit: 10,
    page: 1
  });

  console.log('📊 Recent users data:', {
    hasData: !!recentUsersData,
    users: recentUsersData?.users?.length || 0,
    isLoading: isLoadingRecentUsers
  });

  // Use the reusable hook to format user details
  const formattedUsers = useUsersDetails(recentUsersData?.users);

  console.log('👥 Formatted users:', formattedUsers.length);

  const recentlyOnlineWithImages = useMemo(() => {
    const result = formattedUsers.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      age: user.ageDisplay,
      location: user.location,
      image: user.profilePicture || femaleProfile,
      time: 'Recently joined',
      rating: 0,
      reviewCount: 0,
      hourlyRate: 0
    }));

    console.log('🖼️ Recently online with images:', result.length);
    return result;
  }, [formattedUsers]);

  const featuredProfessionalsWithImages = useMemo(() => {
    return featuredProfessionals.map(prof => ({
      ...prof,
      profileImage: prof.profileImage === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : prof.profileImage === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : prof.profileImage,
      bio: prof.id === "1" 
        ? "Certified massage therapist specializing in relaxation and stress relief."
        : "Professional counselor offering supportive companionship and conversation.",
      location: prof.id === "1" ? "Downtown, Ghana" : "East Legon, Ghana"
    }));
  }, []);

  const updateAvailability = (period: keyof typeof availability, value: boolean) => {
    setAvailability(prev => ({ ...prev, [period]: value }));
  };

  return {
    // Professional Dashboard Data
    dashboardData: professionalDashboardData,
    upcomingBookings,
    newRequests,
    availability,
    updateAvailability,

    // General Dashboard Data
    recentlyOnlineUsers: recentlyOnlineWithImages,
    featuredProfessionals: featuredProfessionalsWithImages,
    isLoadingRecentUsers,

    // Computed values
    totalEarnings: professionalDashboardData.earnings.thisMonth,
    growthRate: professionalDashboardData.earnings.growth,
    upcomingBookingsCount: upcomingBookings.length,
    newRequestsCount: newRequests.length,
    averageRating: professionalDashboardData.rating.average,
    totalReviews: professionalDashboardData.rating.totalReviews,
  };
}