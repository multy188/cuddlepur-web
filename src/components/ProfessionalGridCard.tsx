import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, MapPin, Clock } from "lucide-react";

interface ProfessionalGridCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  profileImage: string;
  isOnline: boolean;
  lastSeen?: string;
  isVerified: boolean;
  isProfessional?: boolean;
  onClick: (id: string) => void;
}

export default function ProfessionalGridCard({
  id,
  name,
  age,
  location,
  rating,
  reviewCount,
  hourlyRate,
  profileImage,
  isOnline,
  lastSeen,
  isVerified,
  isProfessional = false,
  onClick
}: ProfessionalGridCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      onClick={() => onClick(id)}
      data-testid={`professional-card-${id}`}
    >
      {/* Profile Image - Takes 2/3 of container */}
      <div className="relative aspect-[4/5]">
        <img 
          src={profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=random&size=300'} 
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Verification Badge - Top Left */}
        {isVerified && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-white/90">
              <Shield className="h-3 w-3 text-chart-1" />
            </Badge>
          </div>
        )}
        
        {/* Online Status - Top Right */}
        {isOnline && (
          <div className="absolute top-2 right-2 h-3 w-3 bg-status-online border-2 border-white rounded-full" />
        )}
        
        {/* Professional Badge - Bottom Right */}
        {isProfessional && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="default" className="h-5 px-1.5 text-xs font-bold bg-primary/90 text-primary-foreground">
              Pr
            </Badge>
          </div>
        )}
        
        {/* Rating/Reviews - Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="h-5 px-2 text-xs bg-black/70 text-white border-0">
            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="ml-1">({reviewCount})</span>
          </Badge>
        </div>
      </div>

      {/* Professional Info - Takes remaining 1/3 */}
      <div className="p-3 space-y-1">
        {/* Name, Age and Price */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm leading-tight" data-testid={`text-name-${id}`}>
            {name}, {age}
          </h3>
          <div className="text-sm font-bold text-primary">
            ${hourlyRate}/hr
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        
        {/* Last Seen */}
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>{isOnline ? "Online now" : lastSeen}</span>
        </div>
      </div>
    </Card>
  );
}