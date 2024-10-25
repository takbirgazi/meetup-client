import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import useAxiosCommon from "../../hooks/useAxiosCommon";
import background from "./../../assets/background5.jpg";

const SignUp = () => {
  const { user, loading, createAccount, profileUpdate } = useAuth();
  const [viewPass, setViewPass] = useState(false);
  const [viewConfPass, setViewConfPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxiosCommon();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { first_name, last_name, username, mail, password } = data;

    const userInfo = {
      first_name,
      last_name,
      username,
      email: mail,
      password,
      createdAt: new Date().toISOString(),
      role: "general-user",
    };

    createAccount(mail, password)
      .then((res) => {
        profileUpdate(username, null)
          .then((data) => {
            axios
              .post("/addUser", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  toast.success("Your Account Registered Successfully!");
                  navigate(location?.state?.from?.pathname || "/room");
                }
              })
              .catch((error) => console.log(error.message));
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error));
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
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          color: white;
          placeholder-color: rgba(255, 255, 255, 0.4);
          outline: none;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
         border-color: transparent;
          box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.4);
        }
      `}</style>

      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        user && navigate(location?.state?.from?.pathname || "/room")
      )}

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

        <div className="w-full max-w-lg glass-effect rounded-xl p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <NavLink to="/">
              <img className="w-40" src={logo} alt="logo" />
            </NavLink>
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              Create An Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  {...register("first_name", { required: "Required" })}
                  placeholder="First Name"
                  className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
                />
                {errors.first_name && (
                  <p className="mt-1 text-pink-500 text-xs">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  {...register("last_name", { required: "Required" })}
                  placeholder="Last Name"
                  className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
                />
                {errors.last_name && (
                  <p className="mt-1 text-pink-500 text-xs">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                {...register("username", { required: "Username required" })}
                placeholder="Enter your username"
                className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
              />
              {errors.username && (
                <p className="mt-1 text-pink-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                {...register("mail", { required: "Email required" })}
                type="email"
                placeholder="Enter your email"
                className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
              />
              {errors.mail && (
                <p className="mt-1 text-pink-500 text-xs">
                  {errors.mail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: "Must contain letter and number",
                    },
                    minLength: {
                      value: 8,
                      message: "Min 8 characters",
                    },
                  })}
                  type={viewPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-input w-full pr-9 py-2 rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setViewPass(!viewPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                >
                  {viewPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-pink-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("conf_password", {
                    required: "Confirm password required",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                  type={viewConfPass ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="form-input w-full pr-9 py-2 rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setViewConfPass(!viewConfPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                >
                  {viewConfPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.conf_password && (
                <p className="mt-1 text-pink-500 text-xs">
                  {errors.conf_password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("privacy", { required: true })}
                className="form-input h-4 w-4 rounded"
              />
              <span className="text-sm text-gray-300">
                I've read and accept the Privacy Policy
              </span>
            </div>
            {errors.privacy && (
              <p className="text-pink-500 text-xs">
                Privacy Policy acceptance required
              </p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Sign up
            </button>

            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                to="/logIn"
                className="text-pink-500 hover:text-pink-400 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
