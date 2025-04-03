import React from "react";
import styled from "styled-components";
import { useEffect,useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAllData } from '../util/index';
import PropTypes from "prop-types";

export default function Login({ setIsAuthenticated }){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (event) => {
        event.preventDefault();
        const url = import.meta.env.VITE_REACT_APP_URL 
       
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
    
        try {
            const response = await fetch(url+"/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ 
                    "email": email, 
                    "password": password  
                })
            });
    
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
           
            
            setIsAuthenticated(true);
    
            // Ensure storage is updated before navigation
            setTimeout(() => {
                navigate("/");
            }, 100); // Small delay to ensure storage updates
    

        } catch (error) {
            alert(error.message);
            console.error("Login Error:", error);
        }
    };
    

   return(
    <Wrapper>
     <form onSubmit={handleLogin}>
     <div className="input-group">
            <label htmlFor="email">email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>    
        <div>
            <button type="submit">Login</button>
        </div>
        <div>
        <p>
          Not Registered Yet?
          <Link to="/Register" className="member-btn" > Register! </Link>
        </p>
      
        </div>
        </form>
    </Wrapper>
   ) 
}

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
  };
  
 
  
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
    
  `;
  