import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem: React.FC = ({ selectedUser, handleFunction }) => {
  return (
    <Box
      px={4}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      fontSize={16}
      bg={"purple"}
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
      fontWeight={"bold"}
    >
      {selectedUser.username}
      <CloseIcon pl={2} fontSize={20} />
    </Box>
  );
};

export default UserBadgeItem;
