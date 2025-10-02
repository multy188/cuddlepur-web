import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield } from "lucide-react";
import ProfileCard from "./ProfileCard";
import { useDashboard } from "@/hooks";
import { safetyTips } from "@/const/safety";
import { useSocket } from "@/contexts/SocketContext";
import UserGridCard from "./UserGridCard";

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
  const { onlineUsers } = useSocket();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 p-4">
        <div className="max-w-6xl mx-auto">
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

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Profile Visitors */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Recently Online
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            {profileVisitors.map((visitor) => (
              <UserGridCard
                key={visitor.id}
                id={visitor.id}
                name={visitor.name}
                age={visitor.age}
                location={visitor.location}
                rating={visitor.rating}
                reviewCount={visitor.reviewCount}
                hourlyRate={visitor.hourlyRate || 0}
                profileImage={visitor.image}
                isOnline={onlineUsers.includes(visitor.id)}
                time={visitor.time}
                onClick={(id) => onSelectUser?.(id)}
                variant="small"
              />
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

        {/* How It Works */}
        <Card className="p-6">
          <h3 className="font-semibold text-xl mb-6 text-center">
            How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1: Search */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img
                  src="/assets/search.svg"
                  alt="Search"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-semibold mb-2">Search</h4>
              <p className="text-sm text-muted-foreground">
                Browse profiles and find a potential cuddler that matches your preferences
              </p>
            </div>

            {/* Step 2: Chat */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img
                  src="/assets/text.svg"
                  alt="Chat"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-semibold mb-2">Connect</h4>
              <p className="text-sm text-muted-foreground">
                Chat with potential cuddlers to see if there's mutual interest and compatibility
              </p>
            </div>

            {/* Step 3: Meet */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img
                  src="/assets/meet.svg"
                  alt="Meet"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-semibold mb-2">Meet Up</h4>
              <p className="text-sm text-muted-foreground">
                Schedule and meet your cuddler in a safe, comfortable location
              </p>
            </div>

            {/* Step 4: Cuddle */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-4">
                <img
                  src="/assets/cuddle.svg"
                  alt="Cuddle"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-semibold mb-2">Cuddle</h4>
              <p className="text-sm text-muted-foreground">
                Enjoy safe, platonic cuddling and companionship
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
