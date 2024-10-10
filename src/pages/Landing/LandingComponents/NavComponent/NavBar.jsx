import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

const NavBar = () => {

    const navLinks = <>
    <Link className={`navbar-item capitalize text-white hover:text-white hover:border-blue-700 rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`} to={'#home'}>home</Link>
    <Link className={`navbar-item capitalize text-white hover:text-white hover:border-blue-700 rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`} to={'#partners'}>partners</Link>
    <Link className={`navbar-item capitalize text-white hover:text-white hover:border-blue-700 rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`} to={'#features'}>features</Link>
    <Link className={`navbar-item capitalize text-white hover:text-white hover:border-blue-700 rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`} to={'#advantage'}>advantage</Link>
    <Link className={`navbar-item capitalize text-white hover:text-white hover:border-blue-700 rounded-none pb-4 duration-150 hover:border-b-4 font-medium lg:text-lg`} to={'#faq'}>FAQ's</Link>
</>;

    const [activateSection, setActivateSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - sectionHeight / 3) {
                    currentSection = section.getAttribute('id');
                }
            });

            if (currentSection !== activateSection) {
                setActivateSection(currentSection);
                window.history.pushState(null, null, `#${currentSection}`);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return (
        <div className='container mx-auto'>
            <div className="navbar navbar-sticky m-5 w-11/12 mx-auto rounded-lg backdrop-blur-2xl bg-gray-800 container flex items-center">
                <div className="navbar-start">
                    <a href="#">
                        <img class="w-auto sm:h-7" src={logo} alt="" />
                    </a>
                    {/* <a className="navbar-item  text-white">MeetUp</a> */}
                </div>
                <div className="navbar-center">
                    {
                        navLinks
                    }
                </div>
                <div class="navbar-end flex items-center mt-2 -mx-2 sm:mt-0 space-x-3">
                    <NavLink to='/login' className="btn btn-solid-primary font-semibold">Log In</NavLink>
                    <NavLink to="/signup" className="btn btn-outline-primary font-semibold">Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;