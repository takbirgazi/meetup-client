import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import Logo_main from '../assets/images/logo_main.png'
import Logo_outline from '../assets/images/logo_outline.png'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while authentication is still in progress
    if (loading) {
        return (
            <div className="bg-[#101827] flex flex-col justify-center items-center h-screen">
                <div className="relative flex items-center justify-center">
                    <img
                        src={Logo_main}
                        alt="Logo Main"
                        className="absolute w-20 h-20"
                    />
                    <img
                        src={Logo_outline}
                        alt="Logo Outline"
                        className="w-30 h-32 animate-spin-slow"
                    />
                </div>
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
