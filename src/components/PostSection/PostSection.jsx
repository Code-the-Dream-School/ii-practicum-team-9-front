import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostSection.css";
import EditPostModal from "../EditPosts/EditPostModal";
import { API_URL } from "../../endpoints";
import { useIsAdmin } from "../UserContext";

const PostSection = ({
  title,
  description,
  image,
  owner,
  currentUserId,
  _id,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { isAdmin } = useIsAdmin();

  const isOwner =
    owner && owner._id && owner._id.toString() === currentUserId.toString();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
        },
      };

      await axios.delete(`${API_URL}/api/items/delete-item/${id}`, config);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setIsDeleteModalOpen(false);

      setSuccessMessage("Post deleted successfully!");

      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post-section">
      <h3>{title}</h3>
      <div className="post-card">
        <img src={image} alt="Post" className="post-image" />
        <p>{description}</p>
        {isOwner || isAdmin ? (
          <div className="owner-buttons">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </button>
          </div>
        ) : (
          <button className="barter-btn">Barter</button>
        )}
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {isEditModalOpen && (
        <EditPostModal
          post={{ title, description, imageUrl: image, _id }}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(updatedPost) => {
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="modal-buttons">
              <button onClick={() => handleDelete(_id)}>Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostSection;
