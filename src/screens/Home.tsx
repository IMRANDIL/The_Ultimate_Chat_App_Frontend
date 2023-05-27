import React from "react";
import { Box } from "@chakra-ui/layout";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  return (
    <div style={{ width: "100%" }}>
      {/* {userInfo && <SideDrawer/>} */}
      <Box>
        {/* {userInfo && <MyChats/>} */}
        {/* {userInfo && <ChatBox/>} */}
      </Box>
    </div>
  );
};

export default Home;
