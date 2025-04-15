// components/room/ChatBox.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function ChatBox({ conversation }: { conversation: string[] }) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Animation variants for messages
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="w-full h-full flex flex-col bg-blue-200  gap-2 p-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Chat</h3>
      <div 
        ref={chatContainerRef}
        className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hidden max-h-[50vh] p-3"
      >
        {conversation.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No messages yet...</p>
        ) : (
          conversation.map((message, index) => {
            const isUserMessage = message.startsWith("You:");
            const isAIMessage = message.startsWith("AI:");
            const isSystemMessage = !isUserMessage && !isAIMessage;
            const messageText = message.replace(/^(You:|AI:)\s*/, '');

            return (
              <motion.div
                key={index}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`flex w-full ${
                  isUserMessage ? "justify-end" :
                  isAIMessage ? "justify-start" :
                  "justify-center"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isUserMessage
                      ? "bg-blue-600 text-white"
                      : isAIMessage
                      ? "bg-gray-200 text-gray-800"
                      : "bg-yellow-100 text-gray-600 italic"
                  }`}
                >
                  <p className="text-sm">{messageText}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChatBox;