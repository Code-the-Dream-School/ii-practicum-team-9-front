
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import  { toast } from "react-toastify";
import { API_URL } from "../endpoints"


export default function register(){

    const navigate = useNavigate();
    
    
    const [userData , setUserData] = useState({
        name:'' ,
        email:'' ,
        password:'' 
       
    })
    const handleRegister = ()=>{
        
        const url = backend_URL ;
       fetch(`${API_URL}/auth/register`, {
                    method: "POST",
                    headers: {
                        
                        "Content-Type": "application/json",
                    },
                   
                   body: JSON.stringify(userData),
                })
                    .then((response) => {
                      
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then(() => {
                        toast.success("User Registered successfully!");
            
                        setTimeout(() => {
                            navigate("/login");
                        }, 1000);
                    })
                    .catch((error) => {
                        toast.error("Failed to add class. Please try again.");
                        console.error("Error:", error);
                    });
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
  `;
  