import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";
import 'ldrs/hourglass';

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
        const response = await axiosCommon.get(`/userSearch?email=${user?.email}`);
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
        currentPassword: hasPassword ? data.currentPassword : data.confirmPassword,
        newPassword: data.newPassword,
      });

      passwordUpdate(data.newPassword);

      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-center",
        style: {
          padding: '10px',
          background: '#2133',
          color: '#fff',
        }
      });
    }
  };

  if (loading) {
    return (
      <l-hourglass
        size="40"
        bg-opacity="0.3"
        speed="2.75"
        color="black"
      ></l-hourglass>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-[10%] p-6 bg-gray-900 text-white shadow-md ">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {hasPassword ? "Change Password" : "Set New Password"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
        {hasPassword && (
          <div className="w-full">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-slate-300"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="input max-w-md text-white bg-gray-600 border border-gray-300 rounded p-2 w-full box-border"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {errors.currentPassword && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
        )}

        <div className="w-full">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-slate-300"
          >
            {hasPassword ? "New Password" : "Password"}
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            className="input max-w-md text-white bg-gray-600 border border-gray-300 rounded p-2 w-full box-border"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-300"
          >
            Confirm {hasPassword ? "New Password" : "Password"}
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="input max-w-md text-white bg-gray-600 border border-gray-300 rounded p-2 w-full box-border"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => {
                const { newPassword } = getValues();
                return newPassword === value || "Passwords do not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-gradient-to-r from-[#ffbfff] to-[#a2deff] text-black py-2 rounded w-full box-border"
        >
          {hasPassword ? "Change Password" : "Set Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
