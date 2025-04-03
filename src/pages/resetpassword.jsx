import React from "react"
import styled from "styled-components"
import { useState } from "react"
export default function resetpassword(){
    
    return (
        <Wrapper>
            <div className="email-section" >
                <label htmlFor="password1">Enter your email</label>
                <input name="password1" type="password" onChange={(e) => setEmail(e.target.value)}/>
              
            </div>
            <div className="email-section" >
                <label htmlFor="email">Enter your email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                
            </div>
            <button type="button" onClick={handleVerifyingEmail}>Submit</button>
        </Wrapper>
    )
}


const Wrapper = styled.section`


`