import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModel: React.FC = ({ user, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent height={"350px"}>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user && user.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent={"space-between"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Image
              borderRadius="full"
              boxSize={"150px"}
              src={user && user.profilePic}
              alt={user && user.username}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily={"Work sans"}
            >
              {user && user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
