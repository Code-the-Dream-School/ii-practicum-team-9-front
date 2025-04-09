import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.css";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value); 
    onSearch(e.target.value); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleSearchIconClick = () => {
    onSearch(searchTerm); 
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search barter offers..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FaSearch className={styles.searchIcon} onClick={handleSearchIconClick} />
    </div>
  );
};

export default Search;
