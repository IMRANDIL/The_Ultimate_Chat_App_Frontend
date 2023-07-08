import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/ChatComponents/SideDrawer";
import MyChats from "../components/ChatComponents/MyChats";
import ChatBox from "../components/ChatComponents/ChatBox";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && (
        <SideDrawer
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        height="91.5vh"
        padding="10px"
      >
        {userInfo && (
          <MyChats
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        )}
        {userInfo && (
          <ChatBox
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            notification={notification}
            setNotification={setNotification}
          />
        )}
      </Box>
    </div>
  );
};

export default Home;
