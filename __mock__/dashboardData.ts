import type { ProfessionalDashboardData, UpcomingBooking, NewRequest, User, Professional } from '@types';

export const professionalDashboardData: ProfessionalDashboardData = {
  earnings: {
    thisMonth: 2450,
    lastMonth: 2100,
    growth: 16.7
  },
  bookings: {
    upcoming: 8,
    completed: 156,
    newRequests: 3
  },
  rating: {
    average: 4.9,
    totalReviews: 89
  },
  analytics: {
    profileViews: 234,
    responseRate: 98,
    averageSessionLength: "2h 15m"
  }
};

export const upcomingBookings: UpcomingBooking[] = [
  {
    id: "1",
    client: "Sarah M.",
    avatar: "/placeholder-avatar.jpg",
    date: "Today",
    time: "2:00 PM - 4:00 PM",
    location: "Coffee Shop, Accra",
    rate: 50
  },
  {
    id: "2", 
    client: "Michael K.",
    avatar: "/placeholder-avatar.jpg",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    location: "Park Walk, Kumasi",
    rate: 45
  },
  {
    id: "3",
    client: "Jennifer A.",
    avatar: "/placeholder-avatar.jpg", 
    date: "Sept 22",
    time: "6:00 PM - 8:00 PM",
    location: "Restaurant, Tema",
    rate: 60
  }
];

export const newRequests: NewRequest[] = [
  {
    id: "req1",
    client: "Emma D.",
    time: "10 mins ago",
    service: "Shopping companion"
  },
  {
    id: "req2",
    client: "John K.", 
    time: "1 hour ago",
    service: "Museum visit"
  },
  {
    id: "req3",
    client: "Grace M.",
    time: "3 hours ago",
    service: "Coffee chat"
  }
];

export const recentlyOnlineUsers: User[] = [
  { id: "1", name: "Sarah", age: 28, location: "Downtown", image: "@assets/generated_images/Professional_profile_photo_f962fff8.png", time: "2 hours ago" },
  { id: "2", name: "Michael", age: 32, location: "East Legon", image: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png", time: "5 hours ago" },
  { id: "3", name: "Emma", age: 26, location: "Spintex", image: "@assets/generated_images/Professional_profile_photo_f962fff8.png", time: "1 day ago" }
];

export const featuredProfessionals: Professional[] = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    location: "Accra, Ghana",
    distance: "2.5 km away",
    rating: 4.8,
    reviewCount: 47,
    hourlyRate: 45,
    profileImage: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    isOnline: true,
    isVerified: true,
    isProfessional: true,
    specialties: ["Relaxation", "Stress Relief", "Conversation"]
  },
  {
    id: "2",
    name: "Michael", 
    age: 32,
    location: "Tema, Ghana",
    distance: "4.1 km away", 
    rating: 4.9,
    reviewCount: 63,
    hourlyRate: 50,
    profileImage: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png",
    isOnline: true,
    lastSeen: "Active 1 hour ago",
    isVerified: true,
    isProfessional: true,
    specialties: ["Conversation", "Support", "Counseling"]
  }
];