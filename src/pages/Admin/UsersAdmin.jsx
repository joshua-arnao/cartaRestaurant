import React, { useState, useEffect } from "react";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { useUser } from "../../hooks";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { ModalBasic } from "../../components/Common";

export function UsersAdmin() {
  const { loading, users, getUsers } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  //const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("loading =>", loading);
  // console.log("users =>", users);

  useEffect(() => {
    getUsers();
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AddEditUserForm />);
    openCloseModal();
  };
  console.log(titleModal);
  console.log(contentModal);

  return (
    <Box m={6}>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
        // btnTitleTwo="Eliminar Usuario"
      />
      {loading ? (
        <Flex flexDirection="column" alignItems="center" justifyItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Cargando...</Text>
        </Flex>
      ) : (
        <TableUsers users={users} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </Box>
  );
}
