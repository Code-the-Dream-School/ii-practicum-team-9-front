import React, { useState } from "react";
import "./Header.css";
import profilePic from "../../assets/profile-pic.jpg";
import { useNavigate } from "react-router-dom";
import { useUserPhoto, useIsAdmin } from "../UserContext";

const Header = ({ onSearch }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { userPhoto } = useUserPhoto();
  const { setIsAdmin } = useIsAdmin();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAdmin(false);
    sessionStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="header-container">
      <div className="header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="profile">
          <img
            src={userPhoto}
            alt="Profile"
            className="profile-pic"
            onClick={toggleDropdown}
          />

          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li onClick={handleViewProfile}>View Profile</li>
                <li onClick={handleEditProfile}>Edit Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
