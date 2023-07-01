import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { getSender, getSenderFull } from "../../utils/utils";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/authSlice";
import Loader from "../Loader";

const SingleChat: React.FC = ({ selectedChat, setSelectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { isLoading } = useSelector(
    (state: RootState) => state.message.message
  );

  const sendMessage = () => {};

  const typingHandler = () => {};

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(selectedChat)}
                <ProfileModel user={getSenderFull(selectedChat)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            p={3}
            bg="#E8E8E8"
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {isLoading ? <Loader /> : <div></div>}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                placeholder="Enter a message..."
                variant={"filled"}
                bg={"#E0E0E0"}
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
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
