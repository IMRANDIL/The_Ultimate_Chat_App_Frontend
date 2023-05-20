import React, { useEffect, useRef } from "react";

interface MessageContainerProps {
  messages: string[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the message container when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="h-full border border-white-600 overflow-y-auto bg-white-600 p-10 pb-20"
      ref={messagesContainerRef}
    >
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
