// --------------------- V@6.3.0 ---------------------
// import { AdminLayout } from "../layouts";
// import { LoginAdmin } from "../pages/Admin";

// const routesAdmin = [
//   {
//     path: "/admin",
//     layout: AdminLayout,
//     component: LoginAdmin,
//   },
// ];

// export default routesAdmin;

// --------------------- V@5.3.0 ---------------------
import { AdminLayout } from "../layouts";
import { HomeAdmin } from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
    exact: true,
  },
];

export default routesAdmin;
