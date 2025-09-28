import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Clock } from "lucide-react";
import ProfileCard from "./ProfileCard";
import { useDashboard } from "@/hooks";
import { safetyTips } from "@/const/safety";

interface DashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
  onSelectUser?: (userId: string) => void;
}

export default function Dashboard({
  userName,
  onNavigate,
  onSelectUser,
}: DashboardProps) {
  const {
    recentlyOnlineUsers: profileVisitors,
    featuredProfessionals: onlineProfessionals,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-4">
        <div className="container mx-auto">
          <h1
            className="text-2xl font-bold mb-2"
            data-testid="text-welcome"
          >
            Welcome back, {userName}!
          </h1>
          <p className="text-muted-foreground">
            Find verified professionals for safe, platonic companionship
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Profile Visitors */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Recently Online
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            {profileVisitors.map((visitor) => (
              <Card
                key={visitor.id}
                className="overflow-hidden hover-elevate cursor-pointer transition-all flex-shrink-0 w-32"
                onClick={() => onSelectUser?.(visitor.id)}
                data-testid={`visitor-card-${visitor.id}`}
              >
                {/* Profile Image - Takes 2/3 of container */}
                <div className="relative aspect-[4/5]">
                  <img
                    src={visitor.image}
                    alt={visitor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Visitor Info - Takes remaining 1/3 */}
                <div className="p-3 space-y-1">
                  {/* Name */}
                  <h4
                    className="font-semibold text-sm leading-tight"
                    data-testid={`text-visitor-${visitor.id}`}
                  >
                    {visitor.name}
                  </h4>

                  {/* Age and Location */}
                  <p className="text-xs text-muted-foreground">
                    {visitor.age}, {visitor.location}
                  </p>

                  {/* Time */}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>{visitor.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Safety Tips */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-3 flex items-center text-blue-900 dark:text-blue-100">
            <Shield className="h-5 w-5 mr-2" />
            Safety Tips
          </h3>

          <div className="space-y-2">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {tip}
                </p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={() => onNavigate("safety-center")}
            data-testid="button-safety-center"
          >
            Visit Safety Center
          </Button>
        </Card>

        {/* Online Professionals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Shield className="h-5 w-5 mr-2 text-chart-1" />
              Professionals Online Now
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("search")}
                data-testid="button-view-all-professionals"
              >
                View All
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {onlineProfessionals.map((professional) => (
              <ProfileCard
                key={professional.id}
                {...professional}
                onViewProfile={(id) => console.log("View profile:", id)}
                onBookSession={(id) => console.log("Book session:", id)}
                onLike={(id) => console.log("Like profile:", id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
