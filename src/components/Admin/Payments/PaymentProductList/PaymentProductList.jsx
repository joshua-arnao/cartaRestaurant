import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { useOrder } from "../../../../hooks";
import { Flex, Image, Center, Spacer } from "@chakra-ui/react";

export function PaymentProductList(props) {
  const { payment } = props;
  const [orders, setOrders] = useState(undefined);
  const { getOrdersByPayment } = useOrder();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      // console.log(response);
      setOrders(response);
    })();
  }, []);
  return (
    <Flex direction="column" gap="4" my={8}>
      {map(orders, (order) => (
        <Flex key={order.id}>
          <Flex gap="4">
            <Image src={order.product_data.image} boxSize="50px" width="75px" />
            <Center>{order.product_data.title}</Center>
          </Flex>
          <Spacer />
          <Center>{order.product_data.price} $</Center>
        </Flex>
      ))}
    </Flex>
  );
}
