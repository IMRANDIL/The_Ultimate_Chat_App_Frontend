import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState, getAllUserAsync } from "../../redux/authSlice";
import UserListItem from "./UserListItem";

const GroupChatModal: React.FC = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoading } = useSelector((state: RootState) => state.chat.chat);

  useEffect(() => {
    if (!isOpen) {
      setSearchResult([]); // Reset search result when the drawer is closed
      setSearch("");
    }
  }, [isOpen]);

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
    }, 700); // Adjust the delay (in milliseconds) according to your needs
  };
  const hanldeSubmit = () => {};

  const handleGroup = (user: any) => {};

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            fontSize={"35px"}
            fontFamily={"Work sans"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="chat name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add Users eg: Ali, Ram, Rahim"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((result: any) => (
                  <UserListItem
                    key={result._id}
                    user={result}
                    handleFunction={() => handleGroup(result)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button color={"blue"} onSubmit={hanldeSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
