import React, { useState } from "react";
import { lodash, map } from "lodash";
import moment from "moment";
import { ModalBasic } from "../../../Common";
import { PaymentProductList } from "../../../Admin";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { MdOutlineMoney, MdCreditCard, MdRemoveRedEye } from "react-icons/md";

export function TablePayments(props) {
  const { payments } = props;
  // console.log(payments);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const getIconName = (key) => {
    if (key === "CARD") return <MdCreditCard />;
    if (key === "CASH") return <MdOutlineMoney />;
  };

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showDatails = (payment) => {
    //console.log(payment);
    setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`);
    setContentModal(<PaymentProductList payment={payment} />);
    openCloseModal();
  };

  return (
    <>
      <TableContainer my={8}>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Mesas</Th>
              <Th>Tipo de Pago</Th>
              <Th>Fecha</Th>
              <Th isNumeric>Total</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {map(payments, (payment, index) => (
              <Tr key={index}>
                <Td>{payment.id}</Td>
                <Td>{payment.table_data.number}</Td>
                <Td>{getIconName(payment.paymentType)}</Td>
                <Td>
                  {moment(payment.created_at).format("DD/MM/YYYY - HH:mm")}
                </Td>
                <Td isNumeric>{payment.totalPayment} $</Td>
                <Td>
                  <IconButton
                    icon={<MdRemoveRedEye />}
                    onClick={() => showDatails(payment)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
