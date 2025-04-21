import React, { useState } from "react";
import styled from "styled-components";
import { API_URL } from "../endpoints" ;
import { useNavigate } from "react-router-dom";

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const allInterests = ["Technology", "Art", "Music", "Sports", "Travel", "Reading", "Gaming"];

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    interests: [],
  });
  const navigate= useNavigate() ;

    // fetch(`${API_URL}/api/profile`, {
    //                     method: "GET",
    //                     headers: {
                            
    //                         "Content-Type": "application/json",
    //                     },
                       
    //                    body: JSON.stringify(userData),
    //                 })
    //                     .then((response) => {
                          
    //                         if (!response.ok) {
    //                             return response.json().then((errorData) => {
    //                                 console.log(errorData);
    //                                 throw new Error(errorData?.msg || "Network response was not ok.");
    //                             });
                               
    //                         }
    //                         return response.json();
    //                     })
    //                     .then(() => {
    //                         toast.success("User Registered successfully!");
                
    //                         setTimeout(() => {
    //                             navigate("/login");
    //                         }, 1000);
    //                     })
    //                     .catch((error) => {
    //                         setError(error.message);
    //                         console.error("Error:", error);
    //                     });
               



  const handleEdit = (e) => {
    navigate("/EditProfile")
  };

  return (
    <Wrapper>
        
        <div className="container">
        <h4>My Profile</h4>
          <div className="profilePic">
          {preview ? (
              <img src={preview} alt="Avatar" className="avatarPreview" />
            ) : (
              <div className="avatarPlaceholder">No Image</div>
            )}
          </div>
          <div className="info">
            <label name="username" >{formData?.username || "userId" }</label>
            <label name="username"  >{formData?.name || "name"} </label>
            <label name="bio"  defaultValue={"Bio"} > {formData?.bio || "bio"}</label>
        </div>

        <fieldset className="bioSection">
          <legend>Interests:</legend>
          {allInterests.map((interest) => (
            <label key={interest} className="checkboxLabel" >
              
              {interest}
            </label>
          ))}
        </fieldset>

        <div className="bottomSection">
          <label>
            Location:
            
          </label>
        </div>
        
        <button type="submit" onClick={handleEdit}>Edit Profile</button>
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;  
  align-items: center;      
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px 20px;
  box-sizing: border-box;


  h4{
     text-align: center;
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 20px;
  
  }

  label{
  display: inline-block; 
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 5px;
  background-color: #f9f9f9; 
  margin-bottom: 8px
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 250px;
  }

  .profilePic img{
  display: flex;
  justify-content: center;  
  align-items: center;      
    
    flex-direction: column;
    border: 1px solid #ccc;
    gap: 10px;
    min-width: 250px;
    border: 2px solid rgb(239, 241, 65) 
    padding: 4px; 
    background-color: #fff;
  }

  .avatarPreview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgb(239, 241, 65) 
    padding: 4px; 
    background-color: #fff;  
  }

  input, textarea, select {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
    width: 100%;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  label {
    font-weight: bold;
  }

  .checkboxLabel {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 5px 0;
  }

  .bottomSection {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    padding: 0.7rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    width: fit-content;
  }

  button:hover {
    background: #45a049;
  }

  @media (max-width: 600px) {
    .topSection {
      flex-direction: column;
    }
  }
`;
