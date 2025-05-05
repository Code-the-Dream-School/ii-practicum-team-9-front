import React, { useState } from 'react';
import axios from 'axios';
import './AddItemModal.css';
import { API_URL } from '../../endpoints';

const AddItemModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (selectedFile && selectedFile.size > maxSize) {
      setFileError('File size must be less than 10MB');
      setFile(null);
      e.target.value = null; // Reset the file input
    } else {
      setFileError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) {
      alert('Please select a valid file');
      return;
    }

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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      alert('Failed to add item. Please try again.');
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
            onChange={handleFileChange}
          />
          {fileError && <p className="error-message">{fileError}</p>}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="item">Item</option>
            <option value="service">Service</option>
            <option value="lesson">Lesson</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">Add Item</button>
            <button type="button" onClick={closeModal}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
