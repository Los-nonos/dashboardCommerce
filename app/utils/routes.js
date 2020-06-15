import Login from "@material-ui/icons/LockOpen";
import Settings from "@material-ui/icons/Settings";
import IconSearch from "@material-ui/icons/Search";
// core components/views for Admin layout
// import LoginPage from "../containers/Login/LoginPage";
import UserAccount from "../containers/UserAccount/UserAccount";
import ErrorPage from "../containers/Error/ErrorPage";
import SearchProducts from "../containers/Products/SearchProducts";
import Products from "../containers/Products/Products";

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
    icon: IconSearch,
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
  }
];

export default dashboardRoutes;
