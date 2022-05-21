import React, { useState, useEffect } from "react";
import { map, forEach } from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import { useOrder, useTable } from "../../../hooks";
import {
  Avatar,
  Text,
  IconButton,
  Button,
  Divider,
  HStack,
  Stack,
  Flex,
  VStack,
  Spacer,
  Center,
  Box,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    //console.log(idTable);
    //console.log(tableData);
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }

    cleanProductCartApi();
    history.push(`/client/${tableNumber}/orders`);
  };

  return (
    <Stack mt={4} align="center">
      {map(products, (product, index) => (
        <VStack
          key={index}
          py="10px"
          px="20px"
          rounded="lg"
          w={{ base: "90%", lg: "50%" }}
        >
          <Flex w="100%" py="10px">
            <HStack>
              <Avatar src={product.image} />
              <Text>{product.title.substring(0, 15)}</Text>
            </HStack>
            <Spacer />
            <Center>
              <Text>{product.price} $</Text>
            </Center>

            <Spacer />
            <IconButton
              fontSize="20px"
              boxShadow="base"
              icon={<MdDeleteForever />}
              onClick={() => removeProduct(index)}
            />
          </Flex>
          <Divider />
        </VStack>
      ))}
      <Spacer />
      <Box
        position="absolute"
        bottom="0"
        w={{ base: "90%", lg: "50%" }}
        pb="64px"
      >
        <Button onClick={createOrder} isFullWidth boxShadow="base">
          Realizar Pedido ({total} $)
        </Button>
      </Box>
    </Stack>
  );
}
