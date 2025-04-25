import React, { useState } from 'react';
import axios from 'axios';
import './AddItemModal.css';
 


const AddItemModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      title,
      description,
      imageUrl,
      category,
    };

    const token = sessionStorage.getItem('token');

    


    try {
      await axios.post(
        'http://localhost:5000/api/items/add-item',
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

       
      closeModal();
    } catch (error) {
      console.error('Error adding item:', error);
    }
    
  };

   

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add an Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="item">Item</option>
          <option value="service">Service</option>
          <option value="lesson">Lesson</option>
        </select>

          <button type="submit">Add Item</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddItemModal;
