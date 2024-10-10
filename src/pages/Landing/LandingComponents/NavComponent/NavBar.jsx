import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className=''>
            <div className="navbar navbar-sticky m-5 w-[95%] mx-auto rounded-lg backdrop-blur-2xl bg-gray-800">
                <div className="navbar-start">
                    <a href="#">
                        <img class="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="" />
                    </a>
                    <a className="navbar-item  text-white">MeetUp</a>
                </div>
                <div className="navbar-center">
                    <NavLink className="navbar-item  text-white">Home</NavLink>
                    <NavLink className="navbar-item  text-white">Partners</NavLink>
                    <NavLink className="navbar-item  text-white">Home</NavLink>
                    <NavLink className="navbar-item  text-white">Home</NavLink>
                    <NavLink className="navbar-item  text-white">Home</NavLink>
                    <a className="navbar-item  text-white">About</a>
                    <a className="navbar-item  text-white">Contact</a>
                </div>
                <div class="navbar-end flex items-center mt-2 -mx-2 sm:mt-0 space-x-3">
                    <a href='#' class="btn btn-solid-primary font-semibold">Log In</a>
                    <a href='#' class="btn btn-outline-primary font-semibold">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;