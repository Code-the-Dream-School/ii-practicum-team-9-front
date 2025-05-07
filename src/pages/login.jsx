import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from "../endpoints";
import callApi from "../util/api";
import styles from './Login.module.css';
import backgroundBarter from '../assets/backgroundbarter.jpeg';

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(""); 
        try {
            const response = await callApi(`${API_URL}/auth/login`, "POST", {
                data: { email, password }
            });
            let {data:result,status} = response;
            if (status !== 200) {
                throw new Error(response.data.msg || 'Login failed. Please try again.');
            }            
            const {name,id,token} = result?.data;

            sessionStorage.setItem("token", token);        
            sessionStorage.setItem("userId", id);
            sessionStorage.setItem("userName", name);
            if (token){
                navigate("/");
            }

        } catch (error) {
            setError(error.message);
            console.error("Login Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1>Welcome Back</h1>
                    <p className={styles.subtitle}>Barter App - Where community comes together to exchange, engage, and support one another</p>
                    <form onSubmit={handleLogin}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => (setEmail(e.target.value), setError(""))}
                                aria-describedby="email-error"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => (setPassword(e.target.value), setError(""))}
                                aria-describedby="password-error"
                                placeholder="Enter your password"
                            />
                        </div>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                        <button type="submit" disabled={isSubmitting} className={styles.loginButton}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                        <div className={styles.links}>
                            <p>
                                Not Registered Yet?{' '}
                                <Link to="/Register" className={styles.link}>Register!</Link>
                            </p>
                            <p>
                                Forgot Password?{' '}
                                <Link to="/forgetpassword" className={styles.link}>Click here!</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className={styles.imageContainer} style={{ backgroundImage: `url(${backgroundBarter})` }}>
                </div>
            </div>
        </div>
    );
}
