import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdDashboard, MdLogout } from "react-icons/md"; // Import the icons
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "../../../../assets/MeetUp.png";
import useAuth from "../../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = (
    <>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-2 font-medium lg:text-lg`}
        to={"#home"}
      >
        home
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-2 font-medium lg:text-lg`}
        to={"#partners"}
      >
        partners
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-2 font-medium lg:text-lg`}
        to={"#features"}
      >
        features
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-2 font-medium lg:text-lg`}
        to={"#advantage"}
      >
        advantage
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-2 font-medium lg:text-lg`}
        to={"#faq"}
      >
        FAQ's
      </Link>
    </>
  );

  return (
    <div className="">
      <div className="navbar px-4 bg-[#101827] shadow-lg shadow-[#2c236cd7] navbar-sticky m-0 mx-auto backdrop-blur-2xl flex items-center">
        <div className="navbar-start">
          <a href="#">
            <img className="w-auto h-10" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden md:flex">{navLinks}</div>
        <div className="navbar-end">
          {/* Dropdown for mobile */}
          <div className="dropdown-container md:hidden">
            <div className="dropdown">
              <label className="cursor-pointer" tabIndex="0">
                <RxHamburgerMenu className="text-white" size={25} />
              </label>
              <div className="dropdown-menu dropdown-menu-bottom-left">
                {navLinks}
                {user ? (
                  <div className="p-2 flex items-center justify-between gap-4">
                    <h3>{user?.displayName}</h3>
                    <div className="avatar">
                      <img src={user?.photoURL} alt="avatar" />
                    </div>
                  </div>
                ) : (
                  <div className="p-2 flex items-center mt-2 -mx-2 sm:mt-0 space-x-3">
                    <Link
                      to="/login"
                      className="btn btn-solid-primary font-semibold"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="btn btn-outline-primary font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dropdown for desktop */}
          <div className="hidden md:flex">
            {user ? (
              <>
                <div className="relative">
                  <div
                    className="avatar cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <img src={user?.photoURL} alt="avatar" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-40 bg-white shadow-xl rounded-lg z-20 ">
                      <Link to={"/room"}>
                        <p className="dropdown-item text-sm flex-row items-center gap-2">
                          <IoHome /> Explore Meeting
                        </p>
                      </Link>
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
              </>
            ) : (
              <div className="navbar-end flex items-center mt-2 -mx-2 sm:mt-0 space-x-3">
                <Link
                  to="/login"
                  className="btn btn-solid-primary bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold w-28"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-outline-secondary border-2  hover:bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold w-28"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
