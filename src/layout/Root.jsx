import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {

  return (
    <main>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Root;