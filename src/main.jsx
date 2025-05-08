import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, ForgetPassword, ResetPassword } from "./pages";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ExplorePage from "./pages/ExplorePage/ExplorePage";

import { UserProvider } from './components/UserContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="*"
          element={
             <ProtectedRoute>
               
                  <App />
               
            
             </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
