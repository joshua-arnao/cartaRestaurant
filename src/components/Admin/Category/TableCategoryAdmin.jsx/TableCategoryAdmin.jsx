import React from "react";
import { map } from "lodash";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

export function TableCategoryAdmin(props) {
  const { categories, updateCategory, deleteCategory } = props;
  return (
    <TableContainer my={8}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="160px">Imagen</Th>
            <Th>Categoria</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {map(categories, (category, index) => (
            <Tr key={index}>
              <Td>
                <Image w="100px" h="60px" src={category.image} />
              </Td>
              <Td>{category.title}</Td>
              <Actions
                category={category}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Actions(props) {
  const { category, updateCategory, deleteCategory } = props;

  return (
    <Td>
      <Stack direction="row" spacing={2}>
        <IconButton
          aria-label="Edit"
          icon={<MdModeEditOutline />}
          onClick={() => updateCategory(category)}
        ></IconButton>
        <IconButton
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={() => deleteCategory(category)}
          colorScheme="red"
        ></IconButton>
      </Stack>
    </Td>
  );
}
