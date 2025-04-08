import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Home, Register, Login} from "./pages";
import React, { useState, useEffect } from 'react';

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import PostSection from "./components/PostSection/PostSection";
import AddItemModal from "./components/AdditemModal/AddItemModal";
import Explore from "./pages/Explore"; 
import Barter from "./pages/Barter"; 
import bookpic from "./assets/bookpic.jpg";
import cookpic from "./assets/cook.jpg";
import pianopic from "./assets/piano.jpg";
import './App.css';
import './index.css';

const URL = 'http://localhost:8000/api/v1/';
 
const LandingHome = () => (
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

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <ToastContainer />
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <div className="app-container">
          <NavBar openModal={openModal} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LandingHome />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/barter" element={<Barter />} />
              <Route path="/home" element={<AuthHome />} />
            </Routes>
          </div>
          {isModalOpen && <AddItemModal closeModal={closeModal} />}
        </div>
      )}
    </Router>
  );
};

export default App
