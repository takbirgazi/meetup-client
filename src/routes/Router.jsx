import { createBrowserRouter } from "react-router-dom";
import "./../App.css";
import Root from "./../layout/Root";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import Home from "./../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import Landing from "../pages/Landing/Landing";
import PrivateRoute from '../routes/PrivateRoute';
import Dashboard from "../pages/Dashboard/Dashboard";
import Contact from "../pages/Landing/LandingComponents/FaqSection/ContactUs/Contact";
import General from "../pages/Dashboard/DashboardComponents/General/General";
import Meetings from "../pages/Dashboard/DashboardComponents/Meetings/Meetings";
import Support from "../pages/Dashboard/DashboardComponents/Support/Support";
import Profile from "../pages/Dashboard/DashboardComponents/Profile/Profile";
import ChangePassword from "../pages/Dashboard/DashboardComponents/ChangePassword/ChangePassword";
import Meeting from "../pages/Meeting/MeetingWithStremio"; // Meeting With Stremio 
import ToDoApp from "../pages/Dashboard/DashboardComponents/General/GeneralComponents/ToDoList/ToDoApp";
// import Meeting from "../pages/Meeting/MeetingWithLiveKit";
// import MyPreJoin from "../components/MyPrejoin/MyPrejoin";
// import Meeting from '../pages/Meeting/MeetingWithZegoCloud';

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
            // {
            //     path: "/room/:id", // meeting with LiveKit
            //     element: <MyPreJoin><Meeting /></MyPreJoin>
            // },
            // {
            //     path: "/room/:id", // Meeting with ZegoCloud
            //     element: <PrivateRoute><Meeting /></PrivateRoute>
            // },
            {
                path: "/room/:id", // Meeting With Stremio
                element: <Meeting />
            },
            {
                path: "/room",
                element: <PrivateRoute><Home /></PrivateRoute>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                children: [
                    {
                        path: "",
                        element: <General />,
                    },
                    {
                        path: "meetings",
                        element: <Meetings />,
                    },
                    {
                        path: "support",
                        element: <Support />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                    {
                        path: "ToDoApp",
                        element: <ToDoApp></ToDoApp>,
                    }
                ]
            },
        ]
    }
])

export default router;