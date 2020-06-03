import Login from "@material-ui/icons/LockOpen";
import Settings from '@material-ui/icons/Settings';

// core components/views for Admin layout
// import LoginPage from "../containers/Login/LoginPage";
import UserAccount from "../containers/UserAccount/UserAccount";
import ErrorPage from "../containers/Error/ErrorPage";

const dashboardRoutes = [
  {
    path: '/user-account',
    name: 'User account',
    icon: Settings,
    component: UserAccount,
    layout: '/dashboard',
    rol: '',
  },
  /*{
    path: '/login',
    name: 'Logout',
    icon: Login,
    component: ErrorPage,
    layout: '/auth',
    rol: '',
  },*/
  {
    path: '/error',
    name: 'Error',
    icon: Login,
    component: ErrorPage,
    layout: '/auth',
    rol: '',
  },
];

export default dashboardRoutes;
