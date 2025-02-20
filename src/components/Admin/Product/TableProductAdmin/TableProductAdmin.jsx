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
  Icon,
  IconButton,
  Stack,
  Image,
} from "@chakra-ui/react";
import {
  MdCheckCircle,
  MdCancel,
  MdModeEditOutline,
  MdDelete,
} from "react-icons/md";

export function TableProductAdmin(props) {
  const { products, updateProduct, deleteProduct } = props;
  // console.log(products);
  return (
    <TableContainer my={8}>
      <Table>
        <Thead>
          <Tr>
            <Th>Imagen</Th>
            <Th>Producto</Th>
            <Th>Precio</Th>
            <Th>Categoria</Th>
            <Th>Activo</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {map(products, (product, index) => (
            <Tr key={index}>
              <Td>
                <Image src={product.image} boxSize="100px" width="150px" />
              </Td>
              <Td>{product.title}</Td>
              <Td>{product.price} $</Td>
              <Td>{product.category_data.title}</Td>
              <Td>
                {product.active ? (
                  <Icon as={MdCheckCircle} color={"green"} />
                ) : (
                  <Icon as={MdCancel} color={"red"} />
                )}
              </Td>

              <Actions
                product={product}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Actions(props) {
  const { product, updateProduct, deleteProduct } = props;

  return (
    <Td>
      <Stack direction="row" spacing={2}>
        <IconButton
          aria-label="Edit"
          icon={<MdModeEditOutline />}
          onClick={() => updateProduct(product)}
        ></IconButton>
        <IconButton
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={() => deleteProduct(product)}
          colorScheme="red"
        ></IconButton>
      </Stack>
    </Td>
  );
}
