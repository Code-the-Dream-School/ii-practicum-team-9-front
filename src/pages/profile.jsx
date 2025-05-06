import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API_URL } from "../endpoints";
import { useNavigate } from "react-router-dom";
import profile_noImage from "../assets/profile_noImage.png";
import { FaEdit } from "react-icons/fa"; 
import { GrContactInfo } from "react-icons/gr";
import {US_STATES , ALL_INTERESTS} from "../data.js"

const usStates = US_STATES ;

const allInterests = ALL_INTERESTS;


export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(profile_noImage);
  const [profileData, setProfileData] = useState({
    
    role: "",
    location: "",
    profilePhoto: "",
    userProfilePhotoURL: "",
    interests: [],
    user: {},
    bio: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setProfileData(data.data)})
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <Wrapper>
      <div className="container">
        <div className="title">My Profile</div>
        <hr className="my-line"/>
        <div className="topSection">
            <div className="profilePic">
            {profileData.profilePhoto ? (
                <img src={profileData.profilePhoto} alt="ProfilePhoto" className="avatarPreview" />
            ) : (
                <img src={preview} alt="ProfilePhoto" className="avatarPreview" />
            )}
            
            </div>
            <div className="info1">
            <label>{profileData?.user.email || "userId"}</label>
            <label>{profileData?.user.name || "name"}</label>
            </div>
        </div>    
        <hr className="my-line"/>
        <div className="info2">
        <div className="icon-style"><GrContactInfo  className="contanct-style"/></div><label>{profileData?.bio || "bio"}</label>
        </div>
        <hr className="my-line"/>
        <div className="info3">
        <label>Location: {profileData.location}</label>
        <label>Role: {profileData.role}</label>
        <label></label>
        </div>
        
        <fieldset className="bioSection">
          <legend>Interests:</legend>
          {profileData.interests.map((interest) => (
            <label key={interest} className="checkboxLabel">
              {interest}
            </label>
          ))}
        </fieldset>

        
        
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 10px 20px;
  box-sizing: border-box;

  .my-line {
    border: none;
    height: 2px;
    background-color: #ccc;
    margin: 20px 0;
  }
  .title {
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #333;
    font-size: 1 rem;
    font-weight: 500;
  }

.topSection{

    display: flex;
    flex-direction: row; 
    
   

}
.contanct-style{
font-size: 20px;  
  color: yellow;   
}
.icon-style{
background: black;
border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

  .container {
    display: flex;
    flex-direction: column; 
    flex-direction: column;
   
    background-color: white;
   
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .profilePic {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    position: relative;
  }

  .profilePic .avatarPreview {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .editIcon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #fff;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #666;
  }

  .editIcon:hover {
    background-color: #f9f9f9;
    color: #333;
  }
    .info1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    min-width: 250px;
    font-size: 0.8 rem;
    font-weight: 500;

   }
  .info2 {
     display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  min-width: 250px;
  }

  .info3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  min-width: 250px;
  }
.info4 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  min-width: 250px;
  }
  .info label {
    font-size: 1rem;
    color: #333;
    margin-bottom: 8px;
  }

  .checkboxLabel {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 5px 0;
    padding: 8px 15px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #f9f9f9;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .bioSection, .tagSection {
    margin-top: 20px;
  }

  
`;

