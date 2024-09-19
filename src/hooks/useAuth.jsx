import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider/AuthProvider';

const useAuth = () => {
    const authInfo = useContext(AuthContext);

    return authInfo;
};

export default useAuth;