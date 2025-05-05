import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../endpoints';
import './EditPostModal.css';

const EditPostModal = ({ post, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
 
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        category: post.category || ''
      });
      setPreviewUrl(post.imageUrl || '');
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (selectedFile && selectedFile.size > maxSize) {
      setFileError('File size must be less than 10MB');
      setFile(null);
      e.target.value = null;
    } else {
      setFileError('');
      setFile(selectedFile);
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { _id } = post;

    if (!_id) {
      setError('Post ID is missing');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      if (file) {
        submitData.append('image', file);
      }
    
      const response = await axios.patch(
        `${API_URL}/api/items/update-item/${_id}`, 
        submitData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.data && response.data.data.item) {
        const updatedItem = response.data.data.item;
        // Ensure all required fields are present
        if (!updatedItem._id || !updatedItem.title || !updatedItem.description) {
          throw new Error('Invalid response: missing required fields');
        }
        onUpdate(updatedItem);
        onClose();
      } else {
        throw new Error('Invalid response structure from server');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.response?.data?.message || error.message || 'Failed to update post. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Post</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="item">Item</option>
              <option value="service">Service</option>
              <option value="lesson">Lesson</option>
            </select>
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {fileError && <p className="error-message">{fileError}</p>}
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>
          <div className="modal-buttons">
            <button type="submit">Update Post</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
