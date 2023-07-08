import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, logout, logoutUserAsync } from "../../redux/authSlice";
import ProfileModel from "./ProfileModel";
import { toast } from "react-toastify";
import { getAllUserAsync } from "../../redux/authSlice";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import {
  clearStore,
  createChatAsync,
  fetchChatsAsync,
} from "../../redux/chatSlice";
import Loader from "../Loader";
import { getSender } from "../../utils/utils";
import ReactBadge from "../ReactBadge";

const SideDrawer: React.FC = ({
  notification,
  setNotification,
  setSelectedChat,
}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const [selectedChat, setSelectedChat] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const { isLoading } = useSelector((state: RootState) => state.auth.auth);
  const { fetchChats } = useSelector((state: RootState) => state.chat.chat);

  const dispatch: any = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUserAsync());
      if (response && response.payload) {
        dispatch(logout());
        dispatch(clearStore());
        navigate("/login", { replace: true });
      } else {
        toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchResult([]); // Reset search result when the drawer is closed
      setSearch("");
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (search.trim()) {
      try {
        const response = await dispatch(getAllUserAsync({ search }));
        if (response && response.payload) {
          setSearchResult(response.payload.data);
        } else if (
          response.error.message === "Authorization Failed, No Token"
        ) {
        } else {
          toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      return;
    }
  };

  const accessChat = async (participantId: any) => {
    console.log(fetchChats);
    const isParticipantExistsInGroup = fetchChats.some(
      (chat: any) =>
        chat.isGroupChat === true &&
        chat.participants.some(
          (participant: any) => participant._id === participantId
        )
    );

    const isParticipantExistsInOneToOne = fetchChats.some(
      (chat: any) =>
        chat.isGroupChat === false &&
        chat.participants.some(
          (participant: any) => participant._id === participantId
        )
    );

    if (isParticipantExistsInGroup && isParticipantExistsInOneToOne) {
      // Participant already exists in a group chat, handle accordingly
      // For example, display an error message or take appropriate action
      onClose();
      return;
    }

    try {
      const response = await dispatch(createChatAsync({ participantId }));
      if (response && response.payload) {
        try {
          await dispatch(fetchChatsAsync());
        } catch (error: any) {
          toast.error(error.message);
        }

        // setSelectedChat(response.payload);
        onClose();
      } else {
        toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chit-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <div style={{ position: "relative" }}>
                {notification.length > 0 && (
                  <ReactBadge notificationCount={notification.length} />
                )}
                <BellIcon fontSize="2xl" m={1} />
              </div>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new messages"}
              {notification.map((notif) => {
                const sender = getSender(notif.chat);

                return (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setNotification(notification.filter((n) => n !== notif));
                      setSelectedChat(notif.chat);
                    }}
                  >
                    {notif?.chat?.isGroupChat
                      ? `New message in ${notif.chat.chatName}`
                      : `New message from ${sender}`}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo && userInfo.username}
                src={userInfo && userInfo.profilePic}
              />
            </MenuButton>
            <MenuList>
              {isLoading && <Loader />}
              <ProfileModel user={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>

              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {isLoading && <ChatLoading />}
            {searchResult &&
              searchResult.map((result: any) => (
                <UserListItem
                  key={result._id}
                  user={result}
                  handleFunction={() => accessChat(result._id)}
                />
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
