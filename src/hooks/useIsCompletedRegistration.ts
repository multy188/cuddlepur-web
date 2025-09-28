import { useAuth } from "@/contexts/AuthContext";
import { isRegistrationComplete } from "@/utils/registrationCheck";

export const useIsCompletedRegistration = () => {
  const { user } = useAuth();
  console.log(user)
  return isRegistrationComplete(user);
};