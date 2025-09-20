import { useLocation, useRoute } from "wouter";
import ProfessionalView from "@/components/ProfessionalView";
import { useProfessionals } from "@/hooks";

export default function ProfessionalViewWrapper() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/professional/:id");
  const { professionals } = useProfessionals();
  
  if (!match || !params?.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Professional not found</p>
      </div>
    );
  }
  
  const professional = professionals.find(p => p.id === params.id);
  
  if (!professional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Professional not found</p>
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