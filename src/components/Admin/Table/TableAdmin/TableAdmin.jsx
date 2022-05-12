import React, { useState, useEffect } from "react";
import { getOrdersByTableApi } from "../../../../api/orders";
import { ORDER_STATUS } from "../../../../utils/constans";
import { WrapItem, Stack, Text, Center, Box } from "@chakra-ui/react";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";

export function TableAdmin(props) {
  const { table } = props;

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDING
      );
      console.log(table.number);
      console.log(response);
    })();
  }, []);

  return (
    <WrapItem>
      <Box
        p={4}
        _hover={{
          opacity: 0.5,
        }}
        cursor="pointer"
      >
        <IcTable width="200px" height="120px" />
        <Center>
          <Text>Mesa {table.number}</Text>
        </Center>
      </Box>
    </WrapItem>
  );
}
