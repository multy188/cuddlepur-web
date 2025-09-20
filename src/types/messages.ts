export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  lastSeen?: string;
  messages: Message[];
}