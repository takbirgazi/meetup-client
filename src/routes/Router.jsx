import { createBrowserRouter } from "react-router-dom";
import "./../App.css";
import Root from "./../layout/Root";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import Home from "./../pages/Home/Home";

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
                element: <div>This is log in page</div>
            },
            {
                path: "/signUp",
                element: <div>This is Sign Up page</div>
            },
            {
                path: "/room/:id",
                element: <div>This is Room page</div>
            },
        ]
    }
])

export default router;