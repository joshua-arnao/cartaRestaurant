import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrder, useTable, usePayment } from "../../hooks";
import { HeaderPage, ListOrderAdmin } from "../../components/Admin";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export function TableDatailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { id } = useParams();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  // useEffect(() => getTable(id), [id]);

  return (
    <>
      <HeaderPage title={`Mesa ****`} />
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
        <ListOrderAdmin orders={orders} />
      )}
    </>
  );
}
