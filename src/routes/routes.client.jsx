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
import { ErrorLayout } from "../layouts";
import { SelectTable } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: ErrorLayout,
    component: SelectTable,
    exact: true,
  },
];

export default routesClient;
