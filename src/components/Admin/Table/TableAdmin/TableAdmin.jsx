import React, { useState, useEffect } from "react";
import { size } from "lodash";
import className from "classnames";
import { Link } from "react-router-dom";
import { getOrdersByTableApi } from "../../../../api/orders";
import { ORDER_STATUS } from "../../../../utils/constans";
import { WrapItem, VStack, Text, Center, Circle, Tag } from "@chakra-ui/react";
import { ReactComponent as IcTable } from "../../../../assets/table-two.svg";
import { usePayment } from "../../../../hooks";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPaymentByTable } = usePayment();

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
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.DELIVERED
      );
      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
      // console.log(table.number);
      // console.log(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]);

  return (
    <Link to={`/admin/table/${table.id}`}>
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
              top="97px"
              size="32px"
              bg="tomato"
              color="white"
              boxShadow="2xl"
            >
              <Text fontWeights="900" fontSize="xl">
                {size(orders)}
              </Text>
            </Circle>
          ) : null}

          {pendingPayment && (
            <Tag
              size="lg"
              variant="outline"
              position="absolute"
              top="89px"
              bg="white"
              colorScheme="red"
              color="red"
            >
              Cuenta
            </Tag>
          )}
          <IcTable
            className={className({
              pending: size(orders) > 0,
              busy: tableBusy,
              "pending-payment": pendingPayment,
            })}
            // fill={className() === pendding ? "#cac" : null}
          />
          <Center>
            <Text>Mesa {table.number}</Text>
          </Center>
        </VStack>
      </WrapItem>
    </Link>
  );
}
