import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, Calendar, MessageCircle, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  unreadMessages?: number;
  upcomingBookings?: number;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
  unreadMessages = 0,
  upcomingBookings = 0
}: BottomNavigationProps) {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: Home
    },
    {
      id: "search",
      label: "Search",
      icon: Search
    },
    {
      id: "bookings",
      label: "Bookings", 
      icon: Calendar,
      badge: upcomingBookings
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      badge: unreadMessages
    },
    {
      id: "profile",
      label: "Profile",
      icon: User
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => onTabChange(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                {item.badge && item.badge > 0 && (
                  <div
                    className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"
                    data-testid={`badge-${item.id}`}
                  />
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}