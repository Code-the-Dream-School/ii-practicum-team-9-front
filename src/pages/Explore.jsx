import React, { useEffect, useState } from 'react';
import { API_URL } from "../endpoints";
import Header from '../components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaHandshake } from "react-icons/fa";
import { GiClothes, GiGardeningShears, GiGuitar } from "react-icons/gi";
import { Modal } from "antd";
import Barter from "./Barter";
import styles from './Explore.module.css';

const ExplorePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [selectedItem,setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {        
        const response = await axios.get(`${API_URL}/api/items/explore`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
           
          },
        });

        if (response && response.data && response.data.data && response.data.data.items) {
          // Fetch like counts and user's like status for each item
          const itemsWithLikes = await Promise.all(
            response.data.data.items.map(async (item) => {
              try {
                const likeResponse = await axios.get(
                  `${API_URL}/api/v1/like/get-likes/${item._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                  }
                );
                const likeData = likeResponse.data.data.likeData || [];
                const currentUserId = sessionStorage.getItem('userId');
                const isLiked = likeData.some(like => like.user._id === currentUserId);
                
                return {
                  ...item,
                  likes: likeResponse.data.data.likeCount || 0,
                  isLiked: isLiked
                };
              } catch (error) {
                console.error(`Error fetching likes for item ${item._id}:`, error);
                return { ...item, likes: 0, isLiked: false };
              }
            })
          );
          
          setItems(itemsWithLikes);
          setFilteredItems(itemsWithLikes);
        } else {
          console.error('Unexpected response structure', response);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  
  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);   
    const filtered = items.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : '';  
      const userName = item.userName ? item.userName.toLowerCase() : '';  
      const description = item.description ? item.description.toLowerCase() : '';

      return (
        title.includes(searchQuery.toLowerCase()) ||
        userName.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase())
      );
    });

    setFilteredItems(filtered);   
  };

  const handleExchangeClick = (item) => {    
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleLikeClick = async (item) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/like`,
        { itemId: item._id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      
      if (response.data.status === 'success') {
        // After like/unlike, fetch the updated like count
        const likeResponse = await axios.get(
          `${API_URL}/api/v1/like/get-likes/${item._id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        const likeData = likeResponse.data.data.likeData || [];
        const currentUserId = sessionStorage.getItem('userId');
        const isLiked = likeData.some(like => like.user._id === currentUserId);
        
        // Update only the clicked item with the new like count and state
        const updatedItems = items.map(i => {
          if (i._id === item._id) {
            return {
              ...i,
              isLiked: isLiked,
              likes: likeResponse.data.data.likeCount || 0
            };
          }
          return i;
        });
        
        setItems(updatedItems);
        setFilteredItems(updatedItems);
      }
    } catch (error) {
      console.error('Error liking item:', error);
      alert('Failed to like item. Please try again.');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
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

  return (
    <div className={styles.explorePage}>
      <Header onSearch={handleSearch} />
      <Modal style={{top:20}} width={800} bodyStyle={{height:"400px"}}
        open={showModal} onCancel ={()=>{setShowModal(false)}}>
        <Barter item = {selectedItem}/>

      </Modal>
      <div style={{
        textAlign: 'center',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1000px',
        border: '1px solid #fff554',
        margin: '0 auto'
      }}>
        <h1 style={{ textAlign: 'center' }}>Explore the Community</h1>
        <p style={{ textAlign: 'center' }}>Barter with your neighbors and like your favorite posts</p>
      </div>
      <h2 style={{ margin: '10px 0' }}>Community Posts</h2>
      <main className={styles.mainContent}>
        <div className={styles.textWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.bodyWrapper}>
              <div className={styles.itemsGrid}>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div key={item._id} className={styles.itemContainer}>
                      <div className={styles.userInfo}>
                        <img 
                          src={item.userPhoto ? item.userPhoto : '/default-avatar.png'} 

                          className={styles.userAvatar}
                        />
                        <span className={styles.userName}>{item.userName}</span>
                      </div>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className={styles.itemImage}
                        />
                      )}
                      <p className={styles.itemDescription}>{item.description}</p>
                      <div className={styles.categoryTag}>
                        {getCategoryIcon(item.category)}
                        <span className={styles.categoryText}>
                          {item.category?.charAt(0).toUpperCase() + item.category?.slice(1) || 'Item'}
                        </span>
                      </div>
                      <div className={styles.buttonContainer}>
                        <button
                          onClick={() => handleExchangeClick(item)}
                          className={styles.swapButton}
                        >
                          <FaHandshake className={styles.swapIcon} />
                          Barter
                        </button>
                        <button
                          onClick={() => handleLikeClick(item)}
                          className={`${styles.likeButton} ${item.isLiked ? styles.liked : ''}`}
                        >
                          <FaHeart className={styles.heartIcon} />
                          {item.isLiked ? 'Unlike' : 'Like'} ({item.likes || 0})
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
