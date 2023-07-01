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
import React, { useEffect, useRef, useState } from "react";
import UserBadgeItem from "./UserBadgeItem";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addToChatGroupAsync,
  fetchChatsAsync,
  removeToChatGroupAsync,
  renameChatGroupAsync,
} from "../../redux/chatSlice";
import { RootState, getAllUserAsync } from "../../redux/authSlice";
import Loader from "../Loader";
import UserListItem from "./UserListItem";

const UpdateGroupChatModal: React.FC = ({
  selectedChat,
  setSelectedChat,
  fetchAllMessages,
}) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [renameLoading, setRenameLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.chat.chat);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const currentUser = selectedChat.participants.filter(
    (currentU) => currentU._id === (userInfo && userInfo.id)
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchResult([]); // Reset search result when the drawer is closed
      setSearch("");
    }
  }, [isOpen]);

  const handleRemove = async (participant) => {
    if (
      selectedChat.groupAdmin._id !== userInfo.id &&
      participant._id !== userInfo.id
    ) {
      toast.error("Only Admin can remove the user!");
      return;
    }
    try {
      const response = await dispatch(
        removeToChatGroupAsync({
          chatId: selectedChat._id,
          participantId: participant._id,
        })
      );

      if (response && response.payload) {
        participant._id === userInfo.id
          ? setSelectedChat(null)
          : setSelectedChat(response.payload);
        fetchAllMessages();
        await dispatch(fetchChatsAsync());
      } else if (response.error.message === "Authorization Failed, No Token") {
      } else {
        toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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

  const handleAddUser = async (user1) => {
    if (selectedChat.participants.find((u) => u._id === user1._id)) {
      toast.warning("User already in the group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== userInfo.id) {
      toast.error("Only Admin can add the user!");
      return;
    }

    try {
      const response = await dispatch(
        addToChatGroupAsync({
          chatId: selectedChat._id,
          participantId: user1._id,
        })
      );

      if (response && response.payload) {
        setSelectedChat(response.payload);
        setSearch("");
        setSearchResult([]);
        await dispatch(fetchChatsAsync());
      } else if (response.error.message === "Authorization Failed, No Token") {
      } else {
        toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSearch = async (query: string) => {
    // Clear any previous timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSearch(query.trim());

    // Set a new timer to execute the search logic after a specified delay
    timerRef.current = setTimeout(async () => {
      if (search.trim()) {
        try {
          const response = await dispatch(getAllUserAsync({ search }));
          if (response && response.payload) {
            setSearchResult(response.payload.data);
          } else if (
            response.error.message === "Authorization Failed, No Token"
          ) {
            // Handle authorization failure
          } else {
            toast.error(response.error.message);
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      } else {
        return;
      }
    }, 300); // Adjust the delay (in milliseconds) according to your needs
  };

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
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {isLoading ? (
              <Loader />
            ) : (
              searchResult?.map((result: any) => (
                <UserListItem
                  key={result._id}
                  user={result}
                  handleFunction={() => handleAddUser(result)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => handleRemove(currentUser[0])}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
