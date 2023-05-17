import { Navigate } from 'react-router-dom';
import Dashborad from './component/Dashborad';
import Google from './component/Google';
import Login from './component/Login';
import LoginpasswordChange from './component/LoginPasswordChange';
import Profile from './component/Profile';
import User from './component/User';

const routes = [

    { path: '/signin', element: <Login /> },
    { path: '/signup', element: <User /> },
    { path: '/dashborad', element: <Dashborad /> },
    { path: '/password', element: <LoginpasswordChange /> },
    { path: '/google', element: <Google /> },
    { path: '/profile', element: <Profile /> },
  
    { path: '/', element: <Navigate to="signup" /> },
    // { path: '*', element: <NotFound /> }
  ];
  export default routes;