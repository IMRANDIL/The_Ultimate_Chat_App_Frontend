import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ModalBody } from "react-bootstrap";

const GroupChatModal: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>eeeeee</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
