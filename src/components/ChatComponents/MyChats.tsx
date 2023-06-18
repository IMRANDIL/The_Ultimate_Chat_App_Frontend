import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchChatsAsync } from "../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { RootState } from "../../redux/authSlice";
import GroupChatModal from "./GroupChatModal";
import { getSender } from "../../utils/utils";

const MyChats: React.FC = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const { isLoading } = useSelector((state: RootState) => state.chat.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the selectedChat value from local storage
    const storedSelectedChat = localStorage.getItem("selectedChat");
    if (storedSelectedChat) {
      setSelectedChat(JSON.parse(storedSelectedChat));
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await dispatch(fetchChatsAsync());
        if (response && response.payload) {
          setChats(response.payload);
        } else {
          toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchChats();
  }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection={"column"}
        alignItems={"center"}
        p={3}
        bg={"white"}
        w={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily={"Work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          My Chats
          <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={3}
          bg="#F8F8F8"
          w={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflow={"hidden"}
        >
          {isLoading && <ChatLoading />}
          {chats ? (
            <Stack overflowY={"scroll"}>
              {chats &&
                chats.map((chat: any) => {
                  const sender = getSender(chat); // Call getSender only once

                  return (
                    <Box
                      onClick={() => setSelectedChat(chat)}
                      cursor={"pointer"}
                      px={3}
                      py={2}
                      borderRadius={"lg"}
                      key={chat._id}
                      bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                      color={selectedChat === chat ? "white" : "black"}
                    >
                      <Text>{!chat.isGroupChat ? sender : chat.chatName}</Text>
                    </Box>
                  );
                })}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
