import React, {
    lazy
} from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
const PublicPage = Loadable(lazy(() => import("./PublicPage")));
const MainPage = Loadable(lazy(() => import("./MainPage")));

const sessionRoutes = [{
        path: '/session/signup',
        element: < JwtRegister / > ,
    },
    {
        path: '/session/signin',
        element: < JwtLogin / > ,
    },
    {
        path: '/session/forgot-password',
        element: < ForgotPassword / > ,
    },
    {
        path: '/session/404',
        element: < NotFound / > ,
    },
    {
        path: '/prints/public/:id',
        element: < PublicPage / >
    },
    {
        path: '/main',
        element: < MainPage / > ,
    },
]

export default sessionRoutes