import React, { useState } from "react";
import styles from "./Body.module.css";
import PropTypes from "prop-types";
import { FaHeart, FaHandshake } from "react-icons/fa";

const itemsData = [
  {
    id: 1,
    title: "Item 1",
    image: "/images/item1.jpg",
  },
  {
    id: 2,
    title: "Item 2",
    image: "/images/item2.jpg",
  },
  {
    id: 3,
    title: "Item 3",
    image: "/images/item3.jpg",
  },
  
];

const Body = ({ onExchangeClick, onLikeClick, searchTerm }) => {
  const [items] = useState(itemsData); 

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.itemsGrid}>
      {filteredItems.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <img className={styles.itemImage} src={item.image} alt={item.title} />
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => onExchangeClick(item)}
              className={styles.swapButton}
            >
              <span className={styles.swapIcon}>
                <FaHandshake />
              </span>
              Swap
            </button>

            <button
              onClick={() => onLikeClick(item)}
              className={styles.likeButton}
            >
              <span className={styles.heartIcon}>
                <FaHeart />
              </span>
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

Body.defaultProps = {
  onExchangeClick: () => {},
  onLikeClick: () => {},
  searchTerm: "",
};

export default Body;
