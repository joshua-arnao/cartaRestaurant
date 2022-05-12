import React from "react";
import { map, size } from "lodash";
import {
  Wrap,
  FormControl,
  FormLabel,
  Spacer,
  Switch,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import { TableAdmin } from "../";

export function TableListAdmin(props) {
  const { tables } = props;
  return (
    <Wrap my={8} spacing="24px" justify="center">
      <Wrap width="90%">
        <Spacer />
        <HStack spacing="16px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="reload" mb="0">
              Reload Automatico
            </FormLabel>
            <Switch
              id="reload"
              onChange={(_, data) => console.log(data.checked)}
            />
          </FormControl>
          <IconButton
            colorScheme="teal"
            icon={<MdRefresh />}
            boxShadow="base"
            onClick={() => console.log("onRefetch")}
          />
        </HStack>
      </Wrap>

      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </Wrap>
  );
}
