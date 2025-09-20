export interface BookingRequest {
  id: string;
  client: {
    id: string;
    name: string;
    avatar: string;
    age: number;
    rating: number;
    isVerified: boolean;
  };
  date: string;
  time: string;
  duration: number;
  location: string;
  hourlyRate: number;
  totalAmount: number;
  message: string;
  specialRequests: string[];
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  requestedAt: string;
  expiresAt: string;
}