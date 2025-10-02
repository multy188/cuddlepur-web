import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import BottomNavigation from "./BottomNavigation";
import { useConversations } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { data: conversationsData } = useConversations(user?.id || '');

  // Calculate total unread messages from all conversations
  const unreadMessages = Array.isArray(conversationsData)
    ? conversationsData.reduce((total, conv: any) => total + (conv.unreadCount || 0), 0)
    : 0;

  // Pages that should not show bottom navigation and app bar
  const hideBottomNavPages = [
    "/",
    "/auth",
    "/how-it-works",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const shouldShowBottomNav = !hideBottomNavPages.includes(location);
  const shouldShowAppBar = !hideBottomNavPages.includes(location);

  // Get page title based on current route
  const getPageTitle = () => {
    if (location === "/dashboard") return "Dashboard";
    if (location === "/search") return "Find Cuddlers";
    if (location.startsWith("/booking")) return "Bookings";
    if (location.startsWith("/messages")) return "Messages";
    if (location === "/profile") return "Profile";
    if (location.startsWith("/user/")) return "Profile";
    return "Cuddlepur";
  };

  const handleLogout = () => {
    logout();
    setLocation("/auth");
  };

  const getActiveTab = () => {
    if (location === "/dashboard") return "home";
    if (location === "/search") return "search";
    if (location.startsWith("/booking")) return "bookings";
    if (location.startsWith("/messages")) return "messages";
    if (location === "/profile") return "profile";
    return "home";
  };

  const handleTabChange = (tabId: string) => {
    const routes: Record<string, string> = {
      home: "/dashboard",
      search: "/search",
      bookings: "/bookings",
      messages: "/messages",
      profile: "/profile",
    };
    const targetRoute = routes[tabId] || "/dashboard";
    console.log(targetRoute, " tabId: ", tabId);

    console.log("🚀 Navigation:", {
      tabId,
      targetRoute,
      currentLocation: location,
    });
    setLocation(targetRoute);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* App Bar */}
      {shouldShowAppBar && (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
            <h1 className="text-xl md:text-2xl font-bold">{getPageTitle()}</h1>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setLocation("/profile")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/settings")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {children}
      </div>

      {/* Bottom Navigation */}
      {shouldShowBottomNav && (
        <BottomNavigation
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          unreadMessages={unreadMessages}
          upcomingBookings={1}
        />
      )}
    </div>
  );
}
