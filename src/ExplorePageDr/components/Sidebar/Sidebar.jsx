import React from "react";
import styles from "./Sidebar.module.css";
import {
  GiClothes,
  GiSmartphone,
  GiCarKey,
  GiGardeningShears,
  GiPresent,
  GiGuitar,
  GiYarn,
  GiLipstick,
  GiDogBowl,
  GiBabyBottle,
  GiFruitBowl,
  GiBookPile,
} from "react-icons/gi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    {
      id: "fashion",
      name: "Fashion",
      icon: <GiClothes className={styles.dropdownIcon} />,
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: <GiSmartphone className={styles.dropdownIcon} />,
    },
    {
      id: "cars",
      name: "Cars",
      icon: <GiCarKey className={styles.dropdownIcon} />,
    },
    {
      id: "homeGarden",
      name: "Home & Garden",
      icon: <GiGardeningShears className={styles.dropdownIcon} />,
    },
    {
      id: "gifts",
      name: "Gifts",
      icon: <GiPresent className={styles.dropdownIcon} />,
    },
    {
      id: "musicLessons",
      name: "Music Lessons",
      icon: <GiGuitar className={styles.dropdownIcon} />,
    },
    {
      id: "artsCrafts",
      name: "Arts & Crafts",
      icon: <GiYarn className={styles.dropdownIcon} />,
    },
    {
      id: "healthBeauty",
      name: "Health & Beauty",
      icon: <GiLipstick className={styles.dropdownIcon} />,
    },
    {
      id: "pets",
      name: "Pets",
      icon: <GiDogBowl className={styles.dropdownIcon} />,
    },
    {
      id: "babyToys",
      name: "Baby & Toys",
      icon: <GiBabyBottle className={styles.dropdownIcon} />,
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: <GiFruitBowl className={styles.dropdownIcon} />,
    },
    {
      id: "books",
      name: "Books",
      icon: <GiBookPile className={styles.dropdownIcon} />,
    },
  ];

  return (
    <div className={styles.dropdownMenu}>
      <h2 className={styles.dropdownTitle}>Categories</h2>
      <ul className={styles.dropdownList}>
        {/* "All Categories" option */}
        <li
          className={`${styles.dropdownItem} ${
            !selectedCategory ? styles.active : ""
          }`}
          onClick={() => onCategorySelect(null)}
        >
          <span>All Categories</span>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.dropdownItem} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() =>
              onCategorySelect(
                selectedCategory === category.id ? null : category.id
              )
            }
          >
            <div className={styles.dropdownContent}>
              {category.icon}
              <span className={styles.dropdownCategoryName}>
                {category.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <button
          className={styles.clearFilterButton}
          onClick={() => onCategorySelect(null)}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default Sidebar;
