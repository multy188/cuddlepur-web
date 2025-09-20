export interface DashboardEarnings {
  thisMonth: number;
  lastMonth: number;
  growth: number;
}

export interface DashboardBookings {
  upcoming: number;
  completed: number;
  newRequests: number;
}

export interface DashboardRating {
  average: number;
  totalReviews: number;
}

export interface DashboardAnalytics {
  profileViews: number;
  responseRate: number;
  averageSessionLength: string;
}

export interface ProfessionalDashboardData {
  earnings: DashboardEarnings;
  bookings: DashboardBookings;
  rating: DashboardRating;
  analytics: DashboardAnalytics;
}

export interface UpcomingBooking {
  id: string;
  client: string;
  avatar: string;
  date: string;
  time: string;
  location: string;
  rate: number;
}

export interface NewRequest {
  id: string;
  client: string;
  time: string;
  service: string;
}