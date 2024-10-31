import React from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
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
import background from "./../../assets/background5.jpg";

const Login = () => {
  const { user, logIn, googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const mail = data.get("email");
    const password = data.get("password");

    e.target.reset();
    logIn(mail, password)
      .then((res) => {
        toast.success("Log In Successfully!");
        navigate(location?.state?.from?.pathname || "/room");
      })
      .catch((error) => {
        if (error.message.split("/")[1] === "invalid-credential).")
          toast.error("Invalid Credential");
        return;
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
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
      <style>{`
        .glass-effect {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .form-input {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem; /* 8px */
          padding: 0.5rem 1rem; /* 8px 16px */
          color: white;
          placeholder-color: rgba(255, 255, 255, 0.4);
          outline: none;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.4);
        }
        
        .social-button {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        
        .social-button:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {user && navigate(location?.state?.from?.pathname || "/room")}

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ScrollRestoration />
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="w-full max-w-lg glass-effect rounded-xl p-8 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <NavLink to="/">
              <img className="w-40" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="space-y-4">
            <p className="text-white text-sm">Sign in with</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                className="social-button flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border  text-white"
              >
                <FaGoogle className="text-xl" />
                <span>Google</span>
              </button>
              <button
                onClick={handleGithubSignIn}
                className="social-button flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border  text-white"
              >
                <svg
                  width="20"
                  className="text-white"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
                <span>Github</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-gray-300 bg-black/40">
                or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                className="form-input w-full px-4 py-2.5 rounded-lg focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="form-input w-full px-4 py-2.5 rounded-lg focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="form-input h-4 w-4 rounded" />
                <label className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a className="text-sm text-pink-500 hover:text-pink-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-pink-500 hover:text-pink-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
