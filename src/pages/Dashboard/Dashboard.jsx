
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import logo from "../../assets/MeetUpLogo.png";
import { useState } from 'react';
import ChatBot from './DashboardComponents/General/GeneralComponents/ChatBot/ChatBot';
const Dashboard = () => {

    const [isChatBotOpen, setIsChatBotOpen] = useState(false);

    // Toggle ChatBot visibility
    const toggleChatBot = () => {
        setIsChatBotOpen(!isChatBotOpen);
    };

    const { user, logOut } = useAuth();

    const menuActive = `menu-active bg-black`;
    const menuItem = "menu-item ml-6";

    const mainMenuItems =
        <>
            <NavLink to={`/dashboard`} end className={({ isActive }) => isActive ? menuActive : ''}>
                <li className="menu-item text-white hover:bg-gray-950">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>General</span>
                </li>
            </NavLink>

            <NavLink to={`/dashboard/meetings`} className={({ isActive }) => isActive ? menuActive : ''}>
                <li className="menu-item text-white hover:bg-gray-950">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Meetings</span>
                </li>
            </NavLink>

            <NavLink to={`/dashboard/support`} className={({ isActive }) => isActive ? menuActive : ''}>
                <li className="menu-item text-white hover:bg-gray-950">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Support</span>
                </li>
            </NavLink>

            <li>
                <input type="checkbox" id="menu-1" className="menu-toggle" />
                <label className="menu-item justify-between hover:bg-gray-950" htmlFor="menu-1">
                    <div className="flex gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Account</span>
                    </div>

                    <span className="menu-icon text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </label>

                <div className="menu-item-collapse bg-gray-950 rounded-xl text-gray-100">
                    <div className="min-h-0">
                        <NavLink
                            to={`/dashboard/profile`}
                            className={({ isActive }) => `${menuItem} ${isActive ? menuActive : "text-gray-200"}  hover:text-gray-950 my-2 max-w-[85%]`}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to={`/dashboard/change-password`}
                            className={({ isActive }) => `${menuItem} ${isActive ? menuActive : "text-gray-200"} hover:text-gray-950 my-2 max-w-[85%]`}
                        >
                            Change Password
                        </NavLink>

                    </div>
                </div>
            </li>
        </>

    const settingsMenuItems =
        <>
            <div className="dropdown-menu-right-top dropdown-menu mb-5 bg-gradient-to-r from-gray-600 to-gray-700">
                <NavLink to={`/room`} className={({ isActive }) => isActive ? menuActive : ''}>
                    <div className='menu-item'>
                        <MdOutlineMeetingRoom className='text-blue-600' />
                        <span>Room</span>
                    </div>
                </NavLink>
                <NavLink to={'/'} onClick={logOut} className={({ isActive }) => isActive ? menuActive : ''}>
                    <div className='menu-item'>
                        <IoIosLogOut className='text-red-600' />
                        <span>Logout</span>
                    </div>
                </NavLink>
            </div>
        </>

    return (
        <div className="flex flex-row sm:gap-10 bg-gradient-to-r from-[#101827] to-[#4e5668] min-h-screen">
            <div className="sm:w-full sm:max-w-[18rem] ">
                <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
                <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
                <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full bg-[#101827]  shadow-2xl shadow-[#1d283c] ">
                    <Link
                        to={'/'}
                        className=''
                    >
                        <section className="sidebar-title items-center p-4 flex">
                            <img src={logo} className='h-8 w-auto' />

                            <div className="flex flex-col text-white">
                                <p>MeatUp</p>
                                <p className="text-xs font-normal">Dashboard</p>
                            </div>
                        </section>
                    </Link>
                    <section className="sidebar-content text-white">
                        <nav className="menu rounded-md">
                            <section className="menu-section px-4">
                                <span className="menu-title">Main menu</span>
                                <ul className="menu-items">
                                    {mainMenuItems}
                                </ul>
                            </section>
                            <div className="divider my-0"></div>
                        </nav>
                    </section>
                    <section className="sidebar-footer justify-end pt-2">
                        {/* <div className="divider my-0"></div> */}
                        <div className="dropdown z-50 flex h-fit w-full cursor-pointer bg-gradient-to-r from-gray-500 to-gray-800">
                            <label className="whites mx-2 flex h-fit w-full cursor-pointer rounded-lg p-0 mt-2 hover:bg-gray-800 hover:text-gray-300" tabIndex="0">
                                <div className="flex flex-row gap-4 p-4 justify-center items-center">
                                    <div className="avatar-ring avatar avatar-md">
                                        <img src={user?.photoURL} alt="avatar" />
                                    </div>

                                    <div className="flex flex-col text-lg">
                                        <span>{user?.displayName}</span>
                                    </div>
                                </div>
                            </label>
                            {settingsMenuItems}
                        </div>
                    </section>
                </aside>
            </div>
            <div className="flex w-full flex-col p-4">
                <div className="w-fit">
                    <label htmlFor="sidebar-mobile-fixed" className="btn btn-outline border-[#1E3E62] text-[#1E3E62] sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>

                    </label>
                </div>
                <div className=''>
                    <Outlet />
                    {/* AI Chat Integration Button */}
                    {/* ChatBot Popover */}
                    <div className="popover fixed bottom-28 right-4 z-[99999]">
                        <label
                            className="popover-trigger my-2 cursor-pointer hover:shadow-xl hover:shadow-blue-400 rounded-full"
                            tabIndex="0"
                            onClick={toggleChatBot}  // Trigger chatbox open/close
                        >
                            {
                                isChatBotOpen ? (
                                    <img src="/src/assets/images/bottom-right.png" alt="Closec chat" className='w-10 h-10' />
                                ) : (
                                    <img src="/src/assets/images/chatBot.png" alt="Chat with AI" className="w-14 h-14" />
                                )
                            }

                        </label>
                        {isChatBotOpen && (
                            // Position the popover-content above the button
                            <div className="popover-content popover-top-left absolute w-screen max-w-md bottom-full mb-4 md:mr-5 bg-black border-2 border-slate-700" tabIndex="0">
                                <div className="popover-arrow bg-blue-400"></div>
                                <div className="overflow-hidden rounded-lg">
                                    <ChatBot onClose={toggleChatBot} /> {/* Render the ChatBot component */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;