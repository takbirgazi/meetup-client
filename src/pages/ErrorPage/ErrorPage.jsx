import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                <h2 className="text-2xl font-bold">404 | Page Not Found</h2>
                <NavLink to="/" className="border rounded px-3 py-1">Back</NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;