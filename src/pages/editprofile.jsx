import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../endpoints";
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
export default function EditProfile() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const fileInputRef = useRef();

  const [avatarPreview, setAvatarPreview] = useState(profile_noImage);
  const [avatarFile, setAvatarFile] = useState(null);

  const [profileData, setProfileData] = useState({
    user: { name: "", email: "" },
    location: "",
    profilePhoto: "",
    userProfilePhotoURL: "",
    interests: [],
    bio: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/profile/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile data");
        return res.json();
      })
      .then((data) => {
        setProfileData(data);
        if (data.profilePhoto) {
          setAvatarPreview(data.profilePhoto);
        }
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...profileData };
    if (avatarFile) {
      updatedData.userProfilePhotoURL = avatarPreview; // Just URL for preview; normally you upload file to server
      updatedData.profilePhoto = avatarPreview;
    }

    fetch(`${API_URL}/api/profile/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Wrapper>
      <div className="card">
        <h2>Edit Profile</h2>
        <div className="avatar-section">
          <img src={avatarPreview} alt="Profile" className="avatar" />
          <button className="edit-button" type="button" onClick={handleEditClick}>
            <FaEdit /> Change Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />
        </div>

        <div className="info">
          <p><strong>Name:</strong> {profileData.user?.name || "No name"}</p>
          <p><strong>Email:</strong> {profileData.user?.email || "No email"}</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
            />
          </div>

          <fieldset className="checkboxGroup">
            <legend>Interests:</legend>
            {allInterests.map((interest) => (
              <label key={interest}>
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
            <label>Location:</label>
            <select
              name="location"
              value={profileData.location}
              onChange={handleChange}
            >
              <option value="">Select a State</option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    text-align: center;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
  }

  .avatar-section {
    position: relative;
    margin-bottom: 20px;
  }

  .avatar {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #ddd;
  }

  .edit-button {
    margin-top: 10px;
    background: none;
    border: none;
    color: #4CAF50;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
  }

  .info {
    margin-bottom: 20px;
    text-align: left;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: left;
  }

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input, textarea, select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .checkboxGroup {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: none;
    padding: 0;
  }

  .checkboxGroup label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: normal;
  }

  .save-button {
    margin-top: 20px;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .save-button:hover {
    background-color: #45a049;
  }
`;
