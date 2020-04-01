import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import LoginPage from "../pages/LoginPage/Index.jsx";
import SignUpPage from "../pages/SignUpPage/Index";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login Page",
    icon: Login,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/signup",
    name: "SignUp Page",
    icon: Login,
    component: SignUpPage,
    layout: "/auth"
  }
];

export default dashboardRoutes;
