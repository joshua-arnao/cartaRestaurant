import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Switch,
  Button,
  Checkbox,
} from "@chakra-ui/react";

export function AddEditUserForm(props) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log("Formulario enviado");
      console.log(formValue);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Usuario</FormLabel>
          <Input
            name="username"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={formik.errors.username}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Correo electronico</FormLabel>
          <Input
            name="email"
            placeholder="Correo electronico"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={formik.errors.email}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="first_name"
            placeholder="Nombre"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.first_name}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Apellido</FormLabel>
          <Input
            name="last_name"
            placeholder="Apellido"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.last_name}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={formik.errors.password}
          />
        </FormControl>

        <FormControl as={SimpleGrid} columns={2} mt={2}>
          <FormLabel htmlFor="isInvalid">Usuario Activo:</FormLabel>
          <Switch
            name="is_active"
            isChecked={formik.values.is_active}
            //onChange={(_, data) => console.log(data)}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl as={SimpleGrid} columns={2} mt={2}>
          <FormLabel htmlFor="isInvalid">Usuario Administrador:</FormLabel>
          <Switch
            name="is_staff"
            isChecked={formik.values.is_staff}
            //onChange={(_, data) => console.log(data)}
            onChange={formik.handleChange}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" colorScheme="blue" mr={3}>
          Crear
        </Button>
        <Button>Cancel</Button>
      </ModalFooter>
    </form>
  );
}

function initialValues() {
  return {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    is_active: true,
    is_staff: false,
  };
}

function newSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().isTrue(true).required(true),
    is_staff: Yup.bool().required(true),
  };
}
