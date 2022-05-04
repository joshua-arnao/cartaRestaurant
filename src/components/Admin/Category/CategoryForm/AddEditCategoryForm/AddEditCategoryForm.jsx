import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useCategory } from "../../../../../hooks";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    //await formik.values.file;
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
    console.log(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalBody p={0}>
        <FormControl>
          <FormLabel>Categoria</FormLabel>
          <Input
            name="title"
            placeholder="Nombre de la categoria"
            value={formik.values.title}
            onChange={formik.handleChange}
            isInvalid={formik.errors.title}
          />
        </FormControl>

        <Button
          type="button"
          name="image"
          variant="solid"
          isFullWidth
          mt={2}
          //isChecked={formik.values.image}
          //onChange={formik.handleChange}
          //isInvalid={formik.errors.image}
          colorScheme={formik.errors.image && "red"}
          {...getRootProps()}
        >
          {previewImage ? "Cambiar Imagen" : "Seleccionar Imagen"}
        </Button>

        <Box w="100%" mt={4}>
          <input {...getInputProps()} />
          <Image src={previewImage} fullwidth w="100%" h="250px" />
        </Box>
      </ModalBody>
      <ModalFooter px={0} mt={6}>
        <Box w="100%">
          <Button type="submit" isFullWidth colorScheme="teal">
            {category ? "Actualizar" : "Crear"}
          </Button>
        </Box>
      </ModalFooter>
    </form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
