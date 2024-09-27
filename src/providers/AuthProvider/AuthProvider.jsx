import React, { createContext, useEffect, useState } from 'react';
import app from '../FirebaseProivder/FirebaseProvider';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import useAxiosCommon from '../../hooks/useAxiosCommon';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    // const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const auth = getAuth(app);
    const axios = useAxiosCommon();

    const createAccount = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const profileUpdate = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName, photoURL
        });
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, curUser => {
            const loggedUser = curUser ? {email: curUser?.email} : {email: user?.email};
            console.log("user from observer : " + curUser);
            // console.log(curUser);
            setLoading(false);
            setUser(curUser);
                if(curUser){
                    axios.post('/jwt',loggedUser, {withCredentials: true})
                    .then(res=>{
                        if(res?.data?.success){
                            console.log(res.data);
                        }
                    })
                }else{
                    axios.post('/logout', loggedUser, {withCredentials: true})
                    .then(res=>{
                        if(res?.data?.success){
                            console.log(res.data);
                        }
                    })
                }
        });

        return () => {
            unSubscribe();
        }
    },[]);


    const authInfo = {
        user,
        loading,
        createAccount,
        profileUpdate,
        logIn,
        googleSignIn,
        githubSignIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;