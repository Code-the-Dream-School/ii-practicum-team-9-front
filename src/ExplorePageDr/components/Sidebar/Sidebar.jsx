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
      icon: <GiClothes className={styles.icon} />,
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: <GiSmartphone className={styles.icon} />,
    },
    {
      id: "cars",
      name: "Cars",
      icon: <GiCarKey className={styles.icon} />,
    },
    {
      id: "homeGarden",
      name: "Home & Garden",
      icon: <GiGardeningShears className={styles.icon} />,
    },
    {
      id: "gifts",
      name: "Gifts",
      icon: <GiPresent className={styles.icon} />,
    },
    {
      id: "musicLessons",
      name: "Music Lessons",
      icon: <GiGuitar className={styles.icon} />,
    },
    {
      id: "artsCrafts",
      name: "Arts & Crafts",
      icon: <GiYarn className={styles.icon} />,
    },
    {
      id: "healthBeauty",
      name: "Health & Beauty",
      icon: <GiLipstick className={styles.icon} />,
    },
    {
      id: "pets",
      name: "Pets",
      icon: <GiDogBowl className={styles.icon} />,
    },
    {
      id: "babyToys",
      name: "Baby & Toys",
      icon: <GiBabyBottle className={styles.icon} />,
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: <GiFruitBowl className={styles.icon} />,
    },
    {
      id: "books",
      name: "Books",
      icon: <GiBookPile className={styles.icon} />,
    },
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Categories</h2>
      <ul className={styles.categoryList}>
        {/* "All Categories" option */}
        <li
          className={`${styles.categoryItem} ${
            !selectedCategory ? styles.active : ""
          }`}
          onClick={() => onCategorySelect(null)}
        >
          <span>All Categories</span>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.categoryItem} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() =>
              onCategorySelect(
                selectedCategory === category.id ? null : category.id
              )
            }
          >
            <div className={styles.categoryContent}>
              {category.icon}
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <button
          className={styles.clearButton}
          onClick={() => onCategorySelect(null)}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default Sidebar;
