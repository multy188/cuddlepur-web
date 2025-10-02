import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, MapPin, Clock } from "lucide-react";

interface UserGridCardProps {
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
  isProfessional?: boolean;
  onClick: (id: string) => void;
}

export default function UserGridCard({
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
  isProfessional = false,
  onClick,
}: ProfessionalGridCardProps) {
  return (
    <Card
      className=" bg-card p-4 overflow-hidden hover-elevate cursor-pointer transition-all"
      onClick={() => onClick(id)}
      data-testid={`professional-card-${id}`}
    >
      {/* Profile Image - Takes 2/3 of container */}
      <div className="relative aspect-[255/190] overflow-hidden">
        <img
          src={
            profileImage ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name) +
              "&background=random&size=300"
          }
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Professional Badge - Top Right */}
        {isProfessional && (
          <div className="absolute top-2 right-2">
            <Badge
              variant="default"
              className="h-5 px-1.5 text-xs font-bold bg-primary/90 text-primary-foreground"
            >
              Pr
            </Badge>
          </div>
        )}

        {/* Online Status - Bottom Right */}
        {isOnline && (
          <div className="absolute bottom-3 right-2 h-3 w-3 bg-status-online border-2 border-white rounded-full" />
        )}

        {/* Rating/Reviews - Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="secondary"
            className="h-5 px-2 text-xs bg-black/70 text-white border-0"
          >
            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="ml-1">({reviewCount})</span>
          </Badge>
        </div>
      </div>

      {/* Professional Info - Takes remaining 1/3 */}
      <div className="py-3 space-y-1">
        {/* Name, Age and Price */}
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-xs md:text-sm leading-tight"
            data-testid={`text-name-${id}`}
          >
            {name}, {age}
          </h3>
          <div className="text-xs md:text-sm font-bold text-primary">
            ${hourlyRate}/hr
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-[10px] md:text-xs text-muted-foreground">
          <MapPin className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </Card>
  );
}
