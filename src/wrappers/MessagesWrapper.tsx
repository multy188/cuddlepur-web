import { useLocation } from "wouter";
import Messages from "@/components/Messages";

export default function MessagesWrapper() {
  const [, setLocation] = useLocation();
  
  const handleBook = (professionalId: string) => {
    setLocation(`/booking/request/${professionalId}`);
  };
  
  return (
    <Messages onBook={handleBook} />
  );
}