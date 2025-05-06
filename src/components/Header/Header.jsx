import React, { useState } from 'react';
import './Header.css';
import profilePic from '../../assets/profile-pic.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
    localStorage.removeItem("token");  
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
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            onClick={toggleDropdown}
          />
          
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
              <li onClick={handleViewProfile}>View Profile</li>
              <li onClick={handleEditProfile} >Edit Profile</li>
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
