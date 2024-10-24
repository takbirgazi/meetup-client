import "ldrs/hourglass";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";

const ChangePassword = () => {
  const [hasPassword, setHasPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, passwordUpdate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchUserPasswordStatus = async () => {
      try {
        const response = await axiosCommon.get(
          `/userSearch?email=${user?.email}`
        );
        if (response.data.exists) {
          setHasPassword(response.data.hasPassword);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPasswordStatus();
  }, [user?.email]);

  const onSubmit = async (data) => {
    if (hasPassword) {
      const { newPassword, confirmPassword } = getValues();
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      const response = await axiosCommon.patch("/changePassword", {
        email: user?.email,
        currentPassword: hasPassword
          ? data.currentPassword
          : data.confirmPassword,
        newPassword: data.newPassword,
      });

      passwordUpdate(data.newPassword);

      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-center",
        style: {
          padding: "10px",
          background: "#2133",
          color: "#fff",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <l-hourglass
          size="40"
          bg-opacity="0.3"
          speed="2.75"
          color="white"
        ></l-hourglass>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-black/20 rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white/90 text-center mb-8">
              {hasPassword ? "Change Password" : "Set New Password"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {hasPassword && (
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-white/60 text-sm font-medium mb-2"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all duration-300"
                    {...register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.currentPassword && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-white text-sm font-medium mb-2"
                >
                  {hasPassword ? "New Password" : "Password"}
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all duration-300"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Confirm {hasPassword ? "New Password" : "Password"}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all duration-300"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) => {
                      const { newPassword } = getValues();
                      return newPassword === value || "Passwords do not match";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-purple-500/90 hover:to-blue-500/90 text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                {hasPassword ? "Change Password" : "Set Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
