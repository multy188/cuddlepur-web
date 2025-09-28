import { useLocation, useRoute } from "wouter";
import ProfessionalView from "@/components/ProfessionalView";
import { useProfessional } from "@/hooks/use-professionals";

export default function ProfessionalViewWrapper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/professional/:id");
  const { professional, isLoading } = useProfessional(params?.id || '');
  
  if (!match || !params?.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!professional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }
  
  const handleBack = () => {
    setLocation("/search");
  };
  
  const handleBookSession = (id: string) => {
    setLocation(`/booking/request/${id}`);
  };
  
  return (
    <ProfessionalView
      professional={professional}
      onBack={handleBack}
      onBookSession={handleBookSession}
    />
  );
}