import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import PostSection from "./components/PostSection/PostSection";
import Footer from "./components/Footer/Footer";
import AddItemModal from "./components/AdditemModal/AddItemModal";
import GuidelinesSection from "./components/GuidelinesSection/GuidelinesSection";  
import bookpic from "./assets/bookpic.jpg"
import cookpic from "./assets/cook.jpg"
import pianopic from "./assets/piano.jpg"
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log("Hello world")
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar  openModal={openModal}/>
        <div className="main-content">
          <Header/>
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
          <div className="guidelines-container">
            <Routes>
              <Route path="/guidelines" element={<GuidelinesSection />} />
            </Routes>
          </div>
          {isModalOpen && <AddItemModal closeModal={closeModal} />}
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
