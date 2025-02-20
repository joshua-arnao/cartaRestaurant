import React from "react";
import { MdLogout } from "react-icons/md";
import {
  Grid,
  Flex,
  Spacer,
  Box,
  Text,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "../../../hooks";
import "./TopMenu.scss";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    }
    return auth.me?.email;
  };

  return (
    <Grid pos="fixed" w="100%" zIndex="banner" boxShadow="base" bg="#A5BE7F">
      <Flex minWidth="max-content" alignItems="center" gap="2" p="4">
        <Box>
          <Text fontSize="3xl" color="white">
            Restaurante
          </Text>
        </Box>
        <Spacer />
        <ButtonGroup gap="2" alignItems="center">
          <Box>
            <p>Hola, {renderName()}</p>
          </Box>
          <Spacer />
          <IconButton
            icon={<MdLogout />}
            variant="outline"
            size="md"
            onClick={logout}
          ></IconButton>
        </ButtonGroup>
      </Flex>
    </Grid>
  );
}
