import { useState } from "react";
import MessageInterface from '../MessageInterface';
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

export default function MessageInterfaceExample() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'd love to book a session with you this week. Are you available Friday evening?",
      timestamp: "2:30 PM",
      isOwn: true
    },
    {
      id: "2", 
      text: "Hello! Yes, I have availability Friday evening. What time works best for you?",
      timestamp: "2:32 PM",
      isOwn: false
    },
    {
      id: "3",
      text: "Perfect! How about 6:30 PM? I can host at my place or meet at a coffee shop.",
      timestamp: "2:35 PM", 
      isOwn: true
    },
    {
      id: "4",
      text: "6:30 PM works great! A coffee shop sounds perfect. I know a cozy place downtown.",
      timestamp: "2:37 PM",
      isOwn: false
    }
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <MessageInterface
        contactName="Sarah"
        contactImage={femaleProfile}
        isOnline={true}
        messages={messages}
        onSendMessage={handleSendMessage}
        onBookSession={() => console.log('Book session clicked')}
        onVoiceCall={() => console.log('Voice call clicked')}
        hasActiveBooking={true}
      />
    </div>
  );
}