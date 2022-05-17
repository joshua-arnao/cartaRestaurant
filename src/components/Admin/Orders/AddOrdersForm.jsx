import React, { useState, useEffect } from "react";
//import Select from "react-select";
import { map } from "lodash";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";
import { useProduct, useOrder } from "../../../hooks";

export function AddOrdersForm(props) {
  const { idTable, openCloseModal, onReloadOrders } = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts, getProductById } = useProduct();
  const { addOrderToTable } = useOrder();
  console.log("productos -->", productsFormat.value);
  //console.log(productsFormat);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(products));
  }, [products]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.products) {
        await addOrderToTable(idTable, idProduct);
      }

      onReloadOrders();
      openCloseModal();
      console.log("Creando Pedidos");
      console.log(formValue);
    },
  });

  useEffect(() => {
    addProductList();
  }, [formik.values]);

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;

      const arrayTemp = [];
      for await (const idProduct of productsId) {
        console.log(idProduct);
        const response = await getProductById(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      console.log(error);
    }
  };

  // const [value, setValue] = useState(null);
  // const handleSelectChange = (value) => {
  //   console.log("VALORES ---->", value);
  //   setValue(value);
  // };

  return (
    <Formik validateOnChange={false} initialValues={initialValues()}>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody p={0}>
          <FormControl>
            <FormLabel>Producto</FormLabel>
            <Select
              placeholder="Producto"
              id={products}
              value={formik.values.id}
              //onChange={formik.handleChange}
              onChange={formik.handleChange}
            >
              {productsFormat.map((data) => (
                <option key={data.text} data={data} value={data.value}>
                  {data.text}
                </option>
              ))}
            </Select>

            <div>
              {map(productsData, (product, index) => (
                <div key={index}>
                  <div>
                    <span>{product.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          {/* <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              isMulti
              options={productsFormat}
              name="productsFormat"
              placeholder="Productos"
              value={value}
              // onChange={(data) =>
              //   formik.setFieldValue("products", [
              //     ...formik.values.products,
              //     data.value,
              //   ])
              // }
              // onChange={handleSelectChange}
              //   value={formik.values.title}
              // onChange={formik.handleChange}
              //   isInvalid={formik.errors.title}
            />
            {productsFormat.map((data) => (
                <option key={data.text} data={data}>
                  {data.text}
                </option>
              ))}
            </Select>
          </FormControl> */}
        </ModalBody>
        <ModalFooter px={0} mt={6}>
          <Box w="100%">
            <Button type="submit" isFullWidth colorScheme="teal">
              Crear
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

function initialValues() {
  return {
    products: [],
  };
}

function validationSchema() {
  return {
    products: Yup.array().required(true),
  };
}
