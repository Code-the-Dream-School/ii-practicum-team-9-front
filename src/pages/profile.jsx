import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API_URL } from "../endpoints";
import { useNavigate } from "react-router-dom";
import profile_noImage from "../assets/profile_noImage.png";
import { FaEdit } from "react-icons/fa"; 

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
const tags =  [
  "electronics", "furniture", "clothing", "gardening services", "free", "willing to trade"
];

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(profile_noImage);
  const [profileData, setProfileData] = useState({
    user: "",
    role: "user",
    location: "",
    profilePhoto: "",
    userProfilePhotoURL: "",
    interests: [],
    tags: [],
    bio: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetch(`${API_URL}/api/profile/profile`, {
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
      .then((data) => setProfileData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (e) => {
    navigate("/EditProfile");
  };

  return (
    <Wrapper>
      <div className="container">
        <h4>My Profile</h4>
        <div className="profilePic">
          {profileData.profilePhoto ? (
            <img src={profileData.profilePhoto} alt="ProfilePhoto" className="avatarPreview" />
          ) : (
            <img src={preview} alt="ProfilePhoto" className="avatarPreview" />
          )}
          <div className="editIcon" onClick={handleEdit}>
            <FaEdit />
            <span>Edit Profile</span>
          </div>
        </div>

        <div className="info">
          <label>{profileData?.user.email || "userId"}</label>
          <label>{profileData?.user.name || "name"}</label>
          <label>{profileData?.bio || "bio"}</label>
          <label>Location: {profileData.location}</label>
        </div>

        <fieldset className="bioSection">
          <legend>Interests:</legend>
          {profileData.interests.map((interest) => (
            <label key={interest} className="checkboxLabel">
              {interest}
            </label>
          ))}
        </fieldset>

        <fieldset className="tagSection">
          <legend>Tags:</legend>
          {profileData.tags.map((tag) => (
            <label key={tag} className="checkboxLabel">
              {tag}
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
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px 20px;
  box-sizing: border-box;

  h4 {
    text-align: center;
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
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

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
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

