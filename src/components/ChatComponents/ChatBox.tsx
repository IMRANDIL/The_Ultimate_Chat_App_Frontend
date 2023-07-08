import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SingleChat from "./SingleChat";

const ChatBox: React.FC = ({ selectedChat, setSelectedChat }) => {
  const [notification, setNotification] = useState([]);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <SingleChat
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        notification={notification}
        setNotification={setNotification}
      />
    </Box>
  );
};

export default ChatBox;
