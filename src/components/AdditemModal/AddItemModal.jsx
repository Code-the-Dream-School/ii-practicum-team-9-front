import React, { useState } from 'react';
import axios from 'axios';
import './AddItemModal.css';

const AddItemModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState(null);  // Assuming user info is available in the state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const newItem = {
      title,
      description,
      imageUrl,
      userId: user._id,
      userName: user.name,
      userProfilePhoto: user.profilePhoto, // Assuming user has a profilePhoto
    };

    try {
      await axios.post('http://localhost:5000/api/items/add-item', newItem, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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

          <button type="submit">Add Item</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddItemModal;
