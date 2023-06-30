import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SingleChat: React.FC = ({ selectedChat }) => {
  return (
    <>
      {selectedChat ? (
        <></>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
