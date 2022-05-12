import React from "react";
import { map, size } from "lodash";
import { Wrap } from "@chakra-ui/react";
import { TableAdmin } from "../";

export function TableListAdmin(props) {
  const { tables } = props;
  return (
    <Wrap my={8} spacing="24px" justify="center">
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </Wrap>
  );
}
