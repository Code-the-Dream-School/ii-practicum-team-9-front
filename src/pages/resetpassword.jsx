import React from "react"
import styled from "styled-components"
import { useState  } from "react"
import { toast, ToastContainer } from "react-toastify"
import { API_URL } from "../endpoints";
import {  useLocation ,useNavigate } from "react-router-dom";

export default function resetpassword(){
    const navigate = useNavigate();
    const[password , setPassword] = useState("")
    const[confirmPassword , setconfirmPassword] = useState("")
    //const[UserId , setUserId]=useState(_UserId)
    const [error, setError] = useState("");
    const location = useLocation();
    const userId = location.state?.userId;
    
    const handleVerifyingPassword=()=>{
    
        console.log("userId" , userId)

        if (password ===""  ){
            setError("Enter password! ") 
            return;
        }
        if (confirmPassword ===""  ){
            setError("confirm password! ") 
            return;
        }

        if (password.length <6 || confirmPassword.length <6 ){
            setError("Password Length Should be more than 5!") 
            return;
        }
        if (password !== confirmPassword ){
            setError("Password does not match!") 
            return;
        }
        console.log(`${API_URL}/reset/${userId}`)
        fetch(`${API_URL}/reset/${userId}` , {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ password })
                }).then((response) => {
                              
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            console.log(errorData);
                            throw new Error(errorData?.msg || "Network response was not ok.");
                        });
                       
                    }
                    return response.json();
                
                }).then((data)=>{
                    toast.success("Password Updated Successfully!")
                    navigate("/login")
                    
                }).catch((error) => {
                    setError(error.message);
                    console.error("Error:", error);
                   
                })



    }
    
    return (
        <Wrapper>
            <ToastContainer/>
            <form>
            <div className="input-group" >
                <label htmlFor="password">Enter your passowrd</label>
                <input name="password" type="password" onChange={(e)=>{setError(""); setPassword(e.target.value)}}/>
              
            </div>
            <div className="input-group" >
                <label htmlFor="confirmPassword">confirm your password</label>
                <input name="confirmPassword" type="password" onChange={(e)=>{setError(""); setconfirmPassword(e.target.value)}}/>
                
            </div>
            {error &&  <div id="login-error" className="error-message">{error}</div>}
            <button type="button" onClick={handleVerifyingPassword}>Submit</button>
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

`