import React, { useEffect, useState } from "react";
import styles from "./Body.module.css";
import { FaHeart, FaHandshake } from "react-icons/fa";

const Body = ({
  onExchangeClick,
  onLikeClick,
  searchTerm,
  selectedCategory,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=20")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filtering can be changed
    const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      item.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.itemsGrid}>
      {filteredItems.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <img
            className={styles.itemImage}
            src={item.images[0]}
            alt={item.title}
          />
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => onExchangeClick(item)}
              className={styles.swapButton}
            >
              <FaHandshake className={styles.swapIcon} />
              Swap
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
      ))}
    </div>
  );
};

Body.defaultProps = {
  onExchangeClick: () => {},
  onLikeClick: () => {},
  searchTerm: "",
  selectedCategory: null,
};

export default Body;
