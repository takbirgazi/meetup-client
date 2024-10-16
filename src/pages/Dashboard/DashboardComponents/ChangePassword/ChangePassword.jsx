import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";

const ChangePassword = () => {
  const [hasPassword, setHasPassword] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  // Fetch the user data to check if they have a password
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
    // console.log("Form data:", data);

    if (hasPassword) {
      const { newPassword, confirmPassword } = getValues();
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
    }

    try {
      const response = await axiosCommon.patch("/changePassword", {
        email: user?.email,
        currentPassword: hasPassword ? data.currentPassword : data.confirmPassword,
        newPassword: data.newPassword,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.log("Error changing password:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-500 to-gray-700 text-slate-200 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {hasPassword ? "Change Password" : "Set New Password"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {hasPassword && (
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-slate-300"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {errors.currentPassword && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-slate-300"
          >
            {hasPassword ? "New Password" : "Password"}
          </label>
          <input
            id="newPassword"
            type="password"
            className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-300"
          >
            Confirm {hasPassword ? "New Password" : "Password"}
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
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
          className="btn btn-primary bg-[#1e3799] text-white py-2 rounded"
        >
          {hasPassword ? "Change Password" : "Set Password"}
        </button>
      </form>

      {successMessage && (<p className="mt-4 text-green-500">{successMessage}</p>)}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default ChangePassword;
