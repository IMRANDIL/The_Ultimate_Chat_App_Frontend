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
import { RootState, logout } from "../../redux/authSlice";
import ProfileModel from "./ProfileModel";
import { toast } from "react-toastify";
import { getAllUserAsync } from "../../redux/authSlice";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const SideDrawer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const { isLoading } = useSelector((state: RootState) => state.auth.auth);
  const dispatch: any = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
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

  const accessChat = (participantId: any) => {
    console.log(participantId);
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
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo.username}
                src={userInfo.profilePic}
              />
            </MenuButton>
            <MenuList>
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
              searchResult.map((result) => (
                <UserListItem
                  key={result._id}
                  user={result}
                  handleChatCreation={() => accessChat(result._id)}
                />
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
