import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MessageInterface from "./MessageInterface";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";
import maleProfile from "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png";
import { mockConversations } from '@mock/messages';

interface Conversation {
  id: string;
  professionalId: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
  messages: Array<{
    id: string;
    text?: string;
    image?: string;
    timestamp: string;
    isOwn: boolean;
    type: 'text' | 'image';
  }>;
}

interface MessagesProps {
  onBook?: (professionalId: string) => void;
}

export default function Messages({ onBook }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Mock conversation data initialized in state
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      professionalId: "1",
      name: "Sarah",
      image: femaleProfile,
      lastMessage: "Perfect! How about 6:30 PM? I can host at my place or meet at a coffee shop.",
      timestamp: "2:35 PM",
      isOnline: true,
      unreadCount: 0,
      messages: [
        {
          id: "1",
          text: "Hi! I'd love to book a session with you this week. Are you available Friday evening?",
          timestamp: "2:30 PM",
          isOwn: true,
          type: "text" as const
        },
        {
          id: "2", 
          text: "Hello! Yes, I have availability Friday evening. What time works best for you?",
          timestamp: "2:32 PM",
          isOwn: false,
          type: "text" as const
        },
        {
          id: "3",
          text: "Perfect! How about 6:30 PM? I can host at my place or meet at a coffee shop.",
          timestamp: "2:35 PM", 
          isOwn: true,
          type: "text" as const
        }
      ]
    },
    {
      id: "2",
      professionalId: "2",
      name: "Michael",
      image: maleProfile,
      lastMessage: "Thank you for the wonderful session yesterday!",
      timestamp: "Yesterday",
      isOnline: false,
      unreadCount: 2,
      messages: [
        {
          id: "1",
          text: "Thank you for the wonderful session yesterday!",
          timestamp: "Yesterday",
          isOwn: false,
          type: "text" as const
        },
        {
          id: "2",
          text: "I'd love to book another session next week if you're available.",
          timestamp: "Yesterday",
          isOwn: false,
          type: "text" as const
        }
      ]
    },
    {
      id: "3",
      professionalId: "3",
      name: "Emma",
      image: femaleProfile,
      lastMessage: "Looking forward to our session tomorrow",
      timestamp: "Mon",
      isOnline: true,
      unreadCount: 0,
      messages: [
        {
          id: "1",
          text: "Looking forward to our session tomorrow",
          timestamp: "Mon",
          isOwn: false,
          type: "text" as const
        }
      ]
    }
  ]);

  const selectedConversationData = conversations.find(conv => conv.id === selectedConversation);

  const handleSendImage = (imageUrl: string) => {
    if (!selectedConversation) return;
    
    // Create new image message
    const newMessage = {
      id: Date.now().toString(),
      image: imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'image' as const
    };
    
    // Update conversations state
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: '[Image]',
            timestamp: newMessage.timestamp
          };
        }
        return conv;
      })
    );
  };

  const handleSendMessage = (message: string) => {
    if (!selectedConversation || !message.trim()) return;
    
    // Create new text message
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text' as const
    };
    
    // Update conversations state
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: message,
            timestamp: newMessage.timestamp
          };
        }
        return conv;
      })
    );
  };

  if (isMobile) {
    // Mobile Layout: Show either conversation list OR message view
    if (selectedConversation && selectedConversationData) {
      // Show message view with back button
      return (
        <div className="flex flex-col h-full">
          {/* Mobile Message Header with Back Button */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedConversation(null)}
              data-testid="button-back-to-conversations"
              aria-label="Back to conversations"
              title="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversationData.image} alt={selectedConversationData.name} />
                <AvatarFallback>{selectedConversationData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {selectedConversationData.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-semibold" data-testid="text-mobile-contact-name">{selectedConversationData.name}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedConversationData.isOnline ? "Online now" : "Last seen recently"}
              </p>
            </div>
          </div>
          
          {/* Message Interface */}
          <div className="flex-1">
            <MessageInterface
              contactName={selectedConversationData.name}
              contactImage={selectedConversationData.image}
              isOnline={selectedConversationData.isOnline}
              messages={selectedConversationData.messages}
              onSendMessage={handleSendMessage}
              onSendImage={handleSendImage}
              onBookSession={() => onBook?.(selectedConversationData.professionalId)}
              onReport={() => console.log('Report user')}
              onBlock={() => console.log('Block user')}
            />
          </div>
        </div>
      );
    } else {
      // Show conversation list only
      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Conversations</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="m-2 p-3 cursor-pointer hover-elevate transition-all"
                onClick={() => setSelectedConversation(conversation.id)}
                data-testid={`conversation-${conversation.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.image} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate" data-testid={`text-conversation-name-${conversation.id}`}>
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="h-5 w-5 p-0 text-xs flex items-center justify-center ml-2"
                          data-testid={`badge-unread-${conversation.id}`}
                        >
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }
  }

  // Desktop Layout: Two-panel view
  return (
    <div className="flex h-full">
      {/* Left Panel - Conversation List */}
      <div className="w-1/3 border-r border-border">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Conversations</h2>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`m-2 p-3 cursor-pointer hover-elevate transition-all ${
                selectedConversation === conversation.id ? 'bg-muted' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
              data-testid={`conversation-${conversation.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.image} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate" data-testid={`text-conversation-name-${conversation.id}`}>
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate flex-1">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="h-5 w-5 p-0 text-xs flex items-center justify-center ml-2"
                        data-testid={`badge-unread-${conversation.id}`}
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Selected Conversation or Empty State */}
      <div className="flex-1 flex flex-col">
        {selectedConversationData ? (
          <MessageInterface
            contactName={selectedConversationData.name}
            contactImage={selectedConversationData.image}
            isOnline={selectedConversationData.isOnline}
            messages={selectedConversationData.messages}
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
            onBookSession={() => onBook?.(selectedConversationData.professionalId)}
            onReport={() => console.log('Report user')}
            onBlock={() => console.log('Block user')}
          />
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