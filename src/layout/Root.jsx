import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {

  return (
    <main>
      <div>
        <Outlet />
      </div>
      <Toaster />
    </main>
  );
};

export default Root;