import React from "react";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/ChatComponents/SideDrawer";
import MyChats from "../components/ChatComponents/MyChats";
import ChatBox from "../components/ChatComponents/ChatBox";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        height="91.5vh"
        padding="10px"
      >
        {userInfo && <MyChats />}
        {userInfo && <ChatBox />}
      </Box>
    </div>
  );
};

export default Home;
