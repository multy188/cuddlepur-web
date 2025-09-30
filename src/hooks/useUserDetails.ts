import { useMemo } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  country?: string;
  profilePicture?: string;
  bio?: string;
  [key: string]: any;
}

interface UserDetails {
  id: string;
  name: string;
  fullName: string;
  firstName: string;
  lastName: string;
  age: number | null;
  ageDisplay: string;
  city: string | null;
  state: string | null;
  country: string | null;
  location: string;
  locationFull: string;
  profilePicture: string | null;
  bio: string | null;
}

/**
 * Hook to format user details consistently across the app
 * @param user - User object from API
 * @returns Formatted user details
 */
export const useUserDetails = (user: User | null | undefined): UserDetails | null => {
  return useMemo(() => {
    if (!user) return null;

    // Format name
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const name = fullName || 'User';

    // Calculate age from dateOfBirth
    let age: number | null = null;
    let ageDisplay = 'N/A';

    if (user.dateOfBirth) {
      const birthDate = new Date(user.dateOfBirth);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Adjust age if birthday hasn't occurred this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age = calculatedAge - 1;
      } else {
        age = calculatedAge;
      }

      ageDisplay = age.toString();
    }

    // Format location
    const city = user.city || null;
    const state = user.state || null;
    const country = user.country || null;

    // Build location strings
    let location = 'Unknown';
    let locationFull = 'Unknown';

    if (city && state) {
      location = `${city}, ${state}`;
      locationFull = country ? `${city}, ${state}, ${country}` : location;
    } else if (city) {
      location = city;
      locationFull = country ? `${city}, ${country}` : city;
    } else if (state) {
      location = state;
      locationFull = country ? `${state}, ${country}` : state;
    } else if (country) {
      location = country;
      locationFull = country;
    }

    return {
      id: user.id,
      name,
      fullName,
      firstName,
      lastName,
      age,
      ageDisplay,
      city,
      state,
      country,
      location,
      locationFull,
      profilePicture: user.profilePicture || null,
      bio: user.bio || null
    };
  }, [user]);
};

/**
 * Hook to format multiple users at once
 * @param users - Array of user objects
 * @returns Array of formatted user details
 */
export const useUsersDetails = (users: User[] | null | undefined): UserDetails[] => {
  return useMemo(() => {
    if (!users) return [];

    return users.map(user => {
      // Format name
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const name = fullName || 'User';

      // Calculate age from dateOfBirth
      let age: number | null = null;
      let ageDisplay = 'N/A';

      if (user.dateOfBirth) {
        const birthDate = new Date(user.dateOfBirth);
        const today = new Date();
        const calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age = calculatedAge - 1;
        } else {
          age = calculatedAge;
        }

        ageDisplay = age.toString();
      }

      // Format location
      const city = user.city || null;
      const state = user.state || null;
      const country = user.country || null;

      // Build location strings
      let location = 'Unknown';
      let locationFull = 'Unknown';

      if (city && state) {
        location = `${city}, ${state}`;
        locationFull = country ? `${city}, ${state}, ${country}` : location;
      } else if (city) {
        location = city;
        locationFull = country ? `${city}, ${country}` : city;
      } else if (state) {
        location = state;
        locationFull = country ? `${state}, ${country}` : state;
      } else if (country) {
        location = country;
        locationFull = country;
      }

      return {
        id: user.id,
        name,
        fullName,
        firstName,
        lastName,
        age,
        ageDisplay,
        city,
        state,
        country,
        location,
        locationFull,
        profilePicture: user.profilePicture || null,
        bio: user.bio || null
      };
    });
  }, [users]);
};
