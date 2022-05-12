import React, { useState, useEffect } from "react";
import { size } from "lodash";
import className from "classnames";
import { getOrdersByTableApi } from "../../../../api/orders";
import { ORDER_STATUS } from "../../../../utils/constans";
import { WrapItem, VStack, Text, Center, Circle } from "@chakra-ui/react";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table } = props;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.PENDING
      );
      setOrders(response);
      // console.log(table.number);
      // console.log(response);
    })();
  }, []);

  return (
    <WrapItem position="relative">
      <VStack
        alignContent="center"
        p={4}
        _hover={{
          opacity: 0.5,
        }}
        cursor="pointer"
        className="table-admin"
      >
        {size(orders) > 0 ? (
          <Circle
            position="absolute"
            top="48px"
            size="32px"
            bg="tomato"
            color="white"
          >
            {size(orders)}
          </Circle>
        ) : null}
        <IcTable
          className={className({
            pending: size(orders) > 0,
          })}
          // fill={className() === pendding ? "#cac" : null}
        />
        <Center>
          <Text>Mesa {table.number}</Text>
        </Center>
      </VStack>
    </WrapItem>
  );
}
