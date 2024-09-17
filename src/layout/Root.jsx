import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
    return (
        <main className="max-w-screen-xl mx-auto">
            <Navbar />
            <div>
                <Outlet />
            </div>
            {/* Here is footer */}
        </main>
    );
};

export default Root;