// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from 'react';
import callApi from "../util/api";
import { API_URL } from "../endpoints";

const ExplorePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        //TODO: /api/items is not defined in backend
        const response = await callApi(`${API_URL}/api/items`, "GET");
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

