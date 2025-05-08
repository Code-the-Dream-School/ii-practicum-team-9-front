import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import { API_URL } from "../endpoints";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const currentUserId = sessionStorage.getItem("userId");

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
        post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          },
        });
        if (response && response.data.data.role === "admin") {
          setAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    isAdmin();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (admin) {
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
          const response = await axios.get(`${API_URL}/api/items/user/items`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
            },
          });

          if (response && response.data && response.data.data.items) {
            setPosts(response.data.data.items);
            setFilteredPosts(response.data.data.items); // Set initial posts
          } else {
            console.error("Unexpected response structure", response);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [admin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      {admin ? <h1>All User Posts</h1> : <h1>My Posts</h1>}
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
