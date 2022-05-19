import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../:./../../components/Client";
import { Box, Text } from "@chakra-ui/react";

export function Categories(props) {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box px={{ base: "12px", md: "12px" }} py={{ base: "6px", md: "16px" }}>
      <Text textAlign="center" fontSize="2xl">
        Categorias
      </Text>
      {loading ? <p>Cargando</p> : <ListCategories categories={categories} />}
    </Box>
  );
}
