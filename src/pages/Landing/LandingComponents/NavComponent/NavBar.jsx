import React from 'react';

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
                    <a className="navbar-item  text-white">Home</a>
                    <a className="navbar-item  text-white">About</a>
                    <a className="navbar-item  text-white">Contact</a>
                </div>
                <div class="navbar-end flex items-center mt-2 -mx-2 sm:mt-0">
                    <a href="#" class="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">Sign In</a>
                    <a href="#" class="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;