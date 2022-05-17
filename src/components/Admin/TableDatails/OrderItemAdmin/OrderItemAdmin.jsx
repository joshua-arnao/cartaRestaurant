import React from "react";
import {
  HStack,
  Box,
  Image,
  Text,
  Button,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useOrder } from "../../../../hooks";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../../utils/constans";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;
  console.log(order);
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };

  return (
    <Flex
      position="relative"
      borderWidth="1px"
      borderColor="#333"
      p={4}
      rounded="md"
      bg={order.status === "PENDING" ? "#f9d876" : "#91e591"}
    >
      <Box
        borderWidth="1px"
        borderColor="#333"
        position="absolute"
        top="-18px"
        right="16px"
        bg="white"
        boxShadow="sm"
        rounded="md"
        px={4}
        py={1}
      >
        {moment(order.created_at).format("HH:mm")} {"- "}
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </Box>
      <HStack>
        <Image boxSize="100px" width="150px" src={image} />
        <Text>{title}</Text>
      </HStack>
      <Spacer />
      <Center>
        {order.status === ORDER_STATUS.PENDING ? (
          <Button
            size="sm"
            colorScheme="pink"
            boxShadow="base"
            onClick={() => onCheckDeliveredOrder()}
          >
            Marcar Entregado
          </Button>
        ) : null}
      </Center>
    </Flex>
  );
}
