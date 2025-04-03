
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default  function forgetpassword(){
    const nav = useNavigate();
    const[email , setEmail] = useState("")
    const[emailVerifield , setEmailVerified] = useState(false)
    const[verifyCode , setVerifyCode] = useState("")
    const handleVerifyingEmail=()=>{
        if(!email){
            toast("Please enter email!")
            return ;
        }

        //fetch('').then()
        setEmailVerified(true) 
    }

    const handleVerifyCode=()=>{
        //if (emailVerifield)
            nav("/resetpassword")
    }

    return (
        <Wrapper>
              {!emailVerifield && <div className="email-section" >
                <label htmlFor="email">Enter your email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <button type="button" onClick={handleVerifyingEmail}>Submit</button>
            </div>}
            {emailVerifield &&
            <div className="verifying-section">
                <p>A verification code sent to your email. Please enter it here to reset password </p>
                <label htmlFor="verify">verification code </label>
                <input type="text" name="verify" onChange={(e) => setVerifyCode(e.target.value)}/>
                <button type="button" onClick={handleVerifyCode}>Submit</button>
            </div>}


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
    
`