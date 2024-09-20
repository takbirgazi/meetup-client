import React, { useState } from 'react';
import { Link, ScrollRestoration, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import TitleBanner from '../../shared/TitleBanner';

const SignUp = () => {
    const { createAccount, profileUpdate } = useAuth();
    const [error, setError] = useState(null);
    const [passStrength, setPassStrength] = useState(null);
    const [viewPass, setViewPass] = useState(false);
    const [viewConfPass, setViewConfPass] = useState(false);
    const [allPass, setAllPass] = useState({ pass: null, conf: null });
    const navigate = useNavigate();

    const handlePasswordStrength = e => {
        // console.log(e.target.value);
        const pass = e.target.value;

        setAllPass({ pass, conf: allPass.conf });

        if (pass.length == 0) {
            setPassStrength('');
        } else if (!(/^(?=.*[A-Z])/.test(pass))) {
            setPassStrength('At least one capital letter is required');
            return;
        } else if (!(/^(?=.*[a-z])/.test(pass))) {
            setPassStrength('At least one small letter is required');
            return;
        } else if (!(/^(?=.*\d)/.test(pass))) {
            setPassStrength('At least one digit is required');
            return;
        } else if (!(/^(?=.*[@$!%*?&.])/.test(pass))) {
            setPassStrength('At least one special character is required');
            return;
        } else if (!(/^.{6,}/.test(pass))) {
            setPassStrength('At least 6 characters are required');
            return;
        } else {
            setPassStrength(null);
        }
    }

    const mismatchingChecker = e => {
        setAllPass({ pass: allPass.pass, conf: e.target.value });

        if (passStrength) {
            setError('Create password with the requirements');
            return;
        } else if (allPass.pass != e.target.value) {
            setError('Password confirmation mismatched!!');
            return;
        } else if (e.target.value.length == 0) {
            setError('');
        } else {
            // console.log(passStrength);
            setError(null);
        }

    }

    const handleSignUp = e => {
        e.preventDefault();

        const data = new FormData(e.target);
        const first_name = data.get('first_name');
        const last_name = data.get('last_name');
        const username = data.get('username');
        const mail = data.get('mail');
        const phone = data.get('phone');

        // e.target.reset();

        const userInfo = {
            first_name,
            last_name,
            username,
            email: mail,
            phone,
            password: allPass.pass,
            createdAt: new Date().toISOString(),
            role: 'general-user',
        }


        createAccount(mail, allPass.pass)
            .then(res => {
                profileUpdate(username, null)
                    .then(data => {
                        // console.log("username updated.")
                        Swal.fire({
                            title: "Great job!",
                            text: "Your Account Registered Successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        navigate('/');
                        e.target.reset();
                    })
                    .catch(error => console.log(error.message))
            })
            .catch(error => console.log(error))
    }
    // console.log(allPass);
    return (
        <div className=''>
            <ScrollRestoration />
            <TitleBanner title={"Create Account"} route={"Home / SignUp"} />
            <div className='w-full flex items-center justify-center  my-20'>
                <form onSubmit={handleSignUp} class="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-4 sm:p-20">
                    <div class="form-group">
                        <div className='w-full flex justify-between'>
                            <div className="form-field w-[48%]">
                                <label className="form-label">
                                    First Name *
                                </label>
                                <input name="first_name" placeholder="John" className="input " required />
                            </div>
                            <div className="form-field w-[48%]">
                                <label className="form-label">
                                    Last Name *
                                </label>
                                <input name="last_name" placeholder="Doe" className="input" required />
                            </div>
                        </div>
                        <div className="form-field w-full">
                            <label className="label w-full">
                                Username *
                            </label>
                            <input type="text" name='username' placeholder="demo_name" className="input max-w-full" required />
                        </div>
                        <div className="form-field">
                            <label className="form-label">
                                Email *
                            </label>
                            <input type="email" name='mail' placeholder="customer@demo.com" className="input max-w-full" required />
                        </div>
                        <div className="form-field">
                            <label className="form-label">
                                <span className="label-text">Password *</span>
                            </label>
                            <div className='relative'>
                                <input onChange={handlePasswordStrength} type={viewPass ? "text" : "password"} name='password' placeholder="password" className="input max-w-full" required />
                                <FaRegEye size={18} onClick={() => setViewPass(!viewPass)} className={viewPass ? "hidden" : 'opacity-75 absolute top-4 right-4'} />
                                <FaEyeSlash size={20} onClick={() => setViewPass(!viewPass)} className={viewPass ? 'opacity-75 absolute top-4 right-4' : "hidden"} />
                            </div>
                        </div>
                        {
                            allPass.pass ? (passStrength ? <p className='text-xs text-red-500'>** {passStrength} **</p> : <p className='text-xs text-green-500'>** your password is strong now **</p>) : <></>
                        }
                        <div className="form-field">
                            <label className="form-label">
                                <span className="label-text">Confirm Password *</span>
                            </label>
                            <div className='relative'>
                                <input onChange={mismatchingChecker} type={viewConfPass ? "text" : "password"} name='conf_password' placeholder="password" className="input max-w-full" required />
                                <FaRegEye size={18} onClick={() => setViewConfPass(!viewConfPass)} className={viewConfPass ? "hidden" : 'opacity-75 absolute top-4 right-4'} />
                                <FaEyeSlash size={20} onClick={() => setViewConfPass(!viewConfPass)} className={viewConfPass ? 'opacity-75 absolute top-4 right-4' : "hidden"} />
                            </div>
                        </div>
                        {
                            allPass.conf ? (error ? <p className='text-xs text-red-500'>** {error} **</p> : <p className='text-xs text-green-500'>** you're okay now **</p>) : <></>
                        }
                        <div class="form-field">
                            <div class="form-field justify-between flex-row">
                                <div class="flex gap-2">
                                    <input type="checkbox" class="checkbox" />
                                    <a href="#">Remember me</a>
                                </div>
                                <label class="form-label">
                                    <a class="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                                </label>
                            </div>
                        </div>
                        <div className='flex items-center justify-start gap-2 pt-4'>
                            <input type="checkbox" className="checkbox checkbox-sm" required />
                            <h4 className='text-sm font-semibold'>{"I've read and accept the Privacy Policy"}</h4>
                        </div>
                        <p className='text-xs'>By signing up, you agree to our <a href="#" className='font-semibold hover:underline hover:text-yellow-600'>Terms of Services.</a> Learn how we collect and use your data in our <a href="#" className='font-semibold hover:underline hover:text-yellow-600'>Privacy Policy.</a></p>
                        <div class="form-field pt-5">
                            <div class="form-field justify-between">
                                <input type="submit" class="btn btn-primary w-full" value={'Sign Up'} />
                            </div>
                        </div>

                        <div class="form-field">
                            <div class="form-control">
                                <a class="text-sm cursor-auto text-blue-500">Already have an account? <Link to={'/logIn'} className='link link-underline-hover link-primary'>Sign In</Link></a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;