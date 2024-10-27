import React, { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/cat.png"; // Default avatar if user photo not available
import logo from "../../assets/MeetUp.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful!");
        localStorage.removeItem("access-token");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Log Out Failed!");
      });
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar bg-transparent h-[65px] py-2 shadow-lg shadow-[#0d0427] mx-auto z-50">
      <div className="navbar-start">
        <Link to="/" className="navbar-item font-bold text-white text-xl">
          <img src={logo} className="h-10 w-auto" alt="MeetUp Logo" />
        </Link>
      </div>

      <div className="navbar-end flex items-center">
        {/* Current Time */}
        <div className="text-white font-semibold hidden md:block text-[18px] mr-2">
          {moment().format("h:mm A - ")}
          {moment().format("ll")}
        </div>

        {user ? (
          <div className="relative">
            {/* Avatar */}
            <div
              className="avatar cursor-pointer"
              onClick={toggleDropdown} // Toggle dropdown on click
            >
              <img
                src={user?.photoURL || avatar} // Fallback to default avatar
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-40 bg-white shadow-xl rounded-lg z-20">
              <Link to={"/dashboard"}>
                <p className="dropdown-item text-sm flex-row items-center gap-2">
                  {" "}
                  {/* <IoMdPerson /> {user?.displayName} */}{" "}
                  <MdDashboard /> Dashboard
                </p>
              </Link>
              <div
                onClick={handleLogout}
                tabIndex="-1"
                className="dropdown-item text-sm flex-row items-center gap-2"
              >
                <MdLogout /> Logout
              </div>
            </div>
            )}
          </div>
        ) : (
          <Link
            to={"/logIn"}
            className="text-black bg-white rounded-xl px-4 py-2 font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
