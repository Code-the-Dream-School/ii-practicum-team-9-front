import React, { useEffect, useState } from 'react';
import { API_URL } from "../endpoints";
import Header from '../components/Header/Header';
import axios from 'axios';

const ExplorePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items/explore`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
          },
        });
        console.log('API Response:', response);

        if (response && response.data && response.data.data && response.data.data.items) {
          setItems(response.data.data.items);
          setFilteredItems(response.data.data.items);
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
    console.log('Search Term:', searchQuery);  
    setSearchTerm(searchQuery);   

     
    const filtered = items.filter((item) => {
      const title = item.title ? item.title.toLowerCase() : '';  
      const userName = item.userName ? item.userName.toLowerCase() : '';  

      return (
        title.includes(searchQuery.toLowerCase()) ||
        userName.includes(searchQuery.toLowerCase())  
      );
    });

    setFilteredItems(filtered);   
  };

  return (
    <div>
      <Header onSearch={handleSearch} />   
      <h1>Explore Items</h1>
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item) => (
            <li key={item._id}>
              <div>
                <img 
                  src={item.userPhoto || '/default-avatar.png'}  
                  alt={item.userName || 'User'} 
                  width="40"
                  height="40"
                />
                <span>{item.userName}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default ExplorePage;
