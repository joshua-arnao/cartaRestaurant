import React, { useState } from "react";
import { map } from "lodash";
import { ModalBasic } from "../../../Common";
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

export function TableTablesAdmin(props) {
  const { tables, updateTable, deleteTable } = props;
  return (
    <TableContainer my={8}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Mesa número</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {map(tables, (table, index) => (
            <Tr key={index}>
              <Td>{table.number}</Td>
              <Actions
                table={table}
                updateTable={updateTable}
                deleteTable={deleteTable}
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function Actions(props) {
  const { table, updateTable, deleteTable, showQr } = props;

  return (
    <Td>
      <Stack direction="row" spacing={2}>
        <IconButton
          aria-label="Edit"
          icon={<MdModeEditOutline />}
          onClick={() => updateTable(table)}
        ></IconButton>
        <IconButton
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={() => deleteTable(table)}
          colorScheme="red"
        ></IconButton>
      </Stack>
    </Td>
  );
}
