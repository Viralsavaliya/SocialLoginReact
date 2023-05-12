import { Navigate } from 'react-router-dom';
import Dashborad from './component/Dashborad';
import Google from './component/Google';
import Login from './component/Login';
import User from './component/User';

const routes = [

    { path: '/signin', element: <Login /> },
    { path: '/signup', element: <User /> },
    { path: '/dashborad', element: <Dashborad /> },
    { path: '/google', element: <Google /> },
  
    { path: '/', element: <Navigate to="signup" /> },
    // { path: '*', element: <NotFound /> }
  ];
  export default routes;