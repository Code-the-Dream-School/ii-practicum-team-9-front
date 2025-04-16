import React, { useState } from "react";
import Header from "../Header/HeaderMain/HeaderMain";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import styles from "./Explore.module.css";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className={styles.explorePage}>
      <Header onSearch={setSearchTerm} />

      <main className={styles.mainContent}>
        <div className={styles.textWrapper}>
          <h1>Welcome to the Explore Page!</h1>
          <p>Here, you can discover amazing content and adventures.</p>
          <div className={styles.wrapper}>
            <div className={styles.bodyWrapper}>
              <Body
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
