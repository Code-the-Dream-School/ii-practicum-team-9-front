import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaUser, FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Header = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/vite.svg" alt="Logo" className={styles.logo} />
        <span className={styles.brandName}>BarterSwap</span>
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
