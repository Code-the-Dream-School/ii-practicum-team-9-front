
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default  function forgetpassword(){

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

    return (
        <Wrapper>
            <div className="email-section">
                <label htmlFor="email">Enter your email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <button type="button" onClick={handleVerifyingEmail}>Submit</button>
            </div>
            {emailVerifield} && 
            <div className="verifying-section">
                <p>A verification code sent to your email. Please enter it here to reset password </p>
                <label htmlFor="verify">verification code </label>
                <input type="text" name="verify" onChange={(e) => setVerifyCode(e.target.value)}/>
                <button type="button" onClick={handleVerifyingEmail}>Submit</button>
            </div>


        </Wrapper>
    )
}


const Wrapper = styled.section`

`