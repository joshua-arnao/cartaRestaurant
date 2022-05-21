import React, { useState, useEffect } from "react";
//import Select from "react-select";
import { map } from "lodash";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useProduct, useOrder } from "../../../hooks";
import {
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";

export function AddOrdersForm(props) {
  const { idTable, openCloseModal, onReloadOrders } = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts, getProductById } = useProduct();
  const { addOrderToTable } = useOrder();
  console.log("products -->", products);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(products));
  }, [products]);

  const handleSelectChange = (event) => {
    console.log("ID Producto Seleccionado -->", event.target.value);
    console.log(products);
    // const id = event.target.value;
    // //const productToAdd = products.find((prod) => prod.id === id);
    // |const listProducts = productsData;
    // listProducts.push(id);
    // setProductsData(id);

    setProductsData({
      ...productsData,
      //[event.target.name]: formik.setFieldValue([event.target.value]),
      //[event.target.name]: event.target.value,
      [event.target.name]: [...formik.values.products, event.target.value],
    });
    console.log("Array de Productos -->", event.target.name);
    console.log("productsData", productsData);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // for await (const idProduct of formValue.products) {
      //   await addOrderToTable(idTable, idProduct);
      console.log("creando pedidos");
      console.log("formValue", formValue);
    },

    // onReloadOrders();
    // openCloseModal();
    // console.log("Creando Pedidos");
    // console.log(formValue);
    //},
  });

  // useEffect(() => {
  //   addProductList();
  // }, [formik.values]);

  // const addProductList = async () => {
  //   try {
  //     const productsId = formik.values.products;

  //     const arrayTemp = [];
  //     for await (const idProduct of productsId) {
  //       console.log(idProduct);
  //       const response = await getProductById(idProduct);
  //       arrayTemp.push(response);
  //     }
  //     setProductsData(arrayTemp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Formik validateOnChange={false}>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody p={0}>
          <FormControl>
            <FormLabel>Producto</FormLabel>
            <Select
              placeholder="Producto"
              value={formik.values.id}
              name="products"
              onClick={handleSelectChange}
            >
              {productsFormat.map((data) => (
                <option key={data.text} data={data} value={data.value}>
                  {data.text}
                </option>
              ))}
            </Select>

            {/* <div>
              {map(productsData, (product, index) => (
                <div key={index}>
                  <div>
                    <span>{product.title}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </FormControl>
        </ModalBody>
        <ModalFooter px={0} mt={6}>
          <Box w="100%">
            <Button
              type="submit"
              isFullWidth
              colorScheme="teal"
              onClick={handleSelectChange}
            >
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
