
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../endpoints";

export default  function forgetpassword(){
    const navigate = useNavigate();
    const[email , setEmail] = useState("")
    const[emailVerifield , setEmailVerified] = useState(false)
    const[verifiedCode , setVerifyCode] = useState(false)
    const[OTPentered , setOTPentered] = useState()

    const[UserId , setUserId] = useState()
    const [error, setError] = useState("");

    const handleVerifyingEmail=()=>{
        setError(""); 
       

        fetch(`${API_URL}/reset` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email })
        }).then((response) => {
                      
            if (!response.ok) {
                return response.json().then((errorData) => {
                    console.log(errorData);
                    throw new Error(errorData?.msg || "Network response was not ok.");
                });
               
            }
            return response.json();
        
        }).then((data)=>{
            
             setEmailVerified(true)
        }).catch((error) => {
            setError(error.message);
            console.error("Error:", error);
            setEmailVerified(false)
        })
        
    }

    const handleVerifyCode=()=>{
        setError(""); 
        if (emailVerifield){
            fetch(`${API_URL}/reset/validateCode` ,{
                method:'POST' ,
                header:{
                    'Content-Type' :'application/json'
                },
                body: JSON.stringify({OTPentered })
            })
            .then((response) => {
                      
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        console.log(errorData);
                        throw new Error(errorData?.msg || "Network response was not ok.");
                    });
                   
                }
                return response.json();
            
            }
            ).then(()=>{
              //  setVerifyCode(true)
                navigate("/resetpassword")

        }).catch((error) => {
            setError(error.message);
            console.error("Error:", error.message);
           // setVerifyCode(false)
        })
        }
            
    }

    return (
        <Wrapper>
              {!emailVerifield && <div className="email-section" >
                <label htmlFor="email">Enter your email</label>
                <input name="email" type="email" onChange={(e) => (setEmail(e.target.value) , setError(""))}/>
                <button type="button" onClick={handleVerifyingEmail}>Submit</button>
            </div>}
            {emailVerifield &&
            <div className="verifying-section">
                <p>A verification code sent to your email. Please enter it here to reset password </p>
                <label htmlFor="verify">verification code </label>
                <input type="text" name="verify" onChange={(e) => (setOTPentered(e.target.value) , setError(""))}/>
                <button type="button" onClick={handleVerifyCode}>Submit</button>
            </div>}
            {error && <div id="login-error" className="error-message">{error}</div>}    

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