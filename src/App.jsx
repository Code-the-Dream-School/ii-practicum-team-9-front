import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import AddItemModal from "./components/AdditemModal/AddItemModal";
import { Home, Barter, Chat } from "./pages";
import Explore from "./pages/Explore";
//import ExplorePage from "./pages/ExplorePage/ExplorePage";
import "./App.css";
import "./index.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default App;
