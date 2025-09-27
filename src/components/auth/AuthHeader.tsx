import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, LogOut } from "lucide-react";
import { AuthStep } from "@/types/auth";
import { STEP_PROGRESS } from "@/constants/auth";
import { useLocation } from "wouter";

interface AuthHeaderProps {
  currentStep: AuthStep;
  isAuthenticated: boolean;
  signOutPending: boolean;
  onSignOut: () => void;
}

const AuthHeader = ({
  currentStep,
  isAuthenticated,
  signOutPending,
  onSignOut,
}: AuthHeaderProps) => {
  const showSignOut =
    isAuthenticated && currentStep !== "phone" && currentStep !== "otp";
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Step {Object.keys(STEP_PROGRESS).indexOf(currentStep) + 1} of{" "}
            {Object.keys(STEP_PROGRESS).length}
          </div>

          {showSignOut && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              disabled={signOutPending}
              className="text-muted-foreground hover:text-foreground"
              title="Sign out"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>

      <Progress
        value={STEP_PROGRESS[currentStep]}
        className="h-2 bg-gray-700 [&>div]:bg-primary"
      />
    </div>
  );
};

export default AuthHeader;
