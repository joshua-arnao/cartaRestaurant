// --------------------- V@6.3.0 y V@5.0.2 ---------------------
import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { Error404 } from "../pages";
import { ErrorLayout } from "../layouts";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    layout: ErrorLayout,
    component: Error404,
  },
];

export default routes;
