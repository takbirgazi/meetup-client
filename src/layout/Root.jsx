import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <main className="max-w-screen-xl mx-auto">
            {/* Here is navbar  */}
            <div>
                <Outlet />
            </div>
            {/* Here is footer */}
        </main>
    );
};

export default Root;