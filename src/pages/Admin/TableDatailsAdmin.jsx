import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrder, useTable, usePayment } from "../../hooks";
import { forEach, size } from "lodash";
import {
  HeaderPage,
  ListOrderAdmin,
  AddOrdersForm,
  PaymentDetail,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export function TableDatailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePaymente = async () => {
    const result = window.confirm(
      "¿stas seguro de generar lac uenta de la mesa?"
    );

    if (result) {
      //console.log(orders);
      let totalPayment = 0;
      forEach(orders, (order) => {
        //console.log(order);
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "¿Pago con tarjeta ulsa OK pago con efectivo pulsa CANCELAR?"
      );

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "CARD" : "CASH",
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
      //console.log(paymentData);
      //console.log(payment);
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClicTwo={onCreatePaymente}
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
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar pedido"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrdersForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}
