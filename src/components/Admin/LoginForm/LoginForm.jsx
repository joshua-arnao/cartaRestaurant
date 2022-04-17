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
  FormErrorMessage,
} from "@chakra-ui/react";
import "./LoginForm.scss";

export function LoginForm() {
  // const formik = useFormik({
  //   initialValues: initialValues(),
  //   onSubmit: (formValue) => {
  //     console.log("Login OK");
  //     console.log(formValue);
  //   },
  // });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formValue) => {
      console.log("Login OK");
      console.log(formValue);
    },
  });
  return (
    <Flex align="center" justify="center" h="">
      <Box p={4}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="email">Correo:</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {/* <FormErrorMessage>Error</FormErrorMessage> */}
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <FormLabel htmlFor="password">Constraseña:</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {/* <<FormErrorMessage>Error</FormErrorMessage> */}
            </FormControl>
            <Button type="submit" colorScheme="purple" isFullWidth>
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

function initialValues() {
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
