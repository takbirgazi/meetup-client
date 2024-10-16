import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/MeetUp.png";
import useAuth from "../../../../hooks/useAuth";
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`}
        to={"#home"}
      >
        home
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`}
        to={"#partners"}
      >
        partners
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`}
        to={"#features"}
      >
        features
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white 
            hover:border-[#a2deff] rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`}
        to={"#advantage"}
      >
        advantage
      </Link>
      <Link
        className={`navbar-item capitalize md:text-white hover:text-white hover:border-[#a2deff] rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`}
        to={"#faq"}
      >
        FAQ's
      </Link>
    </>
  );

  return (
    <div className="">
      <div className="navbar px-4 w-[90%] navbar-sticky m-5 mx-auto rounded-lg backdrop-blur-2xl bg-gray-800 flex items-center">
        <div className="navbar-start">
          <a href="#">
            <img className="w-auto h-10" src={logo} alt="" />
          </a>
          {/* <a className="navbar-item  text-white">MeetUp</a> */}
        </div>
        <div className="navbar-center hidden md:flex">{navLinks}</div>
        <div className="navbar-end">
          <div className="dropdown-container md:hidden">
            <div className="dropdown">
              <label className=" cursor-pointer" tabIndex="0">
                <RxHamburgerMenu className="text-white" size={25} />
              </label>
              <div className="dropdown-menu dropdown-menu-bottom-left">
                {navLinks}
                {user ? (
                  <>
                    <div className="p-2 flex items-center justify-between gap-4">
                      <h3>{user?.displayName}</h3>
                      <div className="avatar">
                        <img src={user?.photoURL} alt="avatar" />
                      </div>
                    </div>
                  </>
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
          <div className="hidden md:flex">
            {user ? (
              <>
                <div className="avatar">
                  <img src={user?.photoURL} alt="avatar" />
                </div>
              </>
            ) : (
              <div className="navbar-end flex items-center mt-2 -mx-2 sm:mt-0 space-x-3">
                <Link
                  to="/login"
                  className="btn btn-solid-primary font-semibold w-28"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-primary font-semibold w-28"
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
