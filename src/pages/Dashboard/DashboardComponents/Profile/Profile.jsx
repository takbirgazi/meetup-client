import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";

const Profile = () => {
    const { user, profileUpdate, setLoading } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        photoURL: "" || user?.photoURL,
    });

    const IMGBB_API_KEY = '1b1fbff76382bc5873f0dedaa1c82836';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        axiosCommon.put(`/updateUser`, { ...formData, email: user.email }, {})
            .then((response) => {
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
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    formData
                );

                setFormData({ ...formData, photoURL: response.data.data.url || user?.photoURL });
            } catch (error) {
                console.error("Error uploading file to ImgBB: ", error);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mt-[8%] mx-auto text-white">
            <div className="ripple-card shadow-lg bg-gray-900 rounded-lg">
                <div className="ripple-card-body p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Profile</h2>
                        <button
                            className={editMode ? `btn btn-outline-error hover:btn-error` : `btn bg-gradient-to-r from-[#ffbfff] to-[#a2deff]`}
                            onClick={() => setEditMode(!editMode)}
                        >
                            {editMode ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <div className="flex flex-col flex-wrap items-center sm:flex-row sm:items-start sm:space-x-6">
                        <img
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-0"
                            src={user?.photoURL}
                            alt="Profile"
                        />
                        <div className="w-full sm:w-2/3 text-white">
                            <div className="mb-4 ripple-card">
                                <label className="block font-bold mb-2">Username:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="userName"
                                        defaultValue={user?.displayName}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded w-full bg-gray-600 text-white hover:border-primary focus:ring-2 focus:ring-blue-300"
                                    />
                                ) : (
                                    <p>{user?.displayName}</p>
                                )}
                            </div>

                            <div className="mb-4 ripple-card">
                                <label className="block font-bold mb-2">Email:</label>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={user?.email}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded w-full bg-gray-600 text-white hover:border-primary focus:ring-2 focus:ring-blue-300"
                                        disabled
                                    />
                                ) : (
                                    <p>{user?.email}</p>
                                )}
                            </div>

                            {editMode ? (
                                <div className="mb-4 ripple-card text-white border rounded-md hover:border-primary p-3">
                                    <label className="block font-bold mb-2 ">Photo URL:</label>
                                    <input
                                        type="text"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded w-full bg-gray-600 text-white hover:border-secondary focus:ring-2 focus:ring-blue-300"
                                        placeholder="Enter photo URL"
                                    />
                                    <div className="divider divider-horizontal text-xs">OR</div>
                                    <input
                                        type="file"
                                        name="photoFile"
                                        onChange={handleFileChange}
                                        className="border border-gray-300 p-2 rounded w-full bg-gray-600 text-white hover:border-secondary focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>
                            ) : (
                                <div className="mb-4 ripple-card">
                                    <label className="block font-bold mb-2">Last Login:</label>
                                    <p>{new Date(user?.metadata.lastSignInTime).toUTCString()}</p>
                                </div>
                            )}

                            {editMode && (
                                <button
                                    className="btn text-black font-medium mt-4 bg-gradient-to-r from-[#ffbfff] to-[#a2deff]"
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
