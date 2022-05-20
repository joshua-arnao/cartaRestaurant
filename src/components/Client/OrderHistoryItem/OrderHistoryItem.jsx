import React from "react";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constans";
import { Image, Text, Button, Box } from "@chakra-ui/react";

export function OrderHistoryItem(props) {
  const { order } = props;
  //console.log(order);
  const { title, image } = order.product_data;

  return (
    <Box bg={order.status === "PENDING" ? "#f9d876" : "#91e591"}>
      <div>
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div>
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <span>Preparando</span>
      ) : (
        <span>Entregado</span>
      )}
    </Box>
  );
}
