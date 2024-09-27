
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";



const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (user) {
        return children
    }
    if (loading) {
        return <>
            <div className=" text-center">
                <span className="loading loading-dots w-8 text-primary"></span>
                <span className="loading loading-dots w-12 text-secondary"></span>
                <span className="loading loading-dots w-16 text-accent"></span>
                <span className="loading loading-dots w-20 text-info"></span>
            </div>
        </>
    }

    return <Navigate state={location.pathname} to={'/login'} ></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;