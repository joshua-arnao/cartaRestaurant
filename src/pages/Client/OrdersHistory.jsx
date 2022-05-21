import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { useOrder, useTable, usePayment } from "../../hooks";
import { OrderHistoryItem } from "../../components/Client";
import { ModalConfirm } from "../../components/Common";
import { Box, Button, Text, Center, VStack, Flex } from "@chakra-ui/react";

export const OrdersHistory = () => {
  const [idTable, setIdTable] = useState();
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      //console.log(table);
      const idTable = table[0].id;
      setIdTable(idTable);

      getOrdersByTable(idTable, _, "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
        //console.log(response);
      }
    })();
  }, [idTable]);

  const onCreatePaymente = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };

    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
    // console.log("paymentType -->", paymentType);
    // console.log("totalPayment -->", totalPayment);
    // console.log(paymentData);
  };

  return (
    <Box>
      <Box align="center" p="16px">
        <Text textAlign="center" fontSize={{ base: "2xl", lg: "3xl" }}>
          Mi Pedido
        </Text>
      </Box>
      {loading ? (
        <Center mt="16px">Cargando...</Center>
      ) : (
        <VStack mt={4} align="center">
          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
          {size(orders) > 0 && (
            <Box
              position="absolute"
              bottom="0"
              w={{ base: "90%", lg: "50%" }}
              pb="64px"
              bg="white"
            >
              <Button
                onClick={() =>
                  size(isRequestAccount) === 0 && setShowTypePayment(true)
                }
                isFullWidth
                boxShadow="base"
              >
                {size(isRequestAccount) > 0
                  ? "La cuenta ya esta pedida"
                  : "Pedir la cuenta"}
              </Button>
            </Box>
          )}
        </VStack>
      )}
      <ModalConfirm
        title="Pagar con Tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePaymente("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePaymente("CARD")}
      />
    </Box>
  );
};
