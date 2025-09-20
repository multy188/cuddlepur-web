import { useMemo } from 'react';
import { mockProfessionals } from '@mock/professionals';
import type { Professional } from '@types';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export function useProfessionals() {
  const professionalsWithImages = useMemo(() => {
    return mockProfessionals.map((prof: Professional) => ({
      ...prof,
      profileImage: prof.profileImage === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : prof.profileImage === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : prof.profileImage,
      profileImages: prof.profileImages.map((img: string) => 
        img === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
          ? femaleProfile 
          : img === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
          ? maleProfile
          : img
      )
    }));
  }, []);

  return {
    professionals: professionalsWithImages,
    getProfessionalById: (id: string) => professionalsWithImages.find(p => p.id === id),
    onlineProfessionals: professionalsWithImages.filter(p => p.isOnline),
    verifiedProfessionals: professionalsWithImages.filter(p => p.isVerified),
  };
}