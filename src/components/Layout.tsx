import { ReactNode } from "react";
import { useLocation } from "wouter";
import BottomNavigation from "./BottomNavigation";
import { useConversations } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { data: conversationsData } = useConversations(user?.id || '');

  // Calculate total unread messages from all conversations
  const unreadMessages = Array.isArray(conversationsData)
    ? conversationsData.reduce((total, conv: any) => total + (conv.unreadCount || 0), 0)
    : 0;

  // Pages that should not show bottom navigation
  const hideBottomNavPages = [
    "/",
    "/auth",
    "/how-it-works",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const shouldShowBottomNav = !hideBottomNavPages.includes(location);

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
      {children}

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
