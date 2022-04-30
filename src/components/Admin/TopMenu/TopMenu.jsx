import React from "react";
import { MdLogout } from "react-icons/md";
import { Flex, Spacer, Box, ButtonGroup, IconButton } from "@chakra-ui/react";

import "./TopMenu.scss";

export function TopMenu() {
  return (
    <Box pos="fixed" w="100%" zIndex={1} boxShadow="base">
      <Flex minWidth="max-content" alignItems="center" gap="2" p="4">
        <Box>
          <h1>Top Menu</h1>
        </Box>
        <Spacer />
        <ButtonGroup gap="2" alignItems="center">
          <Box>
            <p>Hola, usuario...</p>
          </Box>
          <Spacer />
          <IconButton
            icon={<MdLogout />}
            variant="outline"
            size="md"
          ></IconButton>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}
