import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate ,Link } from 'react-router-dom';
import { API_URL } from "../endpoints";
import callApi from "../util/api";
import { useUserPhoto } from '../components/UserContext';
import { FcBiotech } from "react-icons/fc";

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { setUserPhoto } = useUserPhoto();


    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(""); 
        try {
            const response = await callApi(`${API_URL}/auth/login`, "POST", {
                data: { email, password }
            });
            if (!response) {
                throw new Error("No response from API.");
              }
            let {data:result,status} = response;
            if (status !== 200) {
                
                throw new Error(response.data.msg || 'Login failed. Please try again.');
            }            
            const {name,id,token} = result?.data;
           

            sessionStorage.setItem("token", token);        
            sessionStorage.setItem("userId", id);
            sessionStorage.setItem("userName", name);
            updateUserPhoto(token)
            if (token){
                navigate("/");
            }

        } catch (error) {
            console.log(error)
            const errMsg = error.response?.msg || error.message || "An error occurred.";
            setError(errMsg);
            console.error("Login Error:", error);
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    const updateUserPhoto = async (token)=>{
        try{
            const response = await callApi(`${API_URL}/api/users/profile`, "GET", {
                headers:{    Authorization: token}
                  }) ;

            console.log(response.data.data.profilePhoto )      

            let profilephoto =response?.data.data.profilePhoto ;    
               
            setUserPhoto(profilephoto)
        }
        catch(error){
            setError(error.message);
            console.error("Login Error:", error);
        } 
        
    }


    return (
        <Wrapper>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => (setEmail(e.target.value), setError(""))}
                        aria-describedby="email-error"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => (setPassword(e.target.value) , setError(""))}
                        aria-describedby="password-error"
                    />
                </div>
                {error && <div id="login-error" className="error-message">{error}</div>}
                <div>
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </div>
                <div>
                    <p>
                        Not Registered Yet?
                        <Link to="/Register" className="member-btn"> Register!</Link>
                    </p>
                    <p>
                        Forget Password?
                        <Link to="/forgetpassword" className="member-btn"> Click here!</Link>
                    </p>
                </div>
            </form>
        </Wrapper>
    );
}

// Login.propTypes = {
//     setIsAuthenticated: PropTypes.func.isRequired,
// };

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;

    form {
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        width: 280px;
    }
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    label {
        font-size: 14px;
        margin-bottom: 3px;
    }

    input {
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
    }

    button {
        background: #007bff;
        color: white;
        padding: 8px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }

    button:hover {
        background: #0056b3;
    }

    button:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
    }

    .member-btn {
        color: #007bff;
        text-decoration: none;
        margin-left: 5px;
    }

    .member-btn:hover {
        text-decoration: underline;
    }

    .error-message {
        color: red;
        font-size: 12px;
        margin-top: 10px;
    }
`;
