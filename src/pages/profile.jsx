import React, { useState, useEffect } from "react";
import { API_URL } from "../endpoints";
import { useNavigate } from "react-router-dom";
import profile_noImage from "../assets/profile_noImage.png";
import './Profile.css';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    role: "",
    location: "",
    profilePhoto: "",
    interests: [],
    user: {},
    bio: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

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
      })
      .catch((err) => console.error(err));
  }, []);

  const formatRole = (role) => {
    if (!role) return "Not set";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="profile-wrapper full-page">
      <div className="profile-card wide">
        <div className="profile-header">
          <div className="profile-photo">
            <img
              src={profileData.profilePhoto || profile_noImage}
              alt="Profile"
            />
          </div>
          <div className="profile-main-info">
            <h1>{profileData?.user?.name || "Unnamed User"}</h1>
            <p className="email">{profileData?.user?.email}</p>
            <button className="edit-btn" onClick={() => navigate("/editprofile")}>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-section with-divider">
          <h2>Bio</h2>
          <p>{profileData.bio || "No bio available."}</p>
        </div>

        <div className="profile-section grid-two with-divider">
          <div>
            <h3>Location</h3>
            <p>{profileData.location || "Not set"}</p>
          </div>
          <div>
            <h3>Role</h3>
            <p>{formatRole(profileData.role)}</p>
          </div>
        </div>

        <div className="profile-section with-divider">
          <h3>Interests</h3>
          {profileData.interests?.length > 0 ? (
            <div className="tags">
              {profileData.interests.map((interest) => (
                <span key={interest} className="tag">{interest}</span>
              ))}
            </div>
          ) : (
            <p>No interests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
