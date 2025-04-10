import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, Register, Login, ForgetPassword, ResetPassword } from "./pages";

import React, { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import AddItemModal from "./components/AdditemModal/AddItemModal";
import Explore from "./pages/Explore"; 
import Barter from "./pages/Barter"; 
import './App.css';
import './index.css';

//const URL = 'http://localhost:8000/api/v1/';

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
          {/* Redirect all routes to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      ) : (
        <div className="app-container">
          <NavBar openModal={openModal} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/barter" element={<Barter />} />
            </Routes>
          </div>
          {isModalOpen && <AddItemModal closeModal={closeModal} />}
        </div>
      )}
    </Router>
  );
};

export default App;
