import type { Conversation } from '@types';

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah",
    image: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    lastMessage: "Looking forward to our session tomorrow!",
    timestamp: "2 mins ago",
    unread: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi! I saw your profile and would love to book a session.",
        timestamp: "10:30 AM",
        isMe: true
      },
      {
        id: "2",
        text: "Hello! I'd be happy to meet. What kind of companionship are you looking for?",
        timestamp: "10:32 AM",
        isMe: false
      },
      {
        id: "3",
        text: "I'm new to the city and would love someone to show me around the local art galleries.",
        timestamp: "10:35 AM",
        isMe: true
      },
      {
        id: "4", 
        text: "That sounds wonderful! I know several great galleries. When were you thinking?",
        timestamp: "10:36 AM",
        isMe: false
      },
      {
        id: "5",
        text: "How about tomorrow afternoon around 2 PM?",
        timestamp: "10:40 AM",
        isMe: true
      },
      {
        id: "6",
        text: "Perfect! I'll send you a booking request. Looking forward to our session tomorrow!",
        timestamp: "10:42 AM",
        isMe: false
      }
    ]
  },
  {
    id: "2",
    name: "Michael", 
    image: "@assets/generated_images/Male_professional_profile_photo_38a68cd4.png",
    lastMessage: "Thank you for the wonderful afternoon!",
    timestamp: "1 hour ago",
    unread: 0,
    isOnline: true,
    lastSeen: "Active now",
    messages: [
      {
        id: "1",
        text: "Hi Michael, are you available for a counseling session this week?",
        timestamp: "Yesterday 3:00 PM",
        isMe: true
      },
      {
        id: "2", 
        text: "Hello! Yes, I have availability. What days work best for you?",
        timestamp: "Yesterday 3:15 PM",
        isMe: false
      },
      {
        id: "3",
        text: "Wednesday or Thursday afternoon would be great.",
        timestamp: "Yesterday 3:20 PM", 
        isMe: true
      },
      {
        id: "4",
        text: "Thursday at 2 PM works well for me. Shall we meet at the usual coffee shop?",
        timestamp: "Yesterday 3:25 PM",
        isMe: false
      },
      {
        id: "5",
        text: "That's perfect! See you then.",
        timestamp: "Yesterday 3:30 PM",
        isMe: true
      },
      {
        id: "6",
        text: "Thank you for the wonderful afternoon!",
        timestamp: "1 hour ago",
        isMe: false
      }
    ]
  },
  {
    id: "3",
    name: "Emma",
    image: "@assets/generated_images/Professional_profile_photo_f962fff8.png",
    lastMessage: "Can we reschedule to next week?",
    timestamp: "2 hours ago",
    unread: 1,
    isOnline: false,
    lastSeen: "Last seen 30 mins ago",
    messages: [
      {
        id: "1",
        text: "Hi Emma! I saw you offer museum tour companionship.",
        timestamp: "Today 9:00 AM",
        isMe: true
      },
      {
        id: "2",
        text: "Yes! I love showing people around the National Museum. Are you interested?",
        timestamp: "Today 9:30 AM",
        isMe: false
      },
      {
        id: "3",
        text: "Definitely! How about this Saturday morning?",
        timestamp: "Today 10:00 AM",
        isMe: true
      },
      {
        id: "4",
        text: "Saturday works! Let me check my schedule and get back to you.",
        timestamp: "Today 11:00 AM",
        isMe: false
      },
      {
        id: "5",
        text: "Actually, something came up. Can we reschedule to next week?",
        timestamp: "2 hours ago",
        isMe: false
      }
    ]
  }
];