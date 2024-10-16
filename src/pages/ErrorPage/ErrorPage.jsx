import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#101827] to-[#4e5668]">
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <h2 className="text-4xl font-bold text-[#0072f5]">404 | Page Not Found</h2>
                <NavLink to="/" className="rounded px-3 py-1 bg-gray-950 text-gray-200 hover:bg-[#0072f5]">Back</NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;