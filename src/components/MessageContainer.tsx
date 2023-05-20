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
      className="h-full flex flex-col border border-gray-300 rounded-lg overflow-y-auto bg-white p-10 pb-32"
      ref={messagesContainerRef}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className="mb-2 flex justify-start"
          style={{ wordWrap: "break-word", wordBreak: "break-word" }}
        >
          <div
            className="inline-block bg-blue-600 text-white rounded-lg p-4"
            style={{ alignSelf: "flex-start" }}
          >
            {message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
