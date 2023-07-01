import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserBadgeItem from "./UserBadgeItem";

const UpdateGroupChatModal: React.FC = ({ selectedChat }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [renameLoading, setRenameLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemove = (participant) => {};

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<ViewIcon />}
        display={{ base: "flex" }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} w={"100%"} flexWrap={"wrap"} pb={3}>
              {selectedChat.participants.map((participant) => (
                <UserBadgeItem
                  key={participant._id}
                  selectedUser={participant}
                  handleFunction={() => handleRemove(participant)}
                />
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
