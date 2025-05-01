import React, { useState } from 'react';
import axios from 'axios';
import './AddItemModal.css';
import { API_URL } from '../../endpoints';

const AddItemModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', file);   

    const token = sessionStorage.getItem('token');

    try {
      await axios.post(
        `${API_URL}/api/items/add-item`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  
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
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
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
