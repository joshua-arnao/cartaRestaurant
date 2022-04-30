import React from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { map } from "lodash";

export function TableUsers(props) {
  const { users } = props;
  return (
    <TableContainer>
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
              <Td>{user.is_active}</Td>
              <Td>{user.is_staff}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
