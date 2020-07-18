import Login from "@material-ui/icons/LockOpen";
import Settings from "@material-ui/icons/Settings";
import IconSearch from "@material-ui/icons/Search";
import {
  AttachMoney,
  BusinessCenterSharp,
  Category,
  Dashboard,
  LocalShipping,
  People,
  Person
} from "@material-ui/icons";

// core components/views for Admin layout
// import LoginPage from "../containers/Login/LoginPage";
import UserAccount from "../containers/UserAccount/UserAccount";
import ErrorPage from "../containers/Error/ErrorPage";
import SearchProducts from "../containers/Products/SearchProducts";
import Products from "../containers/Products/Products";
import Employees from "../containers/Users/Employees";
import Categories from "../containers/Categories/Categories";
import Brands from "../containers/Brands/Brands";
import Customers from "../containers/Customers/Customers";
import Orders from "../containers/Orders/Orders";
import Providers from "../containers/Providers/Providers";

const dashboardRoutes = [
  {
    path: "/search",
    name: "BUSCADOR",
    icon: IconSearch,
    component: SearchProducts,
    layout: "/dashboard",
    rol: "sales"
  },
  {
    path: "/products",
    name: "PRODUCTOS",
    icon: Dashboard,
    component: Products,
    layout: "/dashboard",
    rol: "sales"
  },
  {
    path: "/error",
    name: "Error",
    icon: Login,
    component: ErrorPage,
    layout: "/auth",
    rol: ""
  },
  {
    path: "/employees",
    name: "EMPLEADOS",
    icon: Person,
    component: Employees,
    layout: "/dashboard",
    rol: "admin"
  },
  {
    path: "/categories",
    name: "CATEGORIES",
    icon: Category,
    component: Categories,
    layout: "/dashboard",
    rol: "admin"
  },
  {
    path: "/brands",
    name: "MARCAS",
    icon: BusinessCenterSharp,
    component: Brands,
    layout: "/dashboard",
    rol: "admin"
  },
  {
    path: "/customers",
    name: "CLIENTES",
    icon: People,
    component: Customers,
    layout: "/dashboard",
    rol: "sales"
  },
  {
    path: "/orders",
    name: "COMPRAS",
    icon: AttachMoney,
    component: Orders,
    layout: "/dashboard",
    rol: "sales"
  },
  {
    path: "/providers",
    name: "PROVEEDORES",
    icon: LocalShipping,
    component: Providers,
    layout: "/dashboard",
    rol: "deposits"
  },
  {
    path: "/user-account",
    name: "CUENTA",
    icon: Settings,
    component: UserAccount,
    layout: "/dashboard",
    rol: ""
  }
];

export default dashboardRoutes;
