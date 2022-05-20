import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export function ModalConfirm(props) {
  const { title, show, onClose, onCloseText, onConfirm, onConfirmText } = props;
  return (
    <>
      <Modal isOpen={show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader mt={4}>{title}</ModalHeader>}

          <ModalCloseButton />
          <ModalBody px={6}>Contenido</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{onCloseText || "Cancelar"}</Button>
            <Button onClick={onConfirm}>{onConfirmText || "Aceptar"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
