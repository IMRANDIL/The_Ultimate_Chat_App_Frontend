import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem: React.FC = ({ user, handleChatCreation }) => {
  return (
    <Box
      onClick={handleChatCreation}
      cursor={"pointer"}
      bg={"#E8E8E8"}
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        src={user.profilePic}
        name={user.username}
      />
      <Box>
        <Text>{user.username}</Text>
        <Text fontSize={"xs"}>
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
