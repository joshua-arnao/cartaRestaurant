import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import "./LoginForm.scss";

export function LoginForm() {
  return (
    <Flex align="center" justify="center" h="">
      <Box bg="white" p={6} rounded="md">
        <form>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                // onChange={formik.handleChange}
                // value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                // onChange={formik.handleChange}
                // value={formik.values.password}
              />
            </FormControl>
            <Button type="submit" colorScheme="purple" isFullWidth mt={8}>
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

function intialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
