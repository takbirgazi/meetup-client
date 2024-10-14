import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        photoURL: "",
    });

    const { user, profileUpdate, setLoading } = useAuth();
    const IMGBB_API_KEY = '1b1fbff76382bc5873f0dedaa1c82836';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        console.log(formData)
        axiosCommon.put(`/updateUser`, { ...formData, email: user.email }, {
        })
            .then((response) => {
                console.log(response.data)
                profileUpdate(formData.userName, formData.photoURL);
                setLoading(false);
                setEditMode(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                // Upload the image to ImgBB
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    formData
                );

                // Set the uploaded image URL to formData
                setFormData({ ...formData, photoURL: response.data.data.url || user?.photoURL });
                // console.log("File uploaded successfully: ", response.data.data.url);
            } catch (error) {
                console.error("Error uploading file to ImgBB: ", error);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
            <div className="ripple-card shadow-lg shadow-[#D8D2C2] rounded-lg">
                <div className="ripple-card-body p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Profile</h2>
                        <button
                            className={editMode ? `btn btn-outline-error hover:btn-error` : `btn btn-outline-primary hover:btn-secondary`}
                            onClick={() => setEditMode(!editMode)}
                        >
                            {editMode ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
                        <img
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-0"
                            src={user?.photoURL}
                            alt="Profile"
                        />
                        <div className="w-full sm:w-2/3">
                            <div className="mb-4 ripple-card">
                                <label className="block font-bold text-gray-700 mb-2">Username:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="userName"
                                        defaultValue={user?.displayName}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded w-full focus:ring-2 hover:border-primary focus:ring-blue-300"
                                    />
                                ) : (
                                    <p className="text-gray-800">{user?.displayName}</p>
                                )}
                            </div>

                            <div className="mb-4 ripple-card">
                                <label className="block font-bold text-gray-700 mb-2">Email:</label>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={user?.email}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded w-full hover:border-primary focus:ring-2 focus:ring-blue-300"
                                        disabled
                                    />
                                ) : (
                                    <p className="text-gray-800">{user?.email}</p>
                                )}
                            </div>

                            {
                                editMode ? (
                                    <div className="mb-4 ripple-card border hover:border-primary p-3">
                                        <label className="block font-bold text-gray-700 mb-2">Photo URL:</label>
                                        <input
                                            type="text"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded w-full hover:border-secondary focus:ring-2 focus:ring-blue-300"
                                            placeholder="Enter photo URL"
                                        />
                                        <div className="divider divider-horizontal text-xs">OR</div>
                                        <input
                                            type="file"
                                            name="photoFile"
                                            onChange={handleFileChange}
                                            className="border border-gray-300 p-2 rounded w-full hover:border-secondary focus:ring-2 focus:ring-blue-300"
                                        />
                                    </div>
                                )
                                    :
                                    (
                                        <div className="mb-4 ripple-card">
                                            <label className="block font-bold text-gray-700 mb-2">Last Login:</label>
                                            <p className="text-gray-800">{new Date(user?.metadata.lastSignInTime).toUTCString()}</p>
                                        </div>
                                    )
                            }

                            {editMode && (
                                <button
                                    className="btn btn-outline-primary mt-4 hover:btn-primary"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
