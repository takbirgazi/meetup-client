import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth(); // Assuming useAuth provides currentUser
  const axiosCommon = useAxiosCommon();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosCommon.get("/users"); // Adjust the endpoint as needed
        const users = response.data;

        // Match the current user by their email address
        const currentUserEmail = currentUser.email;
        const currentUserData = users.find(
          (user) => user.email === currentUserEmail
        );

        if (currentUserData) {
          setUser(currentUserData);
        } else {
          console.error("Current user not found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`/updateUser`, {
        email: user.email,
        userName: user.userName,
        photoURL: user.photoURL,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
      } else {
        setSuccessMessage("Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setSuccessMessage("Failed to change password.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      {user && (
        <div className="mb-4">
          <p>Welcome, {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change Password
        </button>
      </form>
      {successMessage && (
        <p className="text-green-500 text-xs mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default ChangePassword;
