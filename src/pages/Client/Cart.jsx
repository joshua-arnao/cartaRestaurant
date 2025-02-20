import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";
import {
  Button,
  Text,
  Box,
  VStack,
  Center,
  Image,
  Spacer,
} from "@chakra-ui/react";
import plateEmpty from "../../assets/plate.jpg";

export function Cart(props) {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      //console.log(idProductsCart);
      const productArray = [];
      for await (const idProduct of idProductsCart) {
        //console.log(idProduct);
        const response = await getProductById(idProduct);
        //console.log(response);
        productArray.push(response);
      }
      setProducts(productArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <Box>
      <Box align="center" p="16px">
        <Text textAlign="center" fontSize={{ base: "2xl", lg: "3xl" }}>
          Carrito
        </Text>
      </Box>

      {!products ? (
        <Center mt="16px">Cargando...</Center>
      ) : size(products) === 0 ? (
        <VStack>
          <Text mt="16px">Tu carrito esta vacio</Text>
          <Spacer />
          <Center>
            <VStack>
              <Image boxSize="300px" src={plateEmpty} />
              <Spacer />
              <Link to={`/client/${tableNumber}`}>
                <Text as="ins" color="purple">
                  Ver Menú
                </Text>
              </Link>
              <Spacer />
              <Text>o</Text>
              <Link to={`/client/${tableNumber}/orders`}>
                <Button colorScheme="purple">Ver pedidos</Button>
              </Link>
            </VStack>
          </Center>
        </VStack>
      ) : (
        <>
          <ListProductCart products={products} onReloadCart={onReloadCart} />
        </>
      )}
    </Box>
  );
}
