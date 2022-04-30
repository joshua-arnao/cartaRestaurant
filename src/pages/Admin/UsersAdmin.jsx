import React, { useEffect } from "react";
import { HeaderPage, TableUsers } from "../../components/Admin";
import { useUser } from "../../hooks";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export function UsersAdmin() {
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
        // btnTitle="Nuevo Usuario"
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
    </Box>
  );
}
