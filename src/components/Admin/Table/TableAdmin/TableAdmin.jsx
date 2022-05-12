import React from "react";
import { WrapItem, Stack, Text, Center } from "@chakra-ui/react";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";

export function TableAdmin(props) {
  const { table } = props;

  return (
    <WrapItem>
      <Stack p={4}>
        <IcTable width="200px" height="120px" />
        <Center>
          <Text>Mesa {table.number}</Text>
        </Center>
      </Stack>
    </WrapItem>
  );
}
