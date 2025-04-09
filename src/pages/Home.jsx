// src/pages/Home.jsx
import React from 'react';
import Header from "../components/Header/Header";
import PostSection from "../components/PostSection/PostSection";
import bookpic from "../assets/bookpic.jpg";
import cookpic from "../assets/cook.jpg";
import pianopic from "../assets/piano.jpg";

const Home = () => (
  <div>
    <Header />
    <div className="post-sections">
      <PostSection 
        title="Book collection" 
        description="I have been collecting books for ten years, I will be leaving the country and would love to trade this collection, for warm clothes." 
        image={bookpic}
      />
      <PostSection 
        title="Vintage Grand Piano" 
        description="I cant play much anymore, i want this piano to have a good home. In exchange, I would like a week of meal prep." 
        image={pianopic}
      />
      <PostSection 
        title="Cooking lessons with Jamie" 
        description="Hello, I am offering cooking classes in exchange for leather workmanship"
        image={cookpic}
      />
    </div>
  </div>
);

export default Home;
