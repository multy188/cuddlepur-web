import { useState, useMemo, useCallback } from 'react';
import { mockConversations } from '@mock/messages';
import type { Conversation, Message } from '@types';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";

export function useMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversationsWithImages = useMemo(() => {
    return mockConversations.map(conversation => ({
      ...conversation,
      image: conversation.image === "@assets/generated_images/Professional_profile_photo_f962fff8.png" 
        ? femaleProfile 
        : conversation.image === "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png"
        ? maleProfile
        : conversation.image
    }));
  }, []);

  const getConversationById = useCallback((id: string) => {
    return conversationsWithImages.find(conversation => conversation.id === id);
  }, [conversationsWithImages]);

  const getUnreadCount = useCallback(() => {
    return conversationsWithImages.reduce((total, conversation) => total + conversation.unread, 0);
  }, [conversationsWithImages]);

  const getOnlineConversations = useCallback(() => {
    return conversationsWithImages.filter(conversation => conversation.isOnline);
  }, [conversationsWithImages]);

  const sendMessage = useCallback((conversationId: string, messageText: string) => {
    // In a real app, this would send the message to the API
    console.log(`Sending message to ${conversationId}: ${messageText}`);
    
    // For now, just log the action
    // In the future, this would update the conversation's messages array
  }, []);

  const markAsRead = useCallback((conversationId: string) => {
    // In a real app, this would mark messages as read via API
    console.log(`Marking conversation ${conversationId} as read`);
  }, []);

  const searchConversations = useCallback((query: string) => {
    if (!query.trim()) return conversationsWithImages;
    
    return conversationsWithImages.filter(conversation =>
      conversation.name.toLowerCase().includes(query.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [conversationsWithImages]);

  return {
    conversations: conversationsWithImages,
    selectedConversation,
    setSelectedConversation,
    getConversationById,
    getUnreadCount,
    getOnlineConversations,
    sendMessage,
    markAsRead,
    searchConversations,
    totalConversations: conversationsWithImages.length,
    unreadMessages: getUnreadCount(),
  };
}