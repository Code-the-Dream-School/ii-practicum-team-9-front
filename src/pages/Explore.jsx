import React, { useEffect, useState } from 'react';
import callApi from "../util/api";
import { API_URL } from "../endpoints";
import Header from '../components/Header/Header';

const ExplorePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        //TODO: /api/items is not defined in backend
        const response = await callApi(`${API_URL}/api/items/items`, "GET");
        setItems(response.data);
        setFilteredItems(response.data);  
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

 
  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <Header onSearch={handleSearch} /> 
      <h1>Explore Items</h1>
      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="item">
              <h2>{item.title}</h2>
              <p>{item.name}</p>
              <p>{item.description}</p>
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
