import { Link, NavLink } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
import moment from 'moment';
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";


const Navbar = () => {
  return (
    <div className="bg-[#1E3799] w-full h-[65px]">
      <div className="navbar h-full bg-[#1E3799] max-w-screen-xl  border-none shadow-none mx-auto rounded-sm">
        <div className="navbar-start">
          <Link to="/" className="navbar-item font-bold text-white text-xl">
            <img src={logo1} className="h-full w-[80px] md:w-[100px]"/>
          </Link>
        </div>
        <div className="navbar-end">
          {/* Current Time */}
        <div className="text-white font-semibold hidden md:block text-[18px]">
          {moment().format('h:mm A - ')}
          {moment().format('ll')}
        </div>

        <IoSettingsOutline className="mx-2 md:mx-4 text-white text-2xl" />

        {/* <button className="text-black bg-white rounded-xl px-4 py-2 font-bold">Login</button> */}

          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container">
              <div className="dropdown">
                <label
                  className="btn btn-ghost flex cursor-pointer px-0"
                  tabIndex="0"
                >
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    alt="avatar" 
                  />
                </label>
                
                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <p className="dropdown-item text-sm flex-row items-center gap-2">Hafsa <IoMdPerson /></p>
                  
                  <NavLink tabIndex="-1" className="dropdown-item text-sm flex-row items-center gap-2">
                    Logout <MdLogout />
                  </NavLink>

                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
