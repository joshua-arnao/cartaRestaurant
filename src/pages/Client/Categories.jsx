import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../:./../../components/Client";
import { Box, Text, Center } from "@chakra-ui/react";

export function Categories(props) {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Box align="center" p="16px">
        <Text textAlign="center" fontSize={{ base: "2xl", lg: "3xl" }}>
          Categorias
        </Text>
      </Box>
      <Box px={{ base: "12px", md: "12px" }} py={{ base: "0px", md: "16px" }}>
        {loading ? (
          <Center mt="16px">Cargando</Center>
        ) : (
          <ListCategories categories={categories} />
        )}
      </Box>
    </>
  );
}
