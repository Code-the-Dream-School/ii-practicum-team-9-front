// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import { API_URL } from "../endpoints"; 

const Home = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);  
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
      <div className="post-sections">
        
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostSection
              key={post._id}
              title={post.title}
              description={post.description}
              image={post.imageUrl || "/default-image.jpg"}  
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
