import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../endpoints';

const EditPostModal = ({ post, onClose, onUpdate }) => {
  
  console.log('Received Post in Modal:', post);   

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
 
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        imageUrl: post.imageUrl || '',
      });
    }
  }, [post]);

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   
  const handleSubmit = async (e) => {
  const { _id } = post;

  e.preventDefault();

  

  if (!_id) {
    console.error('Post ID is missing');
    return;  
  }

  try {
    
    const response = await axios.patch(`${API_URL}/api/items/update-item/${_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
      },
    });

    
    
     

    
    onUpdate(response.data.data.item); 
    onClose();  
  } catch (error) { 

    console.error('Error updating post:', error);
     
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Post</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
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
