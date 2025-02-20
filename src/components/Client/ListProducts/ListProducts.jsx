import React from "react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart } from "../../../api/cart";
import {
  Stack,
  Flex,
  HStack,
  Image,
  Text,
  IconButton,
  Spacer,
  Center,
  VStack,
} from "@chakra-ui/react";
import { MdOutlineAdd } from "react-icons/md";

export function ListProducts(props) {
  const { products } = props;
  console.log("productos ->", products);

  const addcart = (product) => {
    //console.log("Añadido carrito", product.title);
    addProductCart(product.id);
    toast.success(`${product.title} Añadido al carrito`);
  };

  return (
    <Stack mt={4} align="center">
      {map(products, (product) => (
        <Flex
          key={product.id}
          border="1px"
          borderColor="gray.200"
          py="10px"
          px="20px"
          w={{ base: "90%", lg: "50%" }}
          rounded="lg"
        >
          <HStack>
            <Image rounded="lg" boxSize="80px" src={product.image} />
            <Text fontSize="lg">{product.title}</Text>
          </HStack>
          <Spacer />
          <Center>
            <IconButton
              icon={<MdOutlineAdd />}
              fontSize="20px"
              boxShadow="base"
              colorScheme="purple"
              onClick={() => addcart(product)}
            />
          </Center>
        </Flex>
      ))}
    </Stack>
  );
}
