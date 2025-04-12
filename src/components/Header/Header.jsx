import React, { useState } from 'react';
import './Header.css';
import profilePic from '../../assets/profile-pic.jpg';

const Header = ({ onSearch }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {  
      onSearch(e.target.value);   
    }
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
                <li>Edit Profile</li>
                <li>View Profile</li>
                <li>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
