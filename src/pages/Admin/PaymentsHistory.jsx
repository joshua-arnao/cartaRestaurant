import React, { useEffect } from "react";
import { HeaderPage, TablePayments } from "../../components/Admin";
import { usePayment } from "../../hooks";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export function PaymentsHistory() {
  const { loading, payments, getPayments } = usePayment();
  useEffect(() => {
    getPayments();
  }, []);

  console.log(payments);
  return (
    <>
      <HeaderPage title="Historial de Pagos" />
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
        <TablePayments payments={payments} />
      )}
    </>
  );
}
