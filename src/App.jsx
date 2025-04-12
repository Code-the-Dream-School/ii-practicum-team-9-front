import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Home, Register, Login,Explore,Barter} from "./pages";
import React, { useState, useEffect } from 'react';

import NavBar from "./components/NavBar/NavBar";
import AddItemModal from "./components/AdditemModal/AddItemModal";
import './App.css';
import './index.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/barter" element={<Barter />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
          {isModalOpen && <AddItemModal closeModal={closeModal} />}
        </div>
      )}
    </Router>
  );
};

export default App
