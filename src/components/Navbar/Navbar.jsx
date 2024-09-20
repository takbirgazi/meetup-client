import moment from "moment";
import { IoMdPerson } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo1 from "../../assets/logo1.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("user Logged out!!");
        Swal.fire({
          title: "Good Bye!",
          text: "User logout successful!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log("logout failed!!");
        Swal.fire({
          title: "Error Occured!",
          text: "User logout Failed!",
          icon: "error",
          showConfirmButton: false,
          footer: error.message,
          timer: 2000,
        });
      });
  };

  return (
    <div className="navbar bg-[#1E3799] h-[65px]  border-none shadow-none mx-auto rounded-sm">
      <div className="navbar-start">
        <Link to="/" className="navbar-item font-bold text-white text-xl">
          <img src={logo1} className="h-full w-[80px] md:w-[100px]" />
        </Link>
      </div>
      <div className="navbar-end">
        {/* Current Time */}
        <div className="text-white font-semibold hidden md:block text-[18px]">
          {moment().format("h:mm A - ")}
          {moment().format("ll")}
        </div>

        <IoSettingsOutline className="mx-2 md:mx-4 text-white text-2xl" />

        {user ? (
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container">
              <div className="dropdown">
                <label
                  className="btn btn-ghost flex cursor-pointer px-0"
                  tabIndex="0"
                >
                  <img src={user?.photoURL} alt="avatar" />
                </label>

                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <p className="dropdown-item text-sm flex-row items-center gap-2">
                    {" "}
                    <IoMdPerson /> {user?.displayName}
                  </p>

                  <div
                    onClick={handleLogout}
                    tabIndex="-1"
                    className="dropdown-item text-sm flex-row items-center gap-2"
                  >
                    Logout <MdLogout />
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
