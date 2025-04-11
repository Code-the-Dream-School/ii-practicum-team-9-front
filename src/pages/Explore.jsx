// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExplorePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Explore Items</h1>
      <div className="items-container">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h2>{item.title}</h2>
            <p>{item.name}</p>
            <p>{item.description}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;

