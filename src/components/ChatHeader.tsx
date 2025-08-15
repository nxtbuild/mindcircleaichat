import React from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { type Persona } from "@/data/personas";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ChatHeaderProps {
  activePersonas: Persona[];
  isSelectionView: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  activePersonas,
  isSelectionView,
}) => {
  return (
    <header className="sticky top-0 z-10 border-b border-dark-100 bg-dark-400/80 backdrop-blur-md p-4">
      <div className="md:max-w-[1500px] max-w-4xl mx-auto flex items-center justify-between">
        {isSelectionView ? (
          <h1 className="text-xl font-bold text-white">MindCircle</h1>
        ) : (
          <>
            <div className="flex items-center gap-3 flex-1">
              {activePersonas.length === 1 ? (
                <>
                  <Avatar className="h-8 w-8 border border-orange-500/50">
                    <img
                      src={activePersonas[0].avatar}
                      alt={activePersonas[0].name}
                    />
                  </Avatar>
                  <span className="font-medium">
                    {activePersonas[0].name} ({activePersonas[0].title})
                  </span>
                </>
              ) : activePersonas.length > 1 ? (
                <>
                  <AvatarGroup>
                    {activePersonas.map((persona) => (
                      <Avatar
                        key={persona.id}
                        className="h-8 w-8 border border-orange-500/50"
                      >
                        <img src={persona.avatar} alt={persona.name} />
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="font-medium">MindCircle AI Chat</span>
                </>
              ) : (
                // Default fallback when no persona is selected
                <>
                  <Avatar className="h-8 w-8 ">
                    <img
                      src="/img/ai-technology.png" // <-- your default image path
                      alt="Default Avatar"
                    />
                  </Avatar>
                  <span className="font-medium text-gray-400">
                    MindCircle AI chat
                  </span>
                </>
              )}
            </div>
          </>
        )}
        <a href="https://github.com/nxtbuild/Persona-ai" target="_blank">
          <FaGithub className="text-2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/santosh-vishwakarma-web/"
          className="ml-2"
          target="_blank"
        >
          <FaLinkedin className="text-2xl" />
        </a>
        <a href="https://x.com/santosh_web" className="ml-2" target="_blank">
          <FaTwitter className="text-2xl" />
        </a>
      </div>
    </header>
  );
};

export default ChatHeader;
