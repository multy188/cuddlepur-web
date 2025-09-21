import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { UserInfo } from "@/types/auth";
import LocationSuggestions from "./LocationSuggestions";

interface BasicInfoStepProps {
  userInfo: UserInfo;
  filteredSuggestions: string[];
  showSuggestions: boolean;
  isLoading: boolean;
  error: string;
  onUserInfoChange: (field: keyof UserInfo, value: string) => void;
  onLocationChange: (value: string) => void;
  onLocationFocus: () => void;
  onLocationBlur: () => void;
  onSuggestionClick: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BasicInfoStep = ({
  userInfo,
  filteredSuggestions,
  showSuggestions,
  isLoading,
  error,
  onUserInfoChange,
  onLocationChange,
  onLocationFocus,
  onLocationBlur,
  onSuggestionClick,
  onSubmit
}: BasicInfoStepProps) => {
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={userInfo.firstName}
            onChange={(e) => onUserInfoChange('firstName', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={userInfo.lastName}
            onChange={(e) => onUserInfoChange('lastName', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={userInfo.dateOfBirth}
            onChange={(e) => onUserInfoChange('dateOfBirth', e.target.value)}
            required
          />
        </div>

        <LocationSuggestions
          location={userInfo.location}
          filteredSuggestions={filteredSuggestions}
          showSuggestions={showSuggestions}
          onLocationChange={onLocationChange}
          onLocationFocus={onLocationFocus}
          onLocationBlur={onLocationBlur}
          onSuggestionClick={onSuggestionClick}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </Card>
  );
};

export default BasicInfoStep;