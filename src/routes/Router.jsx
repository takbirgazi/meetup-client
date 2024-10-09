import { createBrowserRouter } from "react-router-dom";
import "./../App.css";
import Root from "./../layout/Root";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import Home from "./../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import Room from "../pages/Room/Room";
import Meeting from "../pages/Meeting/Meeting";
import MyPreJoin from "../components/MyPrejoin/MyPrejoin";
import Landing from "../pages/Landing/Landing";
import PrivateRoute from '../routes/PrivateRoute';
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Landing />
            },
            {
                path: "/logIn",
                element: <LogIn />,
            },
            {
                path: "/signUp",
                element: <SignUp />
            },
            {
                path: "/room/:id",
                element: <MyPreJoin><Meeting /></MyPreJoin>
            },
            {
                path: "/room",
                element: <Home />
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            }
        ]
    }
])

export default router;