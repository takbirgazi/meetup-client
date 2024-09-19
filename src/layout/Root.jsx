import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import TitleBanner from "../shared/TitleBanner";
// import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  const isRoomRoute = location.pathname.startsWith("/room");
  const isSignUpRoute = location.pathname.startsWith("/signUp");
  const isSignInRoute = location.pathname.startsWith("/logIn");
  return (
    <main>
      {!isRoomRoute && <Navbar />}
      {isSignUpRoute && <TitleBanner title={'Create Account'} route={"Home / SignUp"} />}
      {isSignInRoute && <TitleBanner title={'User Sign In'} route={"Home / Login"} />}
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      {/* Here is footer */}
    </main>
  );
};

export default Root;
