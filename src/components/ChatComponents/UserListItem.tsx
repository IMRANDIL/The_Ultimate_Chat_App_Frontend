import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/authSlice";
import Loader from "../Loader";

const UserListItem: React.FC = ({ user, handleFunction }) => {
  const { isLoading } = useSelector((state: RootState) => state.chat.chat);

  return (
    <>
      {isLoading && <Loader />}
      <Box
        onClick={handleFunction}
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
    </>
  );
};

export default UserListItem;
