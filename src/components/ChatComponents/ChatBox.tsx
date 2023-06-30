import { Box } from "@chakra-ui/react";
import React from "react";

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
      singleChat
    </Box>
  );
};

export default ChatBox;
