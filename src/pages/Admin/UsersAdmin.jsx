import React, { useState, useEffect } from "react";
import { HeaderPage, TableUsers } from "../../components/Admin";
import { useUser } from "../../hooks";
import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { ModalBasic } from "../../components/Common";

export function UsersAdmin() {
  // const [showModal, setShowModal] = useState(false);
  // const [titleModal, setTitleModal] = useState(null);
  // const [contentModal, setContentModal] = useState(null);
  // const openCloseModal = () => setShowModal((prev)=>!prev)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, users, getUsers } = useUser();
  // console.log("loading =>", loading);
  // console.log("users =>", users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box m={6}>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={onOpen}
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
      <ModalBasic isOpen={isOpen} onClose={onClose} title="Crear usuario" />
    </Box>
  );
}
