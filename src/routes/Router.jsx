import { createBrowserRouter } from "react-router-dom";
import "./../App.css";
import Root from "./../layout/Root";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import Home from "./../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import Room from "../pages/Room/Room";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
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
                element: <Room />
            },
        ]
    }
])

export default router;