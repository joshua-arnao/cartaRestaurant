import React from "react";
import { map } from "lodash";
import { useLocation, useHistory } from "react-router-dom";
import { Image, HStack, Wrap } from "@chakra-ui/react";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const history = useHistory();
  //console.log(location);

  const goToCategory = (id) => {
    //console.log(id);
    //console.log(`${location.pathname}/${id}`);
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <Wrap
      align="stretch"
      spacing="16px"
      py={{ base: "6px", md: "16px" }}
      justify="center"
      mt={4}
    >
      {map(categories, (category) => (
        <HStack
          key={category.id}
          spacing="16px"
          border="1px"
          borderColor="gray.200"
          onClick={() => goToCategory(category.id)}
          w={{ base: "100%", md: "500px" }}
        >
          <Image src={category.image} boxSize="100px" width="150px" />
          <span>{category.title}</span>
        </HStack>
      ))}
    </Wrap>
  );
}
