import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ openModal }) => {
  return (
    <div className="nav-bar">
      <div className="logo">Barter</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/barter">Barter</Link></li>
        <li><Link to="/profile">View Profile</Link></li>
        <li><Link to="/editprofile">Edit Profile</Link></li>
      </ul>
      <button onClick={openModal} className="add-item-btn">Add Item</button>
      
    </div>
  );
};

export default NavBar;
