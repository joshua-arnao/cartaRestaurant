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
import {
  OrdersAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: OrdersAdmin,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UsersAdmin,
    exact: true,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
    exact: true,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductAdmin,
    exact: true,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
    exact: true,
  },
];

export default routesAdmin;
