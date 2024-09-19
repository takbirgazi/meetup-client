import React, { createContext } from 'react';
import app from '../FirebaseProivder/FirebaseProvider';
import {getAuth} from 'firebase/auth';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const auth = getAuth(app);


    const authInfo = {
        user: 'hello',
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;