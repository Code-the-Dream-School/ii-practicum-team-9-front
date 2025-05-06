import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../endpoints";
import profile_noImage from "../assets/profile_noImage.png";
import { FaEdit } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import {US_STATES , ALL_INTERESTS} from "../data.js"

const usStates = US_STATES ;

const allInterests = ALL_INTERESTS;



export default function EditProfile() {
 
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const fileInputRef = useRef();

  const [avatarPreview, setAvatarPreview] = useState(profile_noImage);
  const [selectedFile, setSelectedFile] = useState(null);
  

  const [profileData, setProfileData] = useState({
    user: { name: "", email: "" },
    location: "",
    profilePhoto: "",
    interests: [],
    bio: "",
    role:"",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
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
        setProfileData(data.data);
        if (data.data.profilePhoto) {
          setAvatarPreview(data.data.profilePhoto);
        }
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);          
            
    }
  };
  
  useEffect(() => {
    if (!selectedFile) return;
  
    const objectUrl = URL.createObjectURL(selectedFile);
    setAvatarPreview(objectUrl);
    UpdateProfilePhoto(selectedFile);  
    // Cleanup function
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
    

  const  UpdateProfilePhoto=(file)=>{

    console.log(file)
    const formData = new FormData();
    formData.append('image',file );
   
    fetch(`${API_URL}/api/users/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then(() => {
        toast.success("Profile Photo Updated Successfully!")
      })
      .catch((err) => console.error(err));
   }





 

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


  fetch(`${API_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then(() => {
        toast.success("Profile Info Updated Successfully!")
        setTimeout(() => {
          navigate('/');
        }, 3000);
       
      })
      .catch((err) => console.error(err));
      }
   



    
    
  
  

      return (
        <Wrapper>
          <ToastContainer position="top-center" autoClose={3000} />
          <div className="card">
            <div className="title">My Profile</div>
            <hr className="my-line" />
            <div className="topSection">
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
            </div>
            <hr className="my-line" />
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

              <hr className="my-line" />
      
              <div className="inputGroup">
                <label>Role:</label>
                <select
                  name="role"
                  value={profileData.role}
                  onChange={handleChange}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
      
              <div className="inputGroup">
                <label>Location:</label>
                <select
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                >
                  <option value="">Select a State</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
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
        width: 90%;
        height: 100%;
        background: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 10px;
          .my-line {
        border: none;
        height: 2px;
        background-color: #ccc;
        margin: 20px 0;
      }
        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          text-align: center;
        }
      
        .title {
          text-align: center;
          color: #333;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
      
        .topSection {
          display: flex;
          gap: 15px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
      
        .avatar-section {
          text-align: center;
        }
      
        .avatar {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #ccc;
        }
      
        .edit-button {
          margin-top: 8px;
          background: none;
          border: none;
          color: #4CAF50;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
      
        .info {
          text-align: left;
          flex: 1;
        }
      
        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }
      
        .inputGroup {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      
        input, textarea, select {
          padding: 8px;
          width: 100%;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 0.95rem;
        }
      
        textarea {
          resize: vertical;
          min-height: 80px;
        }
      
        .checkboxGroup {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          border: none;
          padding: 0;
        }
      
        .checkboxGroup label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: normal;
        }
      
        label {
          font-weight: bold;
        }
      
        .save-button {
          margin-top: 10px;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          font-size: 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
      
        .save-button:hover {
          background-color: #45a049;
        }
      
        @media (max-width: 600px) {
          .topSection {
            flex-direction: column;
            align-items: center;
          }
      
          .info {
            text-align: center;
          }
      
          .inputGroup {
            gap: 3px;
          }
        }
      `;
      