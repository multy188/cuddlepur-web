import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UserCardSkeletonProps {
  variant?: "small" | "medium";
}

export default function UserCardSkeleton({ variant = "medium" }: UserCardSkeletonProps) {
  const isSmall = variant === "small";

  return (
    <Card className={`overflow-hidden hover-elevate transition-all ${isSmall ? "w-32 md:w-40" : ""}`}>
      {/* Image Skeleton */}
      <div className={`relative ${isSmall ? "" : "m-4 mb-0"}`}>
        <Skeleton className={`w-full ${isSmall ? "aspect-square" : "aspect-[255/190] rounded-lg"}`} />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Name and Age */}
        <Skeleton className={`h-4 w-3/4 ${isSmall ? "" : "mb-2"}`} />

        {/* Location */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className={`h-3 ${isSmall ? "w-16" : "w-20"}`} />
        </div>

        {/* Last seen / Online status */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className={`h-3 ${isSmall ? "w-12" : "w-16"}`} />
        </div>

        {!isSmall && (
          <>
            {/* Reviews */}
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Price */}
            <Skeleton className="h-5 w-16 mt-2" />
          </>
        )}
      </div>
    </Card>
  );
}
