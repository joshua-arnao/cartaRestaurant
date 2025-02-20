import React, { useState } from "react";
import { map } from "lodash";
import QRCode from "qrcode.react";
import { ModalBasic } from "../../../Common";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Center,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { MdModeEditOutline, MdDelete, MdQrCode2 } from "react-icons/md";

export function TableTablesAdmin(props) {
  const { tables, updateTable, deleteTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showQr = (table) => {
    //console.log(`${window.location.origin}/client/${table.number}`);
    setContentModal(
      <Center>
        <QRCode value={`${window.location.origin}/client/${table.number}`} />
      </Center>
    );

    openCloseModal();
  };

  return (
    <>
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
                  showQr={showQr}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Código QR"
        children={contentModal}
      />
    </>
  );
}

function Actions(props) {
  const { table, updateTable, deleteTable, showQr } = props;

  return (
    <Td>
      <Stack direction="row" spacing={2}>
        <IconButton
          aria-label="Edit"
          icon={<MdQrCode2 />}
          onClick={() => showQr(table)}
        ></IconButton>
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
