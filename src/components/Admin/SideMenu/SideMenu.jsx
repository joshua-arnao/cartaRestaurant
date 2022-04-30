import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Spacer,
  Text,
  Icon,
  List,
} from "@chakra-ui/react";
import {
  MdHome,
  MdTableChart,
  MdOutlineHistory,
  MdFolder,
  MdShoppingCart,
  MdSupervisorAccount,
} from "react-icons/md";

export function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();
  //console.log(pathname);

  return (
    <Grid
      w="full"
      gridTemplateColumns={{
        md: "15rem 1fr",
      }}
      gridTemplateAreas={{
        md: `'SideMenu Main'`,
      }}
    >
      <GridItem gridArea="SideMenu">
        <MenuLeft pathname={pathname} />
      </GridItem>
      <GridItem gridArea="Main">
        <div>{children}</div>
      </GridItem>
    </Grid>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const { auth } = useAuth();
  //console.log(pathname === "/admin");
  console.log(useAuth());
  return (
    <Box pos="fixed" w="15rem" boxShadow="xs" minH="100vh">
      <List my={4}>
        <Flex
          alignItems="center"
          p={4}
          as={Link}
          to={"/admin"}
          bg={pathname === "/admin" ? "#bdbd" : "none"}
        >
          <Icon mr={4} as={MdHome} />
          <Text>Pedidos</Text>
          <Spacer />
        </Flex>

        <Flex
          alignItems="center"
          p={4}
          as={Link}
          to={"/admin/table"}
          bg={pathname === "/admin/table" ? "#bdbd" : "none"}
        >
          <Icon mr={4} as={MdTableChart} />
          <Text>Mesas</Text>
          <Spacer />
        </Flex>

        <Flex
          alignItems="center"
          p={4}
          as={Link}
          to={"/admin/payments-history"}
          bg={pathname === "/admin/payments-history" ? "#bdbd" : "none"}
        >
          <Icon mr={4} as={MdOutlineHistory} />
          <Text>Historial de Pagos</Text>
          <Spacer />
        </Flex>

        <Flex
          alignItems="center"
          p={4}
          as={Link}
          to={"/admin/categories"}
          bg={pathname === "/admin/categories" ? "#bdbd" : "none"}
        >
          <Icon mr={4} as={MdFolder} />
          <Text>Categorias</Text>
          <Spacer />
        </Flex>

        <Flex
          alignItems="center"
          p={4}
          as={Link}
          to={"/admin/products"}
          bg={pathname === "/admin/products" ? "#bdbd" : "none"}
        >
          <Icon mr={4} as={MdShoppingCart} />
          <Text>Productos</Text>
          <Spacer />
        </Flex>

        {auth.me?.is_staff && (
          <Flex
            alignItems="center"
            p={4}
            as={Link}
            to={"/admin/users"}
            bg={pathname === "/admin/users" ? "#bdbd" : "none"}
          >
            <Icon mr={4} as={MdSupervisorAccount} />
            <Text>Usuarios</Text>
            <Spacer />
          </Flex>
        )}
      </List>
    </Box>
  );
}
