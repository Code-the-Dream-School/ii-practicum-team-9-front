import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import { API_URL } from "../endpoints";
import { useIsAdmin } from "../components/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const { isAdmin } = useIsAdmin();

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handleSearch = (searchQuery) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (isAdmin) {
          const response = await axios.get(`${API_URL}/api/items/admin/items`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
            },
          });
          if (response && response.data && response.data.data.items) {
            setPosts(response.data.data.items);
            setFilteredPosts(response.data.data.items);
          } else {
            console.error("Unexpected response structure", response);
          }
        } else {
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
        }
      } catch (error) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [isAdmin, currentUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "1000px",
          margin: "20px auto",
          border: "1px solid #fff554",
        }}
      >
        <h1>Welcome Back, {userName}</h1>
        <p>Manage your posts and connect with the community</p>
      </div>
      {isAdmin ? (
        <h2 style={{ margin: "20px 0" }}>All User Posts</h2>
      ) : (
        <h2 style={{ margin: "20px 0" }}>My Posts</h2>
      )}
      <div
        className="post-grid"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          margin: "2rem 0",
        }}
      >
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
              createdAt={post.createdAt}
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
