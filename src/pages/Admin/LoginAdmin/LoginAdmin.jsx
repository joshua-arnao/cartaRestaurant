import React from "react";
import { LoginForm } from "../../../components/Admin";
import "./LoginAdmin.scss";

import { Box, Text } from "@chakra-ui/react";

export function LoginAdmin() {
  return (
    <Box
      w="100%"
      h="100vh"
      bgGradient="linear(to-br, rgba(34,193,195,1), rgba(253,187,45,1))"
      display="flex"
      alignItems="center"
      className="login-admin"
    >
      <Box
        boxSize="sm"
        p={6}
        className="login-adimn__Content"
        bg="white"
        boxShadow="2xl"
        rounded="xl"
      >
        <Text textAlign={"center"} fontSize={32} mb={2}>
          Entrar al panel
        </Text>
        <LoginForm />
      </Box>
    </Box>
  );
}
