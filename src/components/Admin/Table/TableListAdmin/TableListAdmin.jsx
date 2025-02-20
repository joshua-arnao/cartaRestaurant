import React, { useState, useEffect } from "react";
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
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <Wrap my={8} spacing="24px" justify="center">
      <Wrap width="90%">
        <Spacer />
        <HStack spacing="16px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="reload" mb="0">
              Reload Automatico
            </FormLabel>
            <Switch id="reload" onChange={onCheckAutoReload} />
          </FormControl>
          <IconButton
            colorScheme="teal"
            icon={<MdRefresh />}
            boxShadow="base"
            onClick={onReload}
          />
        </HStack>
      </Wrap>

      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </Wrap>
  );
}
