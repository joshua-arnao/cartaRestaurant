import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Switch,
  Button,
} from "@chakra-ui/react";

export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props;

  const { addUser, updateUser } = useUser();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue);
        else await addUser(formValue);

        onRefetch();
        onClose();
        console.log("Usuario creado correctamente");
      } catch (error) {
        console.error(error);
      }
      // console.log("Formulario enviado");
      // console.log(formValue);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalBody>
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

        <FormControl mt={2}>
          <FormLabel>Correo electronico</FormLabel>
          <Input
            name="email"
            placeholder="Correo electronico"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={formik.errors.email}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="first_name"
            placeholder="Nombre"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.first_name}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Apellido</FormLabel>
          <Input
            name="last_name"
            placeholder="Apellido"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.last_name}
          />
        </FormControl>

        <FormControl mt={2} mb={6}>
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

        <FormControl as={SimpleGrid} columns={2}>
          <FormLabel htmlFor="isInvalid">Usuario Activo:</FormLabel>
          <Switch
            name="is_active"
            isChecked={formik.values.is_active}
            //onChange={(_, data) => console.log(data)}
            onChange={formik.handleChange}
            colorScheme="teal"
          />
        </FormControl>

        <FormControl as={SimpleGrid} columns={2}>
          <FormLabel htmlFor="isInvalid">Usuario Administrador:</FormLabel>
          <Switch
            name="is_staff"
            isChecked={formik.values.is_staff}
            //onChange={(_, data) => console.log(data)}
            onChange={formik.handleChange}
            colorScheme="teal"
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" isFullWidth colorScheme="teal">
          {user ? "Actualizar" : "Crear"}
        </Button>
      </ModalFooter>
    </form>
  );
}

function initialValues(data) {
  return {
    username: data?.username || "",
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    password: "",
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
  };
}

function newSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}

function updateSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}
