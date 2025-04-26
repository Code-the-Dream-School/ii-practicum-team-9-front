// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import { API_URL } from "../endpoints"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = sessionStorage.getItem("userId");

 const handleUpdatePost = (updatedPost) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post._id === updatedPost._id ? { ...post, ...updatedPost } : post
    )
  );
};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items/user/items`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });

        if (response && response.data && response.data.data.items) {
          setPosts(response.data.data.items);
        } else {
          console.error("Unexpected response structure", response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>My Posts</h1>
      <div className="post-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostSection
              key={post._id}
              title={post.title}
              description={post.description}
              image={post.imageUrl || "/default-image.jpg"}
              owner={post.owner}
              currentUserId={currentUserId}
              _id={post._id}
              onUpdate={handleUpdatePost}   
            />
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};


export default Home;
