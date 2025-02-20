import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useTable } from "../../hooks";
import {
  Flex,
  Spacer,
  Grid,
  Box,
  Text,
  ChakraProvider,
  IconButton,
  Center,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { MdShoppingCart, MdList, MdLogin } from "react-icons/md";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  //console.log(useParams());
  const { tableNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      //console.log(exist);
      if (!exist) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    history.push("/");
  };

  const goToCaart = () => {
    history.push(`/client/${tableNumber}/cart`);
  };

  const goToOrder = () => {
    history.push(`/client/${tableNumber}/orders`);
  };
  return (
    <ChakraProvider>
      <Grid
        minH="100vh"
        w="full"
        gridTemplateColumns={{
          base: "1fr",
          md: "1fr ",
        }}
        gridTemplateRows={{
          base: `4rem 1fr`,
          md: "6rem 1fr",
        }}
        gridTemplateAreas={{
          base: `'nav'  'main'`,
          md: `'nav ' ' main ' ' footer '`,
        }}
        gap={0}
        //p={2}
      >
        <Box
          as="nav"
          gridArea="nav"
          //bg="orange.200"
          px={{ base: "12px", md: "12px" }}
          py={{ base: "12px", md: "16px" }}
          alignItems="center"
        >
          <Flex alignItems="center">
            <HStack>
              <Link to={`/client/${tableNumber}`}>
                <Text fontSize={{ base: "2xl", md: "3xl" }}>LOGO</Text>
              </Link>
              <Text fontSize="xs">Mesa {tableNumber}</Text>
            </HStack>
            <Spacer />
            <HStack alignItems="center">
              <IconButton
                aria-label="Search database"
                icon={<MdShoppingCart />}
                onClick={goToCaart}
              />
              <IconButton
                aria-label="Search database"
                icon={<MdList />}
                onClick={goToOrder}
              />
              <IconButton
                aria-label="Search database"
                icon={<MdLogin />}
                onClick={closeTable}
              />
            </HStack>
          </Flex>
        </Box>
        {/* <Box as="nav" gridArea="nav" bg="orange.300">
          nav
        </Box> */}
        {/* <Box gridArea="leftbar" bg="red.500">
          leftbar
        </Box> */}
        <Box
          gridArea="main"
          flex="1"
          //bg="red.900"
        >
          {children}
        </Box>
      </Grid>
    </ChakraProvider>
  );
}
