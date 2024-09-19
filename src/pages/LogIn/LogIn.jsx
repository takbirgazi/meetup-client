import React, { useEffect, useState } from 'react';
import { Link, ScrollRestoration, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEyeSlash, FaFacebookSquare, FaGithub, FaRegEye } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { logIn, googleSignIn, githubSignIn } = useAuth();
    const [viewPass, setViewPass] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = e => {
        // navigate('/loader');
        e.preventDefault();
        // console.log(e.target);
        const data = new FormData(e.target);

        const mail = data.get('mail');
        const password = data.get('password');

        e.target.reset();
        logIn(mail, password)
            .then(res => {
                Swal.fire({
                    title: `Hello ${res?.user?.displayName}!`,
                    text: "User Logged in Successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate('/');
            })
            .catch(error => {
                setError(error.message);
                // console.log(error);
            });
    }

    const setUserForProviders = (data, provider) => {
        const userInfo = {
            first_name: data.user?.displayName.split(' ')[0],
            last_name: (data.user?.displayName.split(' ')?.length > 1 ? data.user?.displayName.split(' ')[1] : ''),
            username: data?.user?.displayName,
            photoURL: data?.user?.photoURL,
            email: data?.user?.email,
            provider,
            createdAt: new Date().toUTCString(),
            role: 'general_user',
        };

        Swal.fire({
            title: `Hello ${data?.user?.displayName}!`,
            text: "User Logged in Successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        });
        navigate('/');
        //     Swal.fire({
        //         title: `Hello ${data?.user?.displayName}!`,
        //         text: "User Created & Logged in Successfully!",
        //         icon: "success",
        //         showConfirmButton: false,
        //         timer: 2000,
        //     });
        // }
        // navigate('/');
    }

    const handleGoogleSignIn = () => {
        // navigate('/loader');
        googleSignIn()
            .then(res => {
                setUserForProviders(res, 'google');
            })
            .catch(error => setError(error.message));
    }

    const handleGithubSignIn = () => {
        // navigate('/loader');
        githubSignIn()
            .then(res => {
                setUserForProviders(res, 'github');
            })
            .catch(error => setError(error.message));
    }

    return (
        <div>
            <ScrollRestoration />
            {/* <TitleBanner title={'LogIn'} route={'Home / SignIn'} /> */}
            <div className='w-full flex items-center justify-center  my-12'>
                <div className="bg-base-100 w-full max-w-lg shrink-0 shadow-xl rounded" >
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email *</span>
                            </label>
                            <input name='mail' type="email" placeholder="email" className="input input-bordered rounded min-w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password *</span>
                            </label>
                            <div className='relative'>
                                <input name='password' type={viewPass ? "text" : "password"} placeholder="password" className="input input-bordered rounded min-w-full" required />
                                <FaRegEye size={18} onClick={() => setViewPass(!viewPass)} className={viewPass ? "hidden" : 'opacity-75 absolute top-4 right-4'} />
                                <FaEyeSlash size={20} onClick={() => setViewPass(!viewPass)} className={viewPass ? 'opacity-75 absolute top-4 right-4' : "hidden"} />
                            </div>
                        </div>
                        {
                            error && <p className='text-xs text-red-500'>** {error} **</p>
                        }
                        <div className="form-control mt-6 space-y-6">
                            <button className="btn btn-warning text-white rounded-none uppercase ">Signin</button>
                            <div className='w-full flex justify-between items-center gap-3'>
                                <Link to={'/signUp'} className="btn bg-[#181818] hover:bg-white text-white hover:text-black rounded-none uppercase flex-1">Create An Account</Link>
                                <a className="btn text-black bg-base-100 hover:bg-[#181818] hover:text-white rounded-none uppercase flex-1">Forget password</a>
                            </div>
                        </div>
                        <div className="divider px-[5%]">or Sign In With</div>
                        <div className='w-full flex items-center justify-evenly'>
                            <FcGoogle onClick={handleGoogleSignIn} size={50} className="border-4 bg-base-300 p-2 rounded-badge cursor-pointer hover:scale-105 active:scale-100" />
                            <FaGithub onClick={handleGithubSignIn} size={50} className="border-4 bg-base-300 p-2 rounded-badge cursor-pointer hover:scale-105 active:scale-100" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;