
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import  { toast } from "react-toastify";
import { API_URL } from "../endpoints"
import callApi from "../util/api";

export default function register(){

    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const [userData , setUserData] = useState({
        name:'' ,
        email:'' ,
        password:'' 
       
    })
   
    const handleRegister = async ()=>{        
        setError("");         
        const response = await callApi(`${API_URL}/auth/register`, "POST", {
            data: userData
        });

        const {data,status} = response;
        if (status !== 201) {
            toast.error(data?.message || "Network response was not ok.");
            //throw new Error(data?.message || "Network response was not ok.");
            return;
            
        } else {
            toast.success("User Registered successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };

    const handelCancel=()=>{
        navigate("/login") ;
    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    return(
        <Wrapper>
            Register New User
            <form   encType="multipart/form-data"
                    onSubmit={(e) => {
                        e.preventDefault();
                        
                    }}>

            
            <div className="input-group">
            <label htmlFor="name" > Name:</label>
            <input name="name" type="text" onChange={handlechange}></input>
             </div>
        <div className="input-group">
            <label htmlFor="email"> Email:</label>
            <input name="email" type="email" onChange={handlechange}></input>
        </div>
        <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" onChange={handlechange} />
        </div>
        {error && <div id="login-error" className="error-message">{error}</div>}
            <div className="btn-group">
                <button onClick={handleRegister}> Register </button>
                <button onClick={handelCancel}> Cancel </button>
            </div>
            </form>
        </Wrapper>
    )
}

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
  .btn-group{
   display: flex;
   justify-content: space-between;
   margin:20px;
  }
    p {
      margin-top: 5px;
      font-size: 14px;
    }
  button{
    padding: 10px 20px;
  font-size: 14px;
}
   .error-message {
        color: red;
        font-size: 12px;
        margin-top: 10px;
    }
  `;
  