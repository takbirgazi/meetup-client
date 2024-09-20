import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  const isRoomRoute = location.pathname.startsWith("/room");
  return (
    <main>
      {!isRoomRoute && <Navbar />}
      {/* <div className="max-w-screen-xl mx-auto"> */}
      {/* note: here a fixed sized screen for all outlets is creating problem. so I commented this out here */}
      <div>
        <Outlet />
      </div>
      {/* Here is footer */}
    </main>
  );
};

export default Root;
