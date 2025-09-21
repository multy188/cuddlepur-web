import { useState } from "react";
import type { ProfileData, Review, RatingData } from "@/types/user";
import { mockProfileData } from "@/__mock__/profileData";
import { mockReviews, mockRatingData } from "@/__mock__/reviewsData";
import { mockLocationSuggestions } from "@/__mock__/locationData";
import { mockAvailableInterests } from "@/__mock__/interestsData";

interface UseProfileDataReturn {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  locationSuggestions: string[];
  availableInterests: string[];
}

export function useProfileData(): UseProfileDataReturn {
  const [profileData, setProfileData] = useState(mockProfileData);

  return {
    profileData,
    setProfileData,
    reviews: mockReviews,
    averageRating: mockRatingData.averageRating,
    totalReviews: mockRatingData.totalReviews,
    locationSuggestions: mockLocationSuggestions,
    availableInterests: mockAvailableInterests
  };
}