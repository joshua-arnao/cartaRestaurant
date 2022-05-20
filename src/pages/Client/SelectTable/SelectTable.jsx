import React, { useState, Fragment } from "react";
import { useTable } from "../../../hooks";
import {
  Center,
  Stack,
  Text,
  FormControl,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

export function SelectTable(props) {
  const { history } = props;
  const [tableNum, setTableNum] = useState({
    numberTable: "",
  });
  console.log("N° mesa -->", tableNum);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setTableNum({
      ...tableNum,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    console.log("click");
    console.log("array -->", Object.entries(tableNum).pop());
    setError(null);
    if (!tableNum.numberTable) {
      setError("No Registro ninguna mesa");
    } else {
      console.log("Entrando...");
      const exist = await isExistTable(tableNum.numberTable);
      if (exist) history.push(`/client/${tableNum.numberTable}`);
      else setError("El numero de la mesa no existe");
    }
  };

  return (
    <Center height="100vh" bgGradient="linear(to-r, green.200, pink.500)">
      <Stack
        bg="white"
        rounded="2xl"
        boxShadow="md"
        px={{ base: "8", lg: "16" }}
        py={10}
        textAlign="center"
        width={{ base: "360px", lg: "462px" }}
      >
        <Text fontSize="3xl">Bienvenido al Restaurante</Text>
        <Text fontSize="xl">Ingresa el número de tu mesa</Text>
        <Fragment>
          <form onSubmit={onSubmit}>
            <FormControl my={4}>
              <VStack spacing={2}>
                <Input
                  placeholder="Ejemplo: 1, 2, 4, 12"
                  type="number"
                  name="numberTable"
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  onClick={onSubmit}
                  isFullWidth
                  color="white"
                  fontWeight="bold"
                  borderRadius="md"
                  bgGradient="linear(to-r, teal.500, #22c1c3)"
                  _hover={{
                    bgGradient: "linear(to-r, #22c1c3, #fdbb2d)",
                  }}
                >
                  Entrar
                </Button>
                <Text color="tomato">{error}</Text>
              </VStack>
            </FormControl>
          </form>
        </Fragment>
      </Stack>
    </Center>
  );
}
