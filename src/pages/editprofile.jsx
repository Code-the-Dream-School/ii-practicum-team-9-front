import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../endpoints";
import profile_noImage from "../assets/profile_noImage.png";
import { FaEdit } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import {US_STATES , ALL_INTERESTS} from "../data.js"
import { useUserPhoto } from '../components/UserContext';
const usStates = US_STATES ;

const allInterests = ALL_INTERESTS;

export default function EditProfile() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const fileInputRef = useRef();

  const [avatarPreview, setAvatarPreview] = useState(profile_noImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setUserPhoto } = useUserPhoto();

  const [profileData, setProfileData] = useState({
    user: { name: "", email: "" },
    location: "",
    profilePhoto: "",
    interests: [],
    bio: "",
    role: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const UpdateProfilePhoto = (file) => {
    const formData = new FormData();
    formData.append("image", file);

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
      .then((data) => {
        
        setUserPhoto(data.data.profilePhoto)

        toast.success("Profile Photo Updated Successfully!")
      })
      .catch((err) => {
        toast.error("Failed to update profile photo");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "email") {
      setProfileData((prev) => ({
        ...prev,
        user: { ...prev.user, [name]: value },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
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
        toast.success("Profile Updated Successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        toast.error("Failed to update profile");
        console.error(err);
      });
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-title">Edit Profile</div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="profile-pic-container">
          <div className="profile-pic-preview">
            <img
              src={profileData.profilePhoto || avatarPreview}
              alt="Profile"
            />
          </div>
          <button
            className="edit-profile-btn"
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
          >
            <FaEdit />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.user?.email || ""}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.user?.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={profileData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
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

        <div className="interests-section">
          {allInterests.map((interest) => (
            <div
              key={interest}
              className={`interest-tag ${profileData.interests.includes(interest) ? "selected" : ""}`}
              onClick={() => handleInterestChange(interest)}
            >
              {profileData.interests.includes(interest) ? "✓ " : ""}
              {interest}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
