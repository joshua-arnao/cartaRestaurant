import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";
import { Box, Flex, Spacer, Text, IconButton, Center } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import _ from "lodash";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  //console.log(useParams());
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(() => {
    getProductsByCategory(idCategory);
  }, [idCategory]);

  console.log(products);

  return (
    <Box>
      <Flex
        align="center"
        w={{ bade: "80%", lg: "100%" }}
        p="16px"
        mx={{ base: "8px", lg: "48px" }}
      >
        <Link to={`/client/${tableNumber}`}>
          <IconButton
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="teal"
            variant="ghost"
            fontSize="24px"
          />
        </Link>
        <Spacer />
        <Text textAlign="center" fontSize={{ base: "2xl", lg: "3xl" }}>
          Productos
        </Text>
        <Spacer />
        <IconButton colorScheme="" variant="ghost" fontSize="24px" isDisabled />
      </Flex>

      {loading ? (
        <Center mt="16px">Cargando...</Center>
      ) : (
        <ListProducts products={products} />
      )}
    </Box>
  );
}
