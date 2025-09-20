import { useState, useCallback, useMemo } from 'react';
import { sampleNotifications } from '@mock/notifications';
import type { Notification } from '@/components/NotificationToast';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notificationsWithImages = useMemo(() => {
    return sampleNotifications.map(notification => ({
      ...notification,
      userImage: notification.userImage === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : notification.userImage === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : notification.userImage
    }));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      timestamp: new Date(),
      userImage: notification.userImage === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : notification.userImage === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : notification.userImage
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  const addSampleNotifications = useCallback(() => {
    notificationsWithImages.forEach((notification, index) => {
      setTimeout(() => addNotification(notification as Omit<Notification, 'id' | 'timestamp' | 'isRead'>), index * 2000);
    });
  }, [notificationsWithImages, addNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
    markNotificationAsRead,
    addSampleNotifications,
    unreadCount: notifications.filter(n => !n.isRead).length,
  };
}