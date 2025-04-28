import React from "react";
import styles from "./BodyExp.module.css";
import { FaHeart, FaHandshake } from "react-icons/fa";

import bookpic from "../../assets/bookpic.jpg";
import cookpic from "../../assets/cook.jpg";
import pianopic from "../../assets/piano.jpg";
import { GiClothes, GiGardeningShears, GiGuitar } from "react-icons/gi";

const BodyExp = ({ searchTerm, onExchangeClick, onLikeClick }) => {
  const items = [
    {
      id: 1,
      title: "Books",
      image: bookpic,
      description: "Great items for the book club",
      category: "item",
    },
    {
      id: 2,
      title: "Catering Service",
      image: cookpic,
      description: "Professional cooking service",
      category: "service",
    },
    {
      id: 3,
      title: "Piano Lessons",
      image: pianopic,
      description: "Beginner piano lessons",
      category: "lesson",
    },
    {
      id: 4,
      title: "Book Collection 2",
      image: bookpic,
      description: "More books for exchange",
      category: "item",
    },
    {
      id: 5,
      title: "Baking Lessons",
      image: cookpic,
      description: "Baking lessons and delicious food",
      category: "lesson",
    },
    {
      id: 6,
      title: "Music Theory",
      image: pianopic,
      description: "Learn music fundamentals",
      category: "lesson",
    },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "item":
        return <GiClothes className={styles.categoryIcon} />;
      case "service":
        return <GiGardeningShears className={styles.categoryIcon} />;
      case "lesson":
        return <GiGuitar className={styles.categoryIcon} />;
      default:
        return <GiClothes className={styles.categoryIcon} />;
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.itemsGrid}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div key={item.id} className={styles.itemContainer}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <img
              className={styles.itemImage}
              src={item.image}
              alt={item.title}
            />
            <p className={styles.itemDescription}>{item.description}</p>

            <div className={styles.categoryTag}>
              {getCategoryIcon(item.category)}
              <span className={styles.categoryText}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => onExchangeClick(item)}
                className={styles.swapButton}
              >
                <FaHandshake className={styles.swapIcon} />
                Barter
              </button>
              <button
                onClick={() => onLikeClick(item)}
                className={styles.likeButton}
              >
                <FaHeart className={styles.heartIcon} />
                Like
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          <p>No items found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default BodyExp;
