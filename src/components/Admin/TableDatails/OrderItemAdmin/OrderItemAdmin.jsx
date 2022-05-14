import React from "react";
import { HStack, Box, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/es";

export function OrderItemAdmin(props) {
  const { order } = props;
  const { title, image } = order.product_data;
  console.log(order);

  return (
    <HStack
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
    </HStack>
  );
}
