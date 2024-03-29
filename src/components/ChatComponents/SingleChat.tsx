import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getSender, getSenderFull } from "../../utils/utils";
import Lottie from "lottie-react";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { toast } from "react-toastify";
import "./styles.css";
import animationData from "../../animations/77160-typing.json";
import {
  fetchAllMessageAsync,
  sendMessageAsync,
} from "../../redux/messageSlice";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import { fetchChatsAsync } from "../../redux/chatSlice";

const END_POINT = `http://localhost:5000`;
let socket, selectedChatCompare;
const SingleChat: React.FC = ({
  selectedChat,
  setSelectedChat,
  notification,
  setNotification,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Create a reference to the input field
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(END_POINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => {
      // Join the chat room after reconnecting
      if (selectedChat) {
        socket.emit("setup", userInfo);
        socket.emit("join chat", selectedChat._id);
      }
    });
    socket.on("disconnect", () => {
      if (selectedChat) {
        socket.emit("setup", userInfo);
        socket.emit("join chat", selectedChat._id);
      }
    });

    socket.on("participant Added", (chat) => {
      if (chat) {
        dispatch(fetchChatsAsync());
      }
    });

    socket.on("participant Removed", (chat) => {
      if (chat) {
        dispatch(fetchChatsAsync());
        setSelectedChat(null);
      }
    });

    socket.on("group Rename", (chat) => {
      if (chat) {
        dispatch(fetchChatsAsync());
      }
    });

    socket.on("group Creation", (chat) => {
      if (chat) {
        dispatch(fetchChatsAsync());
      }
    });

    socket.on("group Left", (chat) => {
      if (chat) {
        dispatch(fetchChatsAsync());
        setSelectedChat(null);
      }
    });

    socket.on("connected", () => setSocketConnected(true)); // Change the event to "connected"
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      // Cleanup function to disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []);

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
        socket.emit("join chat", selectedChat._id);
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

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage.trim()) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");

        const response = await dispatch(
          sendMessageAsync({
            chatId: selectedChat._id,
            content: newMessage,
          })
        );
        if (response && response.payload) {
          socket.emit("new message", response.payload);
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

  useEffect(() => {
    fetchAllMessages();
    // Focus the input field when selectedChat changes
    selectedChatCompare = selectedChat;
    if (selectedChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    //typing socket
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
              {isTyping && (
                <div style={{ width: 70, height: 70, marginBottom: 5 }}>
                  <Lottie
                    width={70}
                    height={70}
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                    }}
                  />
                </div>
              )}

              <Input
                placeholder="Enter a message..."
                ref={inputRef}
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
