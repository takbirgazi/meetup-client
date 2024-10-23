import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while authentication is still in progress
    if (loading) {
        return (
            <div className="bg-[#101827] flex flex-row justify-center items-center h-screen">
                <svg className="spinner-ring spinner-primary spinner-xl" viewBox="25 25 50 50" strokeWidth="5">
                    <circle cx="50" cy="50" r="20" />
                </svg>
            </div>
        );
    }

    // Redirect to login if no user is authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the child components if user is authenticated
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
