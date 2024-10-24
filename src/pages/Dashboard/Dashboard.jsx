import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/MeetUpLogo.png";
import useAuth from "../../hooks/useAuth";
import background from "./../../assets/background5.jpg";
import closeChat from "./../../assets/images/bottom-right.png";
import openChat from "./../../assets/images/chatBot.png";
import ChatBot from "./DashboardComponents/General/GeneralComponents/ChatBot/ChatBot";

const Dashboard = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();

  useEffect(() => {
    const chatButton = document.getElementById("tidio-chat");
    if (chatButton) {
      chatButton.style.display = "block";
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  const menuActive =
    "bg-gradient-to-r from-pink-500 to-blue-600 text-white ";
  const menuItem = "menu-item ml-6";

  const mainMenuItems = (
    <>
      <NavLink
        to={`/dashboard`}
        end
        className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}
      >
        <li className="menu-item text-white/90 hover:bg-black/40 transition-all duration-300 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span>Meetings</span>
        </li>
      </NavLink>

      <NavLink
        to={`/dashboard/todo`}
        className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}
      >
        <li className="menu-item text-white/90 hover:bg-black/40 transition-all duration-300 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
          <span>Todo</span>
        </li>
      </NavLink>

      <NavLink
        to={`/dashboard/support`}
        className={({ isActive }) => `rounded-lg ${isActive ? menuActive : ""}`}
      >
        <li className="menu-item text-white/90 hover:bg-black/40 transition-all duration-300 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Support</span>
        </li>
      </NavLink>

      <li>
        <input type="checkbox" id="menu-1" className="menu-toggle" />
        <label
          className="menu-item justify-between hover:bg-black/40 transition-all duration-300 rounded-lg text-white/90"
          htmlFor="menu-1"
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Account</span>
          </div>

          <span className="menu-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>

        <div className="menu-item-collapse bg-black/40 backdrop-blur-lg rounded-xl">
          <div className="min-h-0">
            <NavLink
              to={`/dashboard/profile`}
              className={({ isActive }) =>
                `${menuItem} ${isActive ? menuActive : "text-white/90"
                } hover:bg-black/40 my-2 max-w-[85%] transition-all duration-300 rounded-lg`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to={`/dashboard/change-password`}
              className={({ isActive }) =>
                `${menuItem} ${isActive ? menuActive : "text-white/90"
                } hover:bg-black/40 my-2 max-w-[85%] transition-all duration-300 rounded-lg`
              }
            >
              Password
            </NavLink>
          </div>
        </div>
      </li>
      <NavLink to={"/room"}>
        <li>
          <div className="menu-item text-white/90 hover:bg-black/40 transition-all duration-300 rounded-lg">
            <IoHome className="text-xl" />

            <span>Room</span>
          </div>
        </li>
      </NavLink>

      <NavLink to={"/"} onClick={logOut}>
        <li>
          <div className="menu-item text-white/90 hover:bg-black/40 transition-all duration-300 rounded-lg">
            <IoIosLogOut className="text-red-400 text-xl" />
            <span>Logout</span>
          </div>
        </li>
      </NavLink>
    </>
  );

  return (
    <div
      className="flex flex-row sm:gap-10 min-h-screen"
      style={backgroundStyle}
    >
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="backdrop-blur-xl bg-black/40 sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full border border-white/10 shadow-2xl shadow-black/40">
          <style>{`
            .menu-item {
              margin: 0.5rem;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .menu-item-collapse {
              margin: 0.5rem;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .menu-toggle:checked + .menu-item .menu-icon {
              transform: rotate(-180deg);
            }

            .menu-toggle:checked + .menu-item + .menu-item-collapse {
              max-height: 100vh;
            }
          `}</style>

          <Link to={"/"} className="hover:opacity-80 transition-opacity">
            
            <div className="sidebar-title p-4 flex items-center justify-center">
              <img src={logo} className="h-10 w-auto mr-2" alt="Logo" />
              <p className=" text-white text-2xl font-semibold">MeatUp</p>
              
            </div>
          
          </Link>

          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <ul className="menu-items">{mainMenuItems}</ul>
              </section>
            </nav>
          </section>
        </aside>
      </div>

      <div className="flex w-full justify-center">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn btn-outline border-white/20 text-white/90 sm:hidden hover:bg-black/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </label>
        </div>

        <div className="w-full">
          <Outlet />
          <div className="popover fixed bottom-28 right-4 z-[99999]">
            <label
              className="popover-trigger my-2 cursor-pointer hover:shadow-xl hover:shadow-blue-400 rounded-full transition-all duration-300"
              tabIndex="0"
              onClick={toggleChatBot}
            >
              {isChatBotOpen ? (
                <img src={closeChat} alt="Close chat" className="w-10 h-10" />
              ) : (
                <img src={openChat} alt="Chat with AI" className="w-14 h-14" />
              )}
            </label>
            {isChatBotOpen && (
              <div
                className="popover-content popover-top-left absolute w-screen max-w-md bottom-full mb-4 md:mr-5 bg-black/90 backdrop-blur-lg border-2 border-white/20 rounded-xl"
                tabIndex="0"
              >
                <div className="popover-arrow bg-blue-400"></div>
                <div className="overflow-hidden rounded-lg">
                  <ChatBot onClose={toggleChatBot} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
