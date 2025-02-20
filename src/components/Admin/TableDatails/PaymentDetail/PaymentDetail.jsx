import React from "react";
import { usePayment, useOrder } from "../../../../hooks";
import {
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Button,
  Icon,
} from "@chakra-ui/react";
import { MdOutlineMoney, MdCreditCard } from "react-icons/md";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();
  console.log("order->", orders);
  const getIconPayment = (key) => {
    if (key === "CARD") return <MdCreditCard />;
    if (key === "CASH") return <MdOutlineMoney />;
  };

  const onCloseTable = async () => {
    const result = window.confirm("¿Cerrar mesa para nuevos clientes?");
    if (result) {
      await closePayment(payment.id);

      for await (const order of orders) {
        await closeOrder(order.id);
      }

      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div>
      <TableContainer my={8}>
        <Table variant="striped">
          <Tbody>
            <Tr>
              <Td>Mesa:</Td>
              <Td>{payment.table_data.number}</Td>
            </Tr>
            <Tr>
              <Td>Total:</Td>
              <Td>{payment.totalPayment} $</Td>
            </Tr>
            <Tr>
              <Td>Forma de Pago:</Td>
              <Td>{getIconPayment(payment.paymentType)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button isFullWidth colorScheme="teal" onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}
