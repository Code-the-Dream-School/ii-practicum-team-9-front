import React, { useState, useEffect } from "react";
//import { getAllData } from './util/index';
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Register, Login } from "./pages";
import ExplorePage from "./ExplorePageDr/components/ExplorePage/ExplorePage";
const URL = "http://localhost:8000/api/v1/";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <ToastContainer />
      {!isAuthenticated ? (
        <Routes>
          {/* Redirect all routes to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
