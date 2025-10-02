import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MessageInterface from "./MessageInterface";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { useConversations, useMessages, useUser } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content?: string;
  imageUrl?: string;
  type: 'TEXT' | 'IMAGE';
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: string;
    username?: string | null;
    firstName: string | null;
    lastName: string | null;
    profilePicture: string | null;
  };
}

interface Conversation {
  partnerId: string;
  partner: {
    id: string;
    username?: string | null;
    firstName: string | null;
    lastName: string | null;
    profilePicture: string | null;
    isOnline: boolean;
    lastSeenAt: string | null;
  };
  messages: Message[];
  lastMessage: Message | null;
  unreadCount: number;
}

interface MessagesProps {
  onBook?: (professionalId: string) => void;
  initialUserId?: string;
}

export default function Messages({ onBook, initialUserId }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(initialUserId || null);
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const isMobile = useIsMobile();
  const { socket, connected, onlineUsers } = useSocket();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const hasAutoSelected = useRef(false);

  console.log('💬 Messages component rendered with initialUserId:', initialUserId);

  // Fetch conversations using hook
  const { data: conversationsData, isLoading: conversationsLoading } = useConversations(user?.id || '');
  const baseConversations = Array.isArray(conversationsData) ? conversationsData : [];

  // Fetch new conversation user if initialUserId provided and no conversation exists
  const shouldFetchNewUser = initialUserId && !baseConversations.find((c: Conversation) => c.partnerId === initialUserId);
  const { data: newUserData } = useUser(shouldFetchNewUser ? initialUserId : '');

  const newConversationUser = newUserData?.success && newUserData.user ? {
    id: newUserData.user.id,
    firstName: newUserData.user.firstName,
    lastName: newUserData.user.lastName,
    profilePicture: newUserData.user.profilePicture,
    isOnline: onlineUsers.includes(newUserData.user.id),
  } : null;

  // Merge conversations list - add new user at the top if they don't exist
  const conversations = newConversationUser && !baseConversations.find((c: Conversation) => c.partnerId === newConversationUser.id)
    ? [
        {
          partnerId: newConversationUser.id,
          partner: {
            id: newConversationUser.id,
            firstName: newConversationUser.firstName,
            lastName: newConversationUser.lastName,
            profilePicture: newConversationUser.profilePicture,
            isOnline: newConversationUser.isOnline,
            lastSeenAt: null,
          },
          messages: [],
          lastMessage: null,
          unreadCount: 0,
        } as Conversation,
        ...baseConversations
      ]
    : baseConversations;

  // Auto-select the initialUserId conversation if provided and it exists
  useEffect(() => {
    if (initialUserId && conversations.find((c: Conversation) => c.partnerId === initialUserId)) {
      setSelectedConversation(initialUserId);
    }
  }, [initialUserId, conversations]);

  // Fetch messages using hook
  const { data: messagesData } = useMessages(
    user?.id || '',
    selectedConversation || ''
  );

  // Transform and set messages when data changes
  useEffect(() => {
    if (!messagesData || !Array.isArray(messagesData)) return;

    const transformedMessages = messagesData.map((msg: Message) => ({
      id: msg.id,
      text: msg.content,
      image: msg.imageUrl,
      timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: msg.senderId === user?.id,
      type: msg.type.toLowerCase() as 'text' | 'image',
    }));

    setCurrentMessages(transformedMessages);

    // Mark unread messages as read when viewing conversation
    if (socket && connected && selectedConversation) {
      const unreadMessages = messagesData.filter(
        (msg: Message) => !msg.isRead && msg.receiverId === user?.id
      );

      unreadMessages.forEach((msg: Message) => {
        socket.emit('message:read', msg.id, (response: any) => {
          if (response.success) {
            // Invalidate conversations to update unread count
            queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
          }
        });
      });
    }
  }, [messagesData, user?.id, socket, connected, selectedConversation, queryClient]);

  // Listen for incoming messages via Socket.IO
  useEffect(() => {
    if (!socket || !connected) return;

    socket.on('message:received', (message: Message) => {
      // Add message to current conversation if it's selected
      if (message.senderId === selectedConversation) {
        const transformedMessage = {
          id: message.id,
          text: message.content,
          image: message.imageUrl,
          timestamp: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          type: message.type.toLowerCase() as 'text' | 'image',
        };
        setCurrentMessages((prev) => {
          // Prevent duplicates
          if (prev.some(msg => msg.id === transformedMessage.id)) {
            return prev;
          }
          return [...prev, transformedMessage];
        });
      }

      // Invalidate conversations to refresh the list
      queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
    });

    return () => {
      socket.off('message:received');
    };
  }, [socket, connected, selectedConversation, queryClient, user?.id]);

  const handleSendMessage = useCallback((message: string) => {
    if (!socket || !selectedConversation || !message.trim()) return;

    socket.emit(
      'message:send',
      {
        receiverId: selectedConversation,
        content: message,
        type: 'TEXT',
      },
      (response: any) => {
        if (response.success) {
          console.log('📤 Sent message callback:', {
            senderId: response.message.senderId,
            currentUserId: user?.id,
            isOwn: response.message.senderId === user?.id,
          });
          const transformedMessage = {
            id: response.message.id,
            text: response.message.content,
            timestamp: new Date(response.message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: response.message.senderId === user?.id,
            type: 'text' as const,
          };
          setCurrentMessages((prev) => {
            // Prevent duplicates
            if (prev.some(msg => msg.id === transformedMessage.id)) {
              return prev;
            }
            return [...prev, transformedMessage];
          });
        }
      }
    );
  }, [socket, selectedConversation]);

  const handleSendImage = useCallback((imageUrl: string) => {
    if (!socket || !selectedConversation) return;

    socket.emit(
      'message:send',
      {
        receiverId: selectedConversation,
        imageUrl,
        type: 'IMAGE',
      },
      (response: any) => {
        if (response.success) {
          const transformedMessage = {
            id: response.message.id,
            image: response.message.imageUrl,
            timestamp: new Date(response.message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: response.message.senderId === user?.id,
            type: 'image' as const,
          };
          setCurrentMessages((prev) => {
            // Prevent duplicates
            if (prev.some(msg => msg.id === transformedMessage.id)) {
              return prev;
            }
            return [...prev, transformedMessage];
          });
        }
      }
    );
  }, [socket, selectedConversation]);

  // Get selected conversation data - either from existing conversations or new conversation user
  const selectedConversationData = conversations.find(conv => conv.partnerId === selectedConversation) ||
    (newConversationUser && selectedConversation === newConversationUser.id ? {
      partnerId: newConversationUser.id,
      partner: {
        id: newConversationUser.id,
        firstName: newConversationUser.firstName,
        lastName: newConversationUser.lastName,
        profilePicture: newConversationUser.profilePicture,
        isOnline: newConversationUser.isOnline,
        lastSeenAt: null,
      },
      messages: [],
      lastMessage: null,
      unreadCount: 0,
    } : undefined);

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isMobile) {
    // Mobile Layout: Show either conversation list OR message view
    if (selectedConversation && selectedConversationData) {
      const partnerName = selectedConversationData.partner.username || `${selectedConversationData.partner.firstName || ''} ${selectedConversationData.partner.lastName || ''}`.trim() || 'User';

      // Show message view with back button
      return (
        <div className="flex flex-col h-full pb-20">
          <MessageInterface
            contactName={partnerName}
            contactImage={selectedConversationData.partner.profilePicture || ''}
            isOnline={selectedConversationData.partner.isOnline}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
            onBookSession={() => onBook?.(selectedConversationData.partnerId)}
            onReport={() => console.log('Report user')}
            onBlock={() => console.log('Block user')}
            onBack={() => setSelectedConversation(null)}
            onContactClick={() => setLocation(`/user/${selectedConversationData.partnerId}`)}
          />
        </div>
      );
    } else {
      // Show conversation list only
      return (
        <div className="flex flex-col h-full pb-20">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Conversations</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-4">
                <img
                  src="/assets/nomessage.svg"
                  alt="No messages"
                  className="w-64 h-64 mb-6"
                />
                <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Connect with cuddlers to start a conversation
                </p>
                <Button onClick={() => setLocation('/search')}>
                  Search for Cuddlers
                </Button>
              </div>
            ) : (
              conversations.map((conversation) => {
                const partnerName = conversation.partner.username || `${conversation.partner.firstName || ''} ${conversation.partner.lastName || ''}`.trim() || 'User';
                const lastMessageText = conversation.lastMessage?.type === 'IMAGE' ? '[Image]' : conversation.lastMessage?.content || '';

                return (
                  <Card
                    key={conversation.partnerId}
                    className="m-2 p-3 cursor-pointer hover-elevate transition-all"
                    onClick={() => setSelectedConversation(conversation.partnerId)}
                    data-testid={`conversation-${conversation.partnerId}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.partner.profilePicture || ''} alt={partnerName} />
                          <AvatarFallback>{partnerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {conversation.partner.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate" data-testid={`text-conversation-name-${conversation.partnerId}`}>
                            {partnerName}
                          </h3>
                          {conversation.lastMessage?.createdAt && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate flex-1">
                            {lastMessageText}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <div
                              className="h-2 w-2 bg-red-500 rounded-full ml-2"
                              data-testid={`badge-unread-${conversation.partnerId}`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      );
    }
  }

  // Desktop Layout: Two-panel view
  return (
    <div className="flex h-full pb-20 border border-border rounded-lg overflow-hidden">
      {/* Left Panel - Conversation List */}
      <div className="w-1/3 border-r border-border">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Conversations</h2>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => {
            const partnerName = conversation.partner.username || `${conversation.partner.firstName || ''} ${conversation.partner.lastName || ''}`.trim() || 'User';
            const lastMessageText = conversation.lastMessage?.type === 'IMAGE' ? '[Image]' : conversation.lastMessage?.content || '';

            return (
              <Card
                key={conversation.partnerId}
                className={`m-2 p-3 cursor-pointer hover-elevate transition-all ${
                  selectedConversation === conversation.partnerId ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.partnerId)}
                data-testid={`conversation-${conversation.partnerId}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.partner.profilePicture || ''} alt={partnerName} />
                      <AvatarFallback>{partnerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {conversation.partner.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate" data-testid={`text-conversation-name-${conversation.partnerId}`}>
                        {partnerName}
                      </h3>
                      {conversation.lastMessage?.createdAt && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate flex-1">
                        {lastMessageText}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <div
                          className="h-2 w-2 bg-red-500 rounded-full ml-2"
                          data-testid={`badge-unread-${conversation.partnerId}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Selected Conversation or Empty State */}
      <div className="flex-1 flex flex-col">
        {selectedConversationData ? (
          <MessageInterface
            contactName={selectedConversationData.partner.username || `${selectedConversationData.partner.firstName || ''} ${selectedConversationData.partner.lastName || ''}`.trim() || 'User'}
            contactImage={selectedConversationData.partner.profilePicture || ''}
            isOnline={selectedConversationData.partner.isOnline}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
            onBookSession={() => onBook?.(selectedConversationData.partnerId)}
            onReport={() => console.log('Report user')}
            onBlock={() => console.log('Block user')}
            onContactClick={() => setLocation(`/user/${selectedConversationData.partnerId}`)}
          />
        ) : conversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <img
              src="/assets/nomessage.svg"
              alt="No messages"
              className="w-64 h-64 mb-6"
            />
            <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Connect with cuddlers to start a conversation
            </p>
            <Button onClick={() => setLocation('/search')}>
              Search for Cuddlers
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground text-lg" data-testid="text-select-user">
                Select a user to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
