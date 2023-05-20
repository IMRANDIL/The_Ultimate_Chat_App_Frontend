import { useState } from "react";
import MessageContainer from "./MessageContainer";

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessages((prevMsg) => [...prevMsg, message]);
    setMessage("");
  };

  return (
    <div className="h-100  p-6">
      <MessageContainer messages={messages} />
      <div className="absolute inset-x-0 mx-auto bottom-10  w-4/5">
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            className="ml-2 bg-blue-500 text-white px-9 py-3 rounded-md"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
