import { useState, useMemo } from 'react';
import { 
  professionalDashboardData, 
  upcomingBookings, 
  newRequests, 
  recentlyOnlineUsers, 
  featuredProfessionals 
} from '@mock/dashboardData';
import type { 
  ProfessionalDashboardData, 
  UpcomingBooking, 
  NewRequest, 
  User, 
  Professional 
} from '@types';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export function useDashboard() {
  const [availability, setAvailability] = useState({
    morning: true,
    afternoon: true,
    evening: false
  });

  const recentlyOnlineWithImages = useMemo(() => {
    return recentlyOnlineUsers.map(user => ({
      ...user,
      image: user.image === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : user.image === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : user.image
    }));
  }, []);

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
    
    // Computed values
    totalEarnings: professionalDashboardData.earnings.thisMonth,
    growthRate: professionalDashboardData.earnings.growth,
    upcomingBookingsCount: upcomingBookings.length,
    newRequestsCount: newRequests.length,
    averageRating: professionalDashboardData.rating.average,
    totalReviews: professionalDashboardData.rating.totalReviews,
  };
}