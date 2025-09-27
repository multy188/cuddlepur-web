import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema, PhoneFormData } from '@/schemas/authSchemas';
import { useAuth } from '@/contexts/AuthContext';

export const usePhoneForm = () => {
  const { user } = useAuth();

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber?.replace(/^\+\d{1,4}/, '') || "",
      countryCode: user?.phoneNumber?.match(/^\+\d{1,4}/)?.[0] || "+233"
    },
    mode: "onChange"
  });

  return form;
};