import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import PersonaCard from "@/components/PersonaCard";
import MessageBubble from "@/components/MessageBubble";
import { personas, type Persona } from "@/data/personas";
import { generateAIResponse } from "@/utils/aiResponse";
import ChatHeader from "@/components/ChatHeader";

type PersonalityTone = "default" | "funny" | "advice" | "educational";

const Index = () => {
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<
    { id: string; content: string; sender: string; timestamp: Date }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [personalityTone, setPersonalityTone] =
    useState<PersonalityTone>("default");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content: string, sender: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content, sender, timestamp: new Date() },
    ]);
  };

  const handlePersonaSelect = async (persona: Persona) => {
    const isSame = activePersona?.id === persona.id;
    const updated = isSame ? null : persona;
    setActivePersona(updated);
    setMessages([]);

    if (updated) {
      startChat(updated);
    }
  };

  const startChat = async (persona: Persona) => {
    setIsLoading(true);
    try {
      const response = await generateAIResponse(
        "Say hello and introduce yourself briefly",
        [persona],
        temperature,
        personalityTone
      );
      addMessage(response as string, persona.id);
    } catch (err) {
      console.error("Error getting welcome message:", err);
      addMessage("Hello! How can I help you today?", persona.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !activePersona) return;
    addMessage(inputMessage, "user");
    const sentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await generateAIResponse(
        sentMessage,
        [activePersona],
        temperature,
        personalityTone
      );

      addMessage(
        typeof response === "string" ? response : response[activePersona.id],
        activePersona.id
      );
    } catch (err) {
      console.error("Error generating response:", err);
      addMessage("Sorry, I couldn't process that message.", "system");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-dark-500">
      {/* Left Sidebar - Persona List */}
      <div
        className=" bg-dark-400/80  w-full md:w-1/4 border-r border-dark-50 z-10 p-4
       md:sticky md:top-0 h-auto overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          Select who you'd like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isSelected={activePersona?.id === persona.id}
              onClick={() => handlePersonaSelect(persona)}
            />
          ))}
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          activePersonas={activePersona ? [activePersona] : []}
          isSelectionView={false}
        />

        {/* If no persona selected, show prompt */}
        {!activePersona ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm0 0c0 2.2-1.8 4-4 4H6v3l-4-4 4-4v3h2c1.1 0 2-.9 2-2zm0-6h4v3l4-4-4-4v3h-4v2z"
              />
            </svg>

            <h1 className="text-5xl font-bold text-orange-500 mb-5 lucide lucide-coffee  mx-auto animate-pulse">
              Welcome to MindCircle AI
            </h1>
            <h2 className="text-lg font-semibold text-white mb-10">
              Connect with Preferred AI assistant to get personalized
              conversions.
            </h2>
            <h2 className="text-lg font-semibold text-white">
              No persona selected
            </h2>
            <p className="text-md text-gray-400 mt-2">
              Please select a persona from the left panel to start chatting.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 ">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    personas={personas}
                  />
                ))}

                {isLoading && (
                  <div
                    className="ai-message animate-pulse flex items-center space-x-1
                   bg-orange-500/20 px-3 py-2 rounded-2xl  max-w-max"
                  >
                    <div className="h-1 w-1 bg-orange-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-orange-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-orange-400 rounded-full"></div>
                    <span className="text-orange-500 text-sm font-medium ml-10">
                      {activePersona.name}
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Box */}
            <div
              className="flex gap-2 sticky bottom-0 z-10 border-b border-dark-100 bg-dark-400/80
              backdrop-blur-md p-4"
            >
              <span className="absolute bottom-[4rem] right-30 text-xs text-muted-foreground">
                {inputMessage.length}/1000
              </span>
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 1000) {
                    setInputMessage(value);
                  }
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                className="bg-dark-100 border-dark-50 rounded-full"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-dark-100 border-dark-50 hover:bg-orange-500/20 rounded-full"
                  >
                    <Settings className="h-4 w-4 text-orange-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-dark-100 bg-dark-400/80 backdrop-blur-md">
                  <div className="space-y-4">
                    <h3 className="font-medium text-orange-500">
                      Personality Tone
                    </h3>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          ["default", "funny", "advice", "educational"] as const
                        ).map((tone) => (
                          <Button
                            key={tone}
                            variant={
                              personalityTone === tone ? "default" : "outline"
                            }
                            className={
                              personalityTone === tone
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-dark-100 hover:bg-orange-500/20 border border-orange-600"
                            }
                            onClick={() => setPersonalityTone(tone)}
                          >
                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                className="bg-orange-500 hover:bg-orange-600 rounded-full"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-2 w-2 " /> Send
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
