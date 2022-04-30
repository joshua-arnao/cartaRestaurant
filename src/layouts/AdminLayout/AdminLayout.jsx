import React from "react";
import { LoginAdmin } from "../../pages/Admin";
import { useAuth } from "../../hooks";
import { Grid, GridItem } from "@chakra-ui/react";
import { TopMenu, SideMenu } from "../../components/Admin";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth();

  if (!auth) return <LoginAdmin />;

  return (
    <Grid
      w="100%"
      minH="100vh"
      templateRows="repeat(2, 1fr)"
      className="admin-layout"
      gridTemplateRows={{
        md: "72px 1fr",
      }}
      gridTemplateAreas={{
        md: `'TopMenu' 'Content'`,
      }}
      gap={0}
    >
      <GridItem gridArea="TopMenu" height="55px" className="admin-layout__menu">
        <TopMenu />
      </GridItem>

      <GridItem gridArea="Content" className="admin-layout__main-content">
        <SideMenu>{children}</SideMenu>
      </GridItem>
    </Grid>
  );
}
