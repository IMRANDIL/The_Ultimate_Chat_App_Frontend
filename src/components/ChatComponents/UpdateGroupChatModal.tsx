import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchChatsAsync, renameChatGroupAsync } from "../../redux/chatSlice";

const UpdateGroupChatModal: React.FC = ({ selectedChat, setSelectedChat }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [renameLoading, setRenameLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleRemove = (participant) => {};

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const response = await dispatch(
        renameChatGroupAsync({
          chatId: selectedChat._id,
          chatName: groupChatName,
        })
      );
      setRenameLoading(false);
      if (response && response.payload) {
        setSelectedChat(response.payload);
        setGroupChatName("");
        await dispatch(fetchChatsAsync());
      } else if (response.error.message === "Authorization Failed, No Token") {
      } else {
        toast.error(response.error.message);
        setRenameLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setRenameLoading(false);
    }
  };

  const handleSearch = (e) => {};

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
            <FormControl display={"flex"}>
              <Input
                placeholder="group chat name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
