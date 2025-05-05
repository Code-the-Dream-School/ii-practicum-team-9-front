import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import { API_URL } from "../endpoints"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handleSearch = (searchQuery) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())   
    );
    setFilteredPosts(filtered);   
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items/explore`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });

        if (response?.data?.data?.items) {
          const userPosts = response.data.data.items.filter(
            (post) => post.owner && post.owner._id === currentUserId
          );
          setPosts(userPosts);
          setFilteredPosts(userPosts);
        } else {
          setError("No posts found");
        }
      } catch (error) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />   
      <div style={{ textAlign: 'center', margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h1>Welcome Back, {userName}</h1>
        <p>Manage your posts and connect with the community</p>
      </div>
      <h2 style={{ margin: '20px 0' }}>My Posts</h2>
      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
