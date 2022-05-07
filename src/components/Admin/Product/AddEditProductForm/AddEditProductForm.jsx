import React, { useState, useEffect, useCallback } from "react";
import { useFormik, Formik } from "formik";
import { useCategory, useProduct } from "../../../../hooks";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import * as Yup from "yup";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props;
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );

  const { categories, getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(categories);
  // console.log(categoriesFormat);

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      //await addProduct(formValue);
      if (product) await updateProduct(product.id, formValue);
      else await addProduct(formValue);

      onRefetch();
      onClose();
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
    <Formik validateOnChange={false}>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody p={0}>
          <FormControl>
            <FormLabel>Nombre del Producto</FormLabel>
            <Input
              name="title"
              placeholder="Nombre del producto"
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={formik.errors.title}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Precio</FormLabel>
            <Input
              name="price"
              placeholder="Precio"
              value={formik.values.price}
              onChange={formik.handleChange}
              isInvalid={formik.errors.title}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel htmlFor="categoria">Categoria</FormLabel>

            <Select
              name="category"
              placeholder="Categoria"
              value={formik.values.category}
              isInvalid={formik.errors.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {categoriesFormat.map((data) => (
                <option key={data.category} data={data} value={data.value}>
                  {data.text}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl as={SimpleGrid} columns={2} mt={4}>
            <FormLabel htmlFor="isInvalid">Producto Activo:</FormLabel>
            <Switch
              name="active"
              isChecked={formik.values.active}
              onChange={formik.handleChange}
              isInvalid={formik.errors.active}
              colorScheme="teal"
            />
          </FormControl>

          <Button
            type="button"
            name="image"
            variant="solid"
            isFullWidth
            mt={2}
            colorScheme={formik.errors.image && "red"}
            {...getRootProps()}
          >
            {previewImage ? "Cambiar Imagen" : "Seleccionar Imagen"}
          </Button>
          <Box w="100%" mt={4}>
            <input {...getInputProps()} />
            <Image src={previewImage} fullwidth w="100%" h="200px" />
          </Box>
        </ModalBody>

        <ModalFooter px={0} mt={6}>
          <Box w="100%">
            <Button type="submit" isFullWidth colorScheme="teal">
              {product ? "Actualizar Producto" : "Crear Producto"}
            </Button>
          </Box>
        </ModalFooter>
      </form>
    </Formik>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}
