// --------------------- V@6.3.0 ---------------------
// import { ClientLayout } from "../layouts";
// import { Home } from "../pages/Client";

// const routesClient = [
//   {
//     path: "/",
//     layout: ClientLayout,
//     component: Home,
//   },
// ];

// export default routesClient;

// --------------------- V@5.3.0 ---------------------
import { ClientLayout, ErrorLayout } from "../layouts";
import {
  SelectTable,
  Categories,
  Products,
  Cart,
  OrdersHistory,
} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: ErrorLayout,
    component: SelectTable,
    exact: true,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories,
    exact: true,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayout,
    component: Cart,
    exact: true,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: ClientLayout,
    component: OrdersHistory,
    exact: true,
  },
  {
    path: "/client/:tableNumber/:idCategory",
    layout: ClientLayout,
    component: Products,
    exact: true,
  },
];

export default routesClient;
