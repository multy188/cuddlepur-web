import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface UserGridCardProps {
  id: string;
  name: string;
  username?: string;
  age: number;
  gender?: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  profileImage: string;
  isOnline: boolean;
  lastSeen?: string;
  isProfessional?: boolean;
  onClick: (id: string) => void;
  variant?: "small" | "medium";
  time?: string;
}

export default function UserGridCard({
  id,
  name,
  username,
  age,
  gender,
  location,
  rating,
  reviewCount,
  hourlyRate,
  profileImage,
  isOnline,
  lastSeen,
  isProfessional = false,
  onClick,
  variant = "medium",
  time,
}: UserGridCardProps) {
  const isSmall = variant === "small";

  return (
    <Card
      className={`overflow-hidden hover-elevate cursor-pointer transition-all flex-shrink-0 ${
        isSmall ? "w-32 md:w-40" : ""
      }`}
      onClick={() => onClick(id)}
      data-testid={`professional-card-${id}`}
    >
      {/* Profile Image - Takes 2/3 of container */}
      <div
        className={`relative overflow-hidden ${
          isSmall ? "aspect-[4/5]" : "aspect-[255/190] rounded-lg m-4 mb-0"
        }`}
      >
        <img
          src={
            profileImage ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(username || "") +
              "&background=random&size=300"
          }
          alt={username}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Gender Badge - Top Left - Only show for small variant (dashboard) */}
        {gender && isSmall && (
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="h-5 px-2 text-xs font-medium bg-black/50 text-white border-0 backdrop-blur-sm"
            >
              {gender}
            </Badge>
          </div>
        )}

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
        {reviewCount > 0 && (
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
        )}
      </div>

      {/* Professional Info - Takes remaining 1/3 */}
      <div className="p-3 space-y-1">
        {/* Name, Age and Price/Time */}
        <div className="flex items-center justify-between">
          <h3
            className={`font-semibold leading-tight ${
              isSmall ? "text-xs" : "text-xs md:text-sm"
            }`}
            data-testid={`text-name-${id}`}
          >
            {username}, {age}
          </h3>
          {!isSmall && (
            <div className="text-xs md:text-sm font-bold text-primary">
              ${hourlyRate}/hr
            </div>
          )}
        </div>

        {/* Location */}
        <div
          className={`flex items-center text-muted-foreground ${
            isSmall ? "text-[10px]" : "text-[10px] md:text-xs"
          }`}
        >
          <MapPin
            className={`mr-1 flex-shrink-0 ${
              isSmall ? "h-2.5 w-2.5" : "h-2.5 w-2.5 md:h-3 md:w-3"
            }`}
          />
          <span className="truncate">{location}</span>
        </div>

        {/* Gender - Only show for medium variant (search page) below location */}
        {gender && !isSmall && (
          <div
            className={`text-muted-foreground ${
              isSmall ? "text-[10px]" : "text-[10px] md:text-xs"
            }`}
          >
            {gender}
          </div>
        )}
      </div>
    </Card>
  );
}
