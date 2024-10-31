import { useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdTask } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/MeetUpLogo.png";
import useAuth from "../../hooks/useAuth";
import background from "./../../assets/background5.jpg";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { logOut,loading } = useAuth();

  useEffect(() => {
    const chatButton = document.getElementById("tidio-chat");
    if (chatButton) {
      chatButton.style.display = "block";
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
  };

  const menuActive = "bg-gradient-to-r from-pink-500 to-blue-600 text-white ";
  const menuItem = "menu-item ml-6";

  const closeSidebar = () => {
    document.getElementById("sidebar-mobile-fixed").checked = false;
  };

  useEffect(() => {
    const chatButton = document.getElementById("tidio-chat");
    if (chatButton) {
      chatButton.style.display = "none";
    }
  }, [loading]);

  const mainMenuItems = (
    <>

      <NavLink to={`/dashboard`} end onClick={closeSidebar} className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg">
          <TfiStatsUp className="text-xl" />
          <span>Overview</span>
        </li>
      </NavLink>

      <NavLink to={`/dashboard/meetings`} onClick={closeSidebar} className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg ">
          <IoHome className="text-xl" />
          <span>Meetings</span>
        </li>
      </NavLink>


      <NavLink to={`/dashboard/todo`} onClick={closeSidebar} className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg">
          <MdTask className="text-xl" />
          <span>Todo</span>
        </li>
      </NavLink>

      <NavLink to={`/dashboard/support`} onClick={closeSidebar} className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg">
          <BiSupport className="text-xl" />
          <span>Support</span>
        </li>
      </NavLink>

      {/* Account Menu with Collapsible Profile and Password Links */}
      <li>
        <input type="checkbox" id="menu-1" className="menu-toggle" />
        <label className="menu-item justify-between hover:bg-white/10 transition-all duration-300 rounded-lg text-white/90" htmlFor="menu-1">
          <div className="flex gap-2">
            <FaUserCircle className="text-xl" />
            <span>Account</span>
          </div>
          <span className="menu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </label>

        <div className="menu-item-collapse bg-black/40 backdrop-blur-lg rounded-xl">
          <div className="min-h-0">
            <NavLink to={`/dashboard/profile`} onClick={closeSidebar} className={({ isActive }) => `${menuItem} ${isActive ? menuActive : "text-white/90"} hover:bg-white/10 my-2 max-w-[85%] transition-all duration-300 rounded-lg`}>
              Profile
            </NavLink>
            <NavLink to={`/dashboard/change-password`} onClick={closeSidebar} className={({ isActive }) => `${menuItem} ${isActive ? menuActive : "text-white/90"} hover:bg-white/10 my-2 max-w-[85%] transition-all duration-300 rounded-lg`}>
              Password
            </NavLink>
          </div>
        </div>
      </li>

      <NavLink to={"/room"} onClick={closeSidebar}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg">
          <IoHome className="text-xl" />
          <span>Room</span>
        </li>
      </NavLink>

      <NavLink to={"/"} onClick={logOut}>
        <li className="menu-item text-white/90 hover:bg-white/10 transition-all duration-300 rounded-lg">
          <IoIosLogOut className="text-red-400 text-xl" />
          <span>Logout</span>
        </li>
      </NavLink>
    </>
  );

  return (
    <div className="flex flex-row sm:gap-10 min-h-screen" style={backgroundStyle}>
      <Helmet>
        <title>Dashboard - MeetUp</title>
      </Helmet>
      <div className="sm:w-full sm:max-w-[18rem]">
        <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
        <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
        <aside className="backdrop-blur-xl bg-black/40 sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full border border-white/10 shadow-2xl shadow-black/40">
          <Link to={"/"} className="hover:opacity-80 transition-opacity">
            <div className="sidebar-title p-4 flex items-center justify-center">
              <img src={logo} className="h-10 w-auto mr-2" alt="Logo" />
              <p className="text-white text-2xl font-semibold">MeetUp</p>
            </div>
          </Link>
          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <ul className="menu-items ">{mainMenuItems}</ul>
              </section>
            </nav>
          </section>
        </aside>
      </div>

      <div className="flex w-full justify-center relative">
        <div className="w-fit absolute left-2 top-3 z-50">
          <label htmlFor="sidebar-mobile-fixed" className="btn btn-outline border-none text-white/90 sm:hidden hover:bg-black/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </label>
        </div>

        <div className="w-full pt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



