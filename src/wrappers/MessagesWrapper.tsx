import { useLocation } from "wouter";
import Messages from "@/components/Messages";

export default function MessagesWrapper() {
  const [, setLocation] = useLocation();

  // Get userId from URL query params if present
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userId') || undefined;

  console.log('📬 MessagesWrapper:', {
    fullUrl: window.location.href,
    search: window.location.search,
    userId,
  });

  const handleBook = (professionalId: string) => {
    setLocation(`/booking/request/${professionalId}`);
  };

  return (
    <div className="h-screen">
      <Messages onBook={handleBook} initialUserId={userId} />
    </div>
  );
}