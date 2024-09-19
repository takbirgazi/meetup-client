import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  const isRoomRoute = location.pathname.startsWith("/room");
  return (
    <main>
      {!isRoomRoute && <Navbar />}
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      {/* Here is footer */}
    </main>
  );
};

export default Root;
