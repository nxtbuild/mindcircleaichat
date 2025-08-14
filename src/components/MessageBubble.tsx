import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { type Persona } from "@/data/personas";

interface MessageProps {
  message: {
    id: string;
    content: string;
    sender: string;
    timestamp: Date;
  };
  personas: Persona[];
}

const MessageBubble: React.FC<MessageProps> = ({ message, personas }) => {
  const isUserMessage = message.sender === "user";
  const isSystemMessage = message.sender === "system";

  const persona =
    isUserMessage || isSystemMessage
      ? null
      : personas.find((p) => p.id === message.sender);

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-4 animate-entry">
        <div className="bg-dark-100/50 text-muted-foreground text-sm px-4 py-2 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  if (isUserMessage) {
    return (
      <div className="flex justify-end gap-3 mb-4 animate-entry">
        <div className="flex flex-col items-end">
          <div className="chat chat-end">
            <div className="user-message  chat-bubble">
              <p className="pr-3 pl-1">{message.content}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            You • {format(message.timestamp, "h:mm a")}
          </span>
        </div>
        <Avatar className="h-8 w-8">
          <img
            src="https://avatars.githubusercontent.com/u/102176332?v=4"
            alt="User"
          />
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4 animate-entry">
      <Avatar className="h-8 w-8 mt-1">
        <img src={persona?.avatar} alt={persona?.name} />
      </Avatar>
      <div className="flex flex-col">
        <div className="chat chat-start ">
          <div className="ai-message bg-blue-500/10 chat-bubble">
            <p className="text-white">{message.content}</p>
          </div>
          <span className="text-xs text-muted-foreground mt-1 ml-2">
            {persona?.name} • {format(message.timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
