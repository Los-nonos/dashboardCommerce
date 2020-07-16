import Login from "@material-ui/icons/LockOpen";
import Settings from "@material-ui/icons/Settings";
import IconSearch from "@material-ui/icons/Search";
import {
  BusinessCenterSharp,
  Category,
  Dashboard,
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

const dashboardRoutes = [
  {
    path: "/user-account",
    name: "User account",
    icon: Settings,
    component: UserAccount,
    layout: "/dashboard",
    rol: ""
  },
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
  }
];

export default dashboardRoutes;
