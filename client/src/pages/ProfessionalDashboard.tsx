import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  DollarSign, 
  Calendar, 
  Clock, 
  Star, 
  Users,
  Eye,
  TrendingUp,
  Bell,
  Settings,
  CheckCircle,
  XCircle,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfessionalDashboardProps {
  onBack: () => void;
  onNavigateToBookingRequests: () => void;
  onNavigateToEarnings: () => void;
}

export default function ProfessionalDashboard({ 
  onBack, 
  onNavigateToBookingRequests, 
  onNavigateToEarnings 
}: ProfessionalDashboardProps) {
  const [availability, setAvailability] = useState({
    morning: true,
    afternoon: true,
    evening: false
  });

  // Mock data - in real app this would come from API
  const dashboardData = {
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

  const upcomingBookings = [
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

  const newRequests = [
    {
      id: "1",
      client: "David L.",
      avatar: "/placeholder-avatar.jpg",
      date: "Sept 25",
      time: "3:00 PM - 5:00 PM",
      message: "Looking for someone to explore the city with...",
      rate: 55
    },
    {
      id: "2",
      client: "Emma R.",
      avatar: "/placeholder-avatar.jpg",
      date: "Sept 26", 
      time: "7:00 PM - 9:00 PM",
      message: "Need a companion for a dinner event...",
      rate: 70
    }
  ];

  const updateAvailability = (period: keyof typeof availability, value: boolean) => {
    setAvailability(prev => ({ ...prev, [period]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="font-semibold">Professional Dashboard</h1>
            
            <Button variant="ghost" size="icon" data-testid="button-settings">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-4xl">
        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover-elevate" onClick={onNavigateToEarnings}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold" data-testid="earnings-this-month">
                    ${dashboardData.earnings.thisMonth}
                  </p>
                  <p className="text-sm text-green-600">
                    +{dashboardData.earnings.growth}% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold" data-testid="professional-rating">
                      {dashboardData.rating.average}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dashboardData.rating.totalReviews} reviews
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold" data-testid="profile-views">
                    {dashboardData.analytics.profileViews}
                  </p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600" data-testid="upcoming-bookings">
              {dashboardData.bookings.upcoming}
            </p>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600" data-testid="completed-sessions">
              {dashboardData.bookings.completed}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600" data-testid="response-rate">
              {dashboardData.analytics.responseRate}%
            </p>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600" data-testid="avg-session-length">
              {dashboardData.analytics.averageSessionLength}
            </p>
            <p className="text-sm text-muted-foreground">Avg Session</p>
          </div>
        </div>

        {/* New Booking Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                New Booking Requests
                {dashboardData.bookings.newRequests > 0 && (
                  <Badge variant="destructive" data-testid="new-requests-count">
                    {dashboardData.bookings.newRequests}
                  </Badge>
                )}
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigateToBookingRequests}
                data-testid="button-view-all-requests"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {newRequests.length > 0 ? (
              <div className="space-y-4">
                {newRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={request.avatar} alt={request.client} />
                        <AvatarFallback>{request.client[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium" data-testid={`client-name-${request.id}`}>
                            {request.client}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ${request.rate}/hour
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.date} • {request.time}
                        </p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {request.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        data-testid={`button-decline-${request.id}`}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm"
                        data-testid={`button-accept-${request.id}`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No new booking requests
              </p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={booking.avatar} alt={booking.client} />
                      <AvatarFallback>{booking.client[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium" data-testid={`booking-client-${booking.id}`}>
                          {booking.client}
                        </span>
                        <Badge variant="outline">${booking.rate}/hour</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} • {booking.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.location}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem data-testid={`menu-view-booking-${booking.id}`}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem data-testid={`menu-message-client-${booking.id}`}>
                        Message Client
                      </DropdownMenuItem>
                      <DropdownMenuItem data-testid={`menu-reschedule-${booking.id}`}>
                        Request Reschedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Availability Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="morning">Morning (6:00 AM - 12:00 PM)</Label>
                <Switch
                  id="morning"
                  checked={availability.morning}
                  onCheckedChange={(value) => updateAvailability('morning', value)}
                  data-testid="switch-morning"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="afternoon">Afternoon (12:00 PM - 6:00 PM)</Label>
                <Switch
                  id="afternoon"
                  checked={availability.afternoon}
                  onCheckedChange={(value) => updateAvailability('afternoon', value)}
                  data-testid="switch-afternoon"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="evening">Evening (6:00 PM - 12:00 AM)</Label>
                <Switch
                  id="evening"
                  checked={availability.evening}
                  onCheckedChange={(value) => updateAvailability('evening', value)}
                  data-testid="switch-evening"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-16"
            onClick={onNavigateToEarnings}
            data-testid="button-view-earnings"
          >
            <div className="text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-1" />
              <span>View Earnings</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-16"
            onClick={onNavigateToBookingRequests}
            data-testid="button-manage-requests"
          >
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-1" />
              <span>Manage Requests</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}