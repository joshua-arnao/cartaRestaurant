import React from "react";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constans";
import { Image, Text, Button, Box, Flex, HStack } from "@chakra-ui/react";

export function OrderHistoryItem(props) {
  const { order } = props;
  //console.log(order);
  const { title, image } = order.product_data;

  return (
    <Flex
      position="relative"
      borderWidth="1px"
      borderColor="#333"
      p={4}
      rounded="md"
      bg={order.status === "PENDING" ? "#f9d876" : "#91e591"}
      w={{ base: "90%", lg: "50%" }}
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
        <Text>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </Text>
      </Box>

      <HStack>
        <Image boxSize="80px" src={image} />
        <Text>{title}</Text>
        {order.status === ORDER_STATUS.PENDING ? (
          <Text>Preparando</Text>
        ) : (
          <sTextpan>Entregado</sTextpan>
        )}
      </HStack>
    </Flex>
  );
}
