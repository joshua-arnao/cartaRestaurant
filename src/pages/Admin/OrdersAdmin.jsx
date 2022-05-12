import React, { useEffect } from "react";
import { HeaderPage, TableListAdmin } from "../../components/Admin";
import { useTable } from "../../hooks";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <HeaderPage title="Restaurante" />
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
        <TableListAdmin tables={tables} />
      )}
    </>
  );
}
