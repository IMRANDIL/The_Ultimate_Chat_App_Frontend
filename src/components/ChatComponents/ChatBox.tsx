import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const ChatBox: React.FC = ({ selectedChat }) => {
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
      <SingleChat selectedChat={selectedChat} />
    </Box>
  );
};

export default ChatBox;
