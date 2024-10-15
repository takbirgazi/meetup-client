import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main>
      <div>
        <Outlet />
      </div>
      <Toaster position="bottom-right" reverseOrder={true} />
    </main>
  );
};

export default Root;
