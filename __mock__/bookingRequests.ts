import type { BookingRequest } from '@types';

export const mockBookingRequests: BookingRequest[] = [
  {
    id: "1",
    client: {
      id: "user1",
      name: "Sarah Mitchell",
      avatar: "/placeholder-avatar.jpg",
      age: 28,
      rating: 4.8,
      isVerified: true
    },
    date: "2024-09-25",
    time: "14:00 - 16:00",
    duration: 2,
    location: "Coffee Shop, East Legon, Accra",
    hourlyRate: 50,
    totalAmount: 100,
    message: "Hi! I'm new to Accra and would love someone to show me around the city. I'm particularly interested in local art galleries and good coffee places. Looking for a friendly companion for the afternoon!",
    specialRequests: ["Non-smoking", "Outdoor activities"],
    status: 'pending',
    requestedAt: "2024-09-20 10:30",
    expiresAt: "2024-09-22 10:30"
  },
  {
    id: "2", 
    client: {
      id: "user2",
      name: "Michael Asante",
      avatar: "/placeholder-avatar.jpg",
      age: 35,
      rating: 4.9,
      isVerified: true
    },
    date: "2024-09-26",
    time: "18:00 - 20:00",
    duration: 2,
    location: "Restaurant, Osu, Accra", 
    hourlyRate: 50,
    totalAmount: 100,
    message: "Looking for someone to accompany me to a business dinner. Need someone who can engage in professional conversation and has good social etiquette.",
    specialRequests: ["Professional attire", "Good conversationalist"],
    status: 'pending',
    requestedAt: "2024-09-20 14:15",
    expiresAt: "2024-09-22 14:15"
  },
  {
    id: "3",
    client: {
      id: "user3", 
      name: "Jennifer Owusu",
      avatar: "/placeholder-avatar.jpg",
      age: 31,
      rating: 4.7,
      isVerified: true
    },
    date: "2024-09-24",
    time: "10:00 - 13:00",
    duration: 3,
    location: "Park Walk, Kumasi",
    hourlyRate: 45,
    totalAmount: 135,
    message: "Would love a walking companion for Saturday morning. I enjoy nature walks and good conversation. Let's explore the botanical gardens!",
    specialRequests: ["Morning person", "Nature lover"],
    status: 'accepted',
    requestedAt: "2024-09-19 20:00",
    expiresAt: "2024-09-21 20:00"
  },
  {
    id: "4",
    client: {
      id: "user4",
      name: "David Mensah", 
      avatar: "/placeholder-avatar.jpg",
      age: 42,
      rating: 4.7,
      isVerified: true
    },
    date: "2024-09-24",
    time: "18:00 - 21:00",
    duration: 3,
    location: "Cultural Center, Kumasi", 
    hourlyRate: 55,
    totalAmount: 165,
    message: "Attending a cultural event and would like a companion who appreciates Ghanaian arts and culture. The event includes traditional music and dance performances.",
    specialRequests: ["Cultural interest", "Traditional events"],
    status: 'accepted',
    requestedAt: "2024-09-19 14:20",
    expiresAt: "2024-09-21 14:20"
  }
];