import React from "react";
import { map } from "lodash";
import { OrderItemAdmin } from "../../../Admin";
import { Stack } from "@chakra-ui/react";

export function ListOrderAdmin(props) {
  const { orders } = props;
  return (
    <Stack spacing={8} my={8}>
      {map(orders, (order) => (
        <OrderItemAdmin key={order.id} order={order} />
      ))}
    </Stack>
  );
}
