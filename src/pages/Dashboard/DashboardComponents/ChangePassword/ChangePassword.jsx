import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = (data) => {
        // Handle password change logic here
        console.log(data);
        setSuccessMessage('Password changed successfully!');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
                        {...register("currentPassword", { required: "Current password is required" })}
                    />
                    {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
                        {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                    />
                    {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="input text-black bg-gray-100 border border-gray-300 rounded p-2 w-full"
                        {...register("confirmPassword", {
                            required: "Please confirm your new password",
                            validate: (value) => {
                                const { newPassword } = getValues();
                                return newPassword === value || "Passwords do not match";
                            }
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary bg-[#1e3799] text-white py-2 rounded">Change Password</button>
            </form>

            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
    );
};

export default ChangePassword;
