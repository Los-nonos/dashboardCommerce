import Login from "@material-ui/icons/LockOpen";
import Settings from '@material-ui/icons/Settings';
// core components/views for Admin layout
import LoginPage from "../containers/Login/LoginPage.jsx";

const dashboardRoutes = [
  {
    path: '/user-account',
    name: 'User account',
    icon: Settings,
    component: UserAccount,
    layout: '/dashboard-website',
    rol: 'headhunter',
  },
  {
    path: '/login-page',
    name: 'Logout',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
    rol: 'headhunter',
  },
  {
    path: '/error',
    name: 'Error',
    icon: Login,
    component: ErrorPage,
    layout: '/auth',
    rol: '',
  }

];

export default dashboardRoutes;
