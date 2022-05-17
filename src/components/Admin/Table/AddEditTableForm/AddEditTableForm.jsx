import React, { useState } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();
  const [buttonActive, setButtonActive] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (table) await updateTable(table.id, formValue);
      else await addTable(formValue);

      onRefetch();
      onClose();
    },
  });

  // const [checkChangeInput, setCheckChangeInput] = useState();

  // const handleChangeCheckInput = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <Formik validateOnChange={false}>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody p={0}>
          <FormControl isRequired>
            <FormLabel>Numero de mesa</FormLabel>
            <Input
              name="number"
              placeholder="Numero de mesa"
              value={formik.values.number}
              //onChange={formik.handleChange}
              onChange={(data) => console.log(data)}
              isInvalid={formik.errors.number}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter px={0} mt={6}>
          <Box w="100%">
            <Button
              type="submit"
              isFullWidth
              colorScheme="teal"
              //isDisabled={!buttonActive}
            >
              {table ? "Actualizar" : "Crear"}
            </Button>
          </Box>
        </ModalFooter>
      </form>
    </Formik>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
  };
}
