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
import { ClientLayout } from "../layouts";
import { Home } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
    exact: true,
  },
];

export default routesClient;
