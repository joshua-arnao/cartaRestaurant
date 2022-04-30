import React from "react";
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
} from "@chakra-ui/react";
import { map } from "lodash";
import {
  MdCheckCircle,
  MdCancel,
  MdModeEditOutline,
  MdDelete,
} from "react-icons/md";

export function TableUsers(props) {
  const { users } = props;

  return (
    <TableContainer my={8}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Nombre</Th>
            <Th>Apellidos</Th>
            <Th>Activo</Th>
            <Th>Staff</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {map(users, (user, index) => (
            <Tr key={index}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.first_name}</Td>
              <Td>{user.last_name}</Td>
              <Td justifyItems={"center"}>
                {user.is_active ? (
                  <Icon as={MdCheckCircle} color={"green"} />
                ) : (
                  <Icon as={MdCancel} color={"red"} />
                )}
              </Td>
              <Td justifyItems={"center"}>
                {user.is_staff ? (
                  <Icon as={MdCheckCircle} color={"green"} />
                ) : (
                  <Icon as={MdCancel} color={"red"} />
                )}
              </Td>
              <Actions user={user} />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Actions(props) {
  const { user } = props;

  return (
    <Td>
      <Stack direction="row" spacing={2}>
        <IconButton
          aria-label="Edit"
          icon={<MdModeEditOutline />}
          onClick={() => console.log(`Editar usuario ${user.email}`)}
        ></IconButton>
        <IconButton
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={() => console.log(`Eliminar ${user.email}`)}
          colorScheme="red"
        ></IconButton>
      </Stack>
    </Td>
  );
}
