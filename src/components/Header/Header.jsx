import React from 'react';
import './Header.css';
import profilePic from '../../assets/profile-pic.jpg'; 

const Header = () => {
  return (
    <div className="header">
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="profile">
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </div>
  );
};

export default Header;
