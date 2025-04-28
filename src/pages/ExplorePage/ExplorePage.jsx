import React, { useState } from "react";
import Header from "../../components/Header/Header";
import BodyExp from "../../components/BodyExp/BodyExp";
import styles from "./Explore.module.css";
import NavBar from "../../components/NavBar/NavBar"


const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  /* TEAM'S ORIGINAL API CODE - COMMENTED FOR FUTURE USE
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items/items");
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);
  */

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery.trim().toLowerCase());
  };

  const handleExchangeClick = (item) => {
    console.log("Initiate exchange for:", item.title);
    // Will connect to team's barter system later
  };

  const handleLikeClick = (item) => {
    console.log("Liked item:", item.title);
    // Will connect to team's like system later
  };

  return (
    <div className={styles.explorePage}>
      <Header onSearch={handleSearch} />
      <NavBar/>
      <main className={styles.mainContent}>
        <div className={styles.textWrapper}>
          <h1>Welcome to the Explore Page!</h1>
          <p>Here, you can discover amazing content and adventures.</p>
          <div className={styles.wrapper}>
            <div className={styles.bodyWrapper}>
              <BodyExp
                searchTerm={searchTerm}
                onExchangeClick={handleExchangeClick}
                onLikeClick={handleLikeClick}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
