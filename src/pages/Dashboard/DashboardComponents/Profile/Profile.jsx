import axios from "axios";
import React, { useState } from "react";
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

  const IMGBB_API_KEY = "1b1fbff76382bc5873f0dedaa1c82836";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    axiosCommon
      .put(`/updateUser`, { ...formData, email: user.email }, {})
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

        setFormData({
          ...formData,
          photoURL: response.data.data.url || user?.photoURL,
        });
      } catch (error) {
        console.error("Error uploading file to ImgBB: ", error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-black/20 rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white/90">Profile</h2>
              <button
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  editMode
                    ? "bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-200/30"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                }`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative group">
                  <img
                    className="w-40 h-40 rounded-full object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                    src={user?.photoURL}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-1">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Username
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="userName"
                        defaultValue={formData.userName || user?.displayName}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <p className="text-white/90 text-lg">
                        {user?.displayName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email
                    </label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={user?.email}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white/50 focus:outline-none transition-all duration-300 cursor-not-allowed"
                        disabled
                      />
                    ) : (
                      <p className="text-white/90 text-lg">{user?.email}</p>
                    )}
                  </div>

                  {editMode ? (
                    <div className="space-y-1">
                      <label className="block text-white text-sm font-medium ">
                        Profile Photo
                      </label>
                      <input
                        type="text"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all duration-300"
                        placeholder="Enter photo URL"
                      />
                      <div className="text-white text-center text-sm py-4">
                        ----------- OR ------------
                      </div>
                      <input
                        type="file"
                        name="photoFile"
                        onChange={handleFileChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-white hover:file:bg-purple-500/40 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">
                        Last Login
                      </label>
                      <p className="text-white/90 text-lg">
                        {new Date(user?.metadata.lastSignInTime).toUTCString()}
                      </p>
                    </div>
                  )}

                  {editMode && (
                    <button
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-purple-500/90 hover:to-blue-500/90 text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm"
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
      </div>
    </div>
  );
};

export default Profile;
