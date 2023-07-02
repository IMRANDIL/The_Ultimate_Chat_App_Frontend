import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSender, getSenderFull } from "../../utils/utils";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/authSlice";
import Loader from "../Loader";
import { toast } from "react-toastify";
import "./styles.css";
import {
  fetchAllMessageAsync,
  sendMessageAsync,
} from "../../redux/messageSlice";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";

const END_POINT = `http://localhost:5000`;

let socket, selectedChatCompare;

const SingleChat: React.FC = ({ selectedChat, setSelectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // const { isLoading } = useSelector(
  //   (state: RootState) => state.message.message
  // );
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  const dispatch = useDispatch();

  const fetchAllMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const response = await dispatch(
        fetchAllMessageAsync({
          chatId: selectedChat && selectedChat._id,
        })
      );
      if (response && response.payload) {
        setLoading(false);
        setMessages(response.payload);
      } else if (response.error.message === "Authorization Failed, No Token") {
        setLoading(false);
      } else {
        toast.error(response.error.message);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket = io(END_POINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");

        const response = await dispatch(
          sendMessageAsync({
            chatId: selectedChat._id,
            content: newMessage,
          })
        );
        if (response && response.payload) {
          setMessages([...messages, response.payload]);
        } else if (
          response.error.message === "Authorization Failed, No Token"
        ) {
        } else {
          toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

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
                  fetchAllMessages={fetchAllMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg="#E8E8E8"
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Loader />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
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
