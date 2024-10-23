import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
    EmailAuthProvider,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import app from "../FirebaseProivder/FirebaseProvider";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const auth = getAuth(app);
    const axios = useAxiosCommon();

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const profileUpdate = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };

    const passwordUpdate = async (password) => {
        setLoading(true);
        try {
            // const credential = await promptForCredentials();
            // await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, password);
        } catch (error) {
            console.error("Error updating password: ", error);
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post('/jwt', { email: currentUser?.email }, { withCredentials: true })
                    .then(res => {
                        localStorage.setItem('access-token', res.data.token);
                    })
                    .catch(error => console.log(error.message));
            } else {
                localStorage.removeItem('access-token');
            }
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        createAccount,
        profileUpdate,
        passwordUpdate,
        logIn,
        googleSignIn,
        githubSignIn,
        logOut,
    };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
