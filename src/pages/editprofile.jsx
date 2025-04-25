import React, { useState ,useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../endpoints" ;
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

export default function EditProfile() {
  const navigate= useNavigate() ;

  const token = sessionStorage.getItem("token");        
  const userId= sessionStorage.getItem("userId");

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profileData, setProfileData] = useState({
    
    user: "",
    role: "user",
    location: "",
    profilePhoto: "",
    interests: [],
    tags: [],
    bio: "",
  });
 
  const [tags, setTags] = useState([""]);
  const [interest, setInterest] = useState([""]);
 

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
                  throw new Error("Failed to fetch  profile data");
              }
              return response.json();
          })
          .then((data) =>{
            setProfileData(data)
             
          })
          .catch((err) => console.error(err));
      }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log("profileData befor insert" , profileData)
   
fetch(`${API_URL}/api/profile/profile`, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify( profileData )
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error("Failed to fetch  data");
      }
      return response.json();
  })
  .then(() =>{
      
      console.log("suuceessfull:"); // Debugging
      //setProfileData(data)
      //console.log(data)
  })
  .catch((err) => console.error(err));

    console.log("Form Data:", profileData);
    if (avatar) console.log("Avatar file:", avatar.name);
    navigate("/Home")
  };

  return (
    <Wrapper>
      
      <form onSubmit={handleSubmit}>
        <h4>Edit Profile</h4>
        <div className="mainSection">
            <div className="profilePic">
            {preview ? (
              <img src={preview} alt="Avatar" className="avatarPreview" />
            ) : (
              <div className="avatarPlaceholder">No Image</div>
            )}
            
              <label htmlFor="avatarInput" className="changeIcon">
                Change Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                id="avatarInput"
                onChange={handleAvatarChange}
                
              />
            
            </div>
          <div className="inputGroup">
            <label>Username:</label>
            <input type="text" name="username" value={profileData.user.email} disabled /></div>
            <div className="inputGroup">  
            <label>Name:</label>
            <input type="text" name="name" value={profileData.user.name} disabled />
          </div>
          
        </div>

        <div className="inputGroup">
          <label>Bio:</label>
          <textarea name="bio" value={profileData.bio} onChange={handleChange} />
        </div>

        <fieldset className="bioSection">
          <legend>Interests:</legend>
          {allInterests.map((interest) => (
            <label key={interest} className="checkboxLabel">
              <input
                type="checkbox"
                value={interest}
                checked={profileData.interests.includes(interest)}
                onChange={handleInterestChange}
              />
              {interest}
            </label>
          ))}
        </fieldset>

        <div className="inputGroup">
          <label>
            Location:
            <select name="location" value={profileData.location} onChange={(e)=>handleChange(e)}>
              <option value="">Select a state</option>
              {usStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
       

        <button type="submit">Save Profile</button>
        </div>
      </form>
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

  // form {
  //   max-width: 800px;
  //   width: 100%;
  //   margin: 0 auto;
  //   background: white;
  //   padding: 30px;
  //   border-radius: 10px;
  //   box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  //   display: flex;
  //   flex-direction: column;
  //   gap: 20px;
  // }

  .mainSection {
    // display: flex;
    // flex-wrap: wrap;
    // gap: 20px;
    // align-items: flex-start;
  }

  .leftInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 250px;
  }

  .profilePic {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 250px;
  }

  .avatarPreview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #ccc;
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
