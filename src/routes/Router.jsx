import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import ChangePassword from "../pages/Dashboard/DashboardComponents/ChangePassword/ChangePassword";
import ToDoApp from "../pages/Dashboard/DashboardComponents/General/GeneralComponents/ToDoList/ToDoApp";
import Meetings from "../pages/Dashboard/DashboardComponents/Meetings/Meetings";
import Profile from "../pages/Dashboard/DashboardComponents/Profile/Profile";
import Support from "../pages/Dashboard/DashboardComponents/Support/Support";
import Landing from "../pages/Landing/Landing";
import Contact from "../pages/Landing/LandingComponents/FaqSection/ContactUs/Contact";
import LogIn from "../pages/LogIn/LogIn";
import Meeting from "../pages/Meeting/MeetingWithZegoCloud";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "../routes/PrivateRoute";
import "./../App.css";
import Root from "./../layout/Root";
import ErrorPage from "./../pages/ErrorPage/ErrorPage";
import Room from "./../pages/Room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <Meeting />
          </PrivateRoute>
        ),
      },
      {
        path: "/room",
        element: (
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          // {
          //   path: "",
          //   element: <General />,
          // },
          {
            path: "",
            element: <Meetings />,
          },
          {
            path: "todo",
            element: <ToDoApp />,
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
          },
        ],
      },
    ],
  },
]);

export default router;
