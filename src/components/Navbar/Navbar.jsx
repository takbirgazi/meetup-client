import moment from "moment";
import toast from "react-hot-toast";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/cat.png";
import logo from "../../assets/MeetUp.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="navbar bg-[#101827] h-[65px] shadow-lg shadow-[#1d283c] mx-auto z-50">
      <div className="navbar-start">
        <Link to="/" className="navbar-item font-bold text-white text-xl">
          <img src={logo} className="h-10 w-auto" />
        </Link>
      </div>
      <div className="navbar-end">
        {/* Current Time */}
        <div className="text-white font-semibold hidden md:block text-[18px] mr-2">
          {moment().format("h:mm A - ")}
          {moment().format("ll")}
        </div>

        {/* <IoSettingsOutline className="mx-2 md:mx-4 text-white text-2xl" /> */}

        {user ? (
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container">
              <div className="dropdown">
                <label
                  className="btn btn-ghost flex cursor-pointer px-0"
                  tabIndex="0"
                >
                  {/* {user?.photoURL ? (
                    <img src={user?.photoURL} alt="avatar" />
                  ) : (
                    <img src={avatar} alt="avatar" />
                  )} */}
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      alt="User Avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.ibb.co.com/swx9yyV/cat.png"; // Fallback image
                      }}
                      className="rounded-full"
                    />
                  ) : (
                    <img
                      src={avatar} // Fallback image
                      alt="Default Avatar "
                      className="rounded-full"
                    />
                  )}
                </label>

                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <Link to={"/dashboard"}>
                    <p className="dropdown-item text-sm flex-row items-center gap-2">
                      {" "}
                      {/* <IoMdPerson /> {user?.displayName} */} <MdDashboard />{" "}
                      Dashboard
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
              </div>
            </div>
          </div>
        ) : (
          <Link
            to={"/logIn"}
            className="text-black bg-white rounded-xl px-4 py-2 font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
