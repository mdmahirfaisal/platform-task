import React, { useState } from 'react'
import './Home.css';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { register, handleSubmit } = useForm();
    const { user, signInWithGoogle, registerUser, loginUser, } = useAuth();
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPass, setNewPass] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    //// Login with google 
    const handleGoogleLogin = () => {
        signInWithGoogle(location, navigate);
    };

    //// handle register
    const handleRegisterSubmit = () => {
        registerUser(newEmail, newPass, newName, navigate)
    }

    //// handle login
    const handleLoginSubmit = (data) => {
        console.log(data)
        loginUser(data.email, data.password, location, navigate)
    };

    const imageButton = () => {
        document.querySelector('.cont').classList.toggle('s--signup');
    }
    const admin = "admin@gmail.com";
    const password = "123456";


    return (
        <>
            <div className="bg-gray-100 h-screen">
                {user.email ?
                    <>
                        <h1 className='text-4xl text-center pt-12'>Welcome</h1>
                        <h1 className='w-96 mx-auto pb-12 mt-5'><Link to="/dashboard">
                            <Button color='secondary' variant='contained'>Please go to dashboard</Button>
                        </Link> </h1>
                    </>
                    :
                    <>
                        <h1 className='text-4xl text-center text-red-500 font-semibold py-12'>Please Sign up or Sign in </h1>
                    </>
                }
                {/* ______________________________________________  */}

                <div className="first-form ">
                    <div className="cont shadow" style={{ borderRadius: '20px' }}>
                        <div className="form sign-in">
                            <h2>Welcome back,</h2>
                            <form onSubmit={handleSubmit(handleLoginSubmit)} className='mb-3'>
                                <TextField sx={{ width: '50%', m: 1, textAlign: 'center' }}
                                    defaultValue={admin}
                                    type="email" {...register("email")} label="Your Email" variant="standard" />

                                <TextField sx={{ width: '50%', m: 1, textAlign: 'center' }} className="mb-3"
                                    defaultValue={password}
                                    {...register("password")} label="Your Password"
                                    type="password"
                                    variant="standard" />

                                <Button type="submit" sx={{ width: '50%', m: 1, mt: 2 }} variant="contained">Login</Button>
                            </form>
                            <Button onClick={handleGoogleLogin} sx={{ width: '75%', m: 1, mt: 2 }} className="fb-btn " variant="outlined"> <span className='text-dark '>Connect with</span> <span><GoogleIcon /></span></Button>
                        </div>
                        <div className="sub-cont">
                            <div className="img">
                                <div className="img__text m--up">
                                    <h2>New here?</h2>
                                    <p>Sign up and discover great amount of new opportunities!</p>
                                </div>
                                <div className="img__text m--in">
                                    <h2>One of us?</h2>
                                    <p>If you already has an account, just sign in. We've missed you!</p>
                                </div>
                                <div onClick={imageButton} className='img__btn'>
                                    <span className="m--up">Sign Up</span>
                                    <span className="m--in">Sign In</span>
                                </div>
                            </div>
                            <div className="form sign-up">
                                <h2>Time to feel like home,</h2>
                                <form className='mb-3'>
                                    <TextField sx={{ width: '50%', m: 1 }}
                                        name="name" type="text" onChange={(e) => setNewName(e.target.value)} label="Your Name" variant="standard" required />

                                    <TextField sx={{ width: '50%', m: 1 }}
                                        name="email" type="email" onChange={(e) => setNewEmail(e.target.value)} label="Your Email" variant="standard" required />

                                    <TextField sx={{ width: '50%', m: 1 }}
                                        name="password" type="password" className="mb-3" onChange={(e) => setNewPass(e.target.value)} label="Your Password" variant="standard" required />

                                    <Button onClick={handleRegisterSubmit} sx={{ width: '50%', m: 1, mt: 2 }} variant="contained">Sign up</Button>
                                </form>
                                <Button onClick={handleGoogleLogin} sx={{ width: '75%', m: 1, mt: 2 }} className="fb-btn " variant="outlined"> <span className='text-dark '>Connect with</span> <span><GoogleIcon /></span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;