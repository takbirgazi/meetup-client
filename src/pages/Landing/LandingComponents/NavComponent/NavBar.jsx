import React from 'react';

const NavBar = () => {
    return (
        <div className=''>
            <div className="navbar navbar-sticky m-5 w-[95%] mx-auto rounded-lg">
                <div className="navbar-start">
                    <a className="navbar-item">Ripple UI</a>
                </div>
                <div className="navbar-center">
                    <a className="navbar-item">Home</a>
                    <a className="navbar-item">About</a>
                    <a className="navbar-item">Contact</a>
                </div>
                <div className="navbar-end">
                    <a className="navbar-item">Home</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;