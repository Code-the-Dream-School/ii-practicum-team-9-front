import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaUser, FaExchangeAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Sidebar from "/src/ExplorePageDr/components/Sidebar/Sidebar.jsx";

const Header = ({ onSearch, onCategorySelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <button
          className={styles.menuButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img src="/vite.svg" alt="Logo" className={styles.logo} />
          <FaBars className={styles.menuIcon} />
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Sidebar
              onCategorySelect={(category) => {
                onCategorySelect(category);
                setIsDropdownOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <Search onSearch={onSearch} />

      <div className={styles.userContainer}>
        <Link to="/user" className={styles.iconCircle}>
          <FaUser />
        </Link>
        <Link to="/swap" className={styles.iconCircle}>
          <FaExchangeAlt />
        </Link>
      </div>
    </header>
  );
};

export default Header;
