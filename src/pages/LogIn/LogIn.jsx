import React from "react";
import toast from "react-hot-toast";
import {
  Link,
  NavLink,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../assets/MeetUp.png";
import useAuth from "../../hooks/useAuth";
import { axiosCommon } from "../../hooks/useAxiosCommon";

const Login = () => {
  const { user, logIn, googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const mail = data.get("email");
    const password = data.get("password");

    // console.log(mail, password);
    e.target.reset();
    logIn(mail, password)
      .then((res) => {
        toast.success("Log In Successfully!");
        navigate(location?.state?.from?.pathname || "/room");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result.user)
        toast.success("Log In Successfully!");

        const userInfo = {
          email: result.user.email,
          userName: result.user.displayName,
          photoURL: result.user.photoURL,
          password: "",
          role: "general-user",
          createdAt: result.user.metadata.creationTime,
          lastLoginAt: result.user.metadata.lastSignInTime,
        };
        axiosCommon.post("/login", userInfo).then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate(location?.state?.from?.pathname || "/room");
          }
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        // console.log(result.user)
        toast.success("Log In Successfully!");

        const userInfo = {
          email: result.user.email,
          userName: result.user.displayName,
          photoURL: result.user.photoURL,
          password: "",
          role: "general-user",
          createdAt: result.user.metadata.creationTime,
          lastLoginAt: result.user.metadata.lastSignInTime,
        };
        axiosCommon.post("/login", userInfo).then((res) => {
          if (res.status === 200 || res.status === 201) {
            navigate(location?.state?.from?.pathname || "/room");
          }
        });
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      {user && // If user is logged in, redirect to the room page
        navigate(location?.state?.from?.pathname || "/room")}
      <div div className="bg-gray-900 h-screen">
        <ScrollRestoration />
        {/* <TitleBanner title={"User Sign In"} route={"Home / Login"} /> */}
        <div className="w-full min-h-[calc(100vh-4.1rem)] flex items-center justify-center">
          <div className="mx-auto flex w-full bg-gray-800 max-w-lg flex-col rounded-xl border-2 border-gray-600 p-4 sm:p-16 items-center justify-center">
            <NavLink to="/">
              <img className="w-40 pb-4" src={logo} alt="logo" />
            </NavLink>
            <div className="flex w-full flex-col gap-2">
              <p className="text-gray-300">Sign in with</p>
              <div className="flex w-full flex-col gap-2">
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="btn gap-2 bg-gray-5"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.1"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span>Sign up with google</span>
                </button>
                <button
                  onClick={handleGithubSignIn}
                  type="button"
                  className="btn gap-2 bg-gray-5"
                >
                  <svg
                    width="21"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    className="svg-inline--fa fa-github fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>

                  <span>Sign up with github</span>
                </button>
              </div>
            </div>
            <div className="divider my-6 text-xs text-gray-300">
              or continue with
            </div>

            <form onSubmit={handleSignIn} className="form-group">
              <div className="form-field">
                <label className="form-label text-gray-300">
                  Email address
                </label>

                <input
                  name="email"
                  placeholder="Type here"
                  type="email"
                  className="input max-w-full"
                />
              </div>
              <div className="form-field">
                <label className="form-label text-gray-300">
                  <span>Password</span>
                </label>
                <div className="form-control">
                  <input
                    name="password"
                    placeholder="Type here"
                    type="password"
                    className="input max-w-full"
                  />
                </div>
              </div>
              <div className="form-field">
                <div className="form-control justify-between text-gray-300">
                  <div className="flex gap-2">
                    <input type="checkbox" className="checkbox" />
                    <a href="#">Remember me</a>
                  </div>
                  <label className="form-label">
                    <a className="link link-underline-hover link-primary text-sm">
                      Forgot your password?
                    </a>
                  </label>
                </div>
              </div>
              <div className="form-field pt-5">
                <div className="form-control justify-between">
                  <input
                    type="submit"
                    className="btn btn-primary w-full"
                    value={"Sign in"}
                  />
                </div>
              </div>

              <div className="form-field">
                <div className="form-control">
                  <div className="text-sm cursor-auto text-gray-200">
                    Don't have an account?{" "}
                    <Link
                      to={"/signUp"}
                      className="link link-underline-hover link-primary"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
