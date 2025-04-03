import React, { useState, useEffect } from 'react';
//import { getAllData } from './util/index';
import { ToastContainer } from "react-toastify";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Home, Register, Login , ForgetPassword ,ResetPassword} from "./pages";
const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  
   const [isAuthenticated , setIsAuthenticated ]= useState(false)
  // useEffect(() => {

  //   (async () => {
  //     const myData = await getAllData(URL)
  //     setMessage(myData.data);
  //   })();
      
  //   return () => {
  //     console.log('unmounting');
  //   }

  // }, []);

  return (
    
    
    <Router>
      <ToastContainer/>
      {!isAuthenticated ?  (
         <Routes>
         {/* Redirect all routes to login if not authenticated */}
         <Route path="*" element={<Navigate to="/login" />} />
         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
         <Route path="/register" element={<Register />} />
         <Route path="/forgetpassword" element={<ForgetPassword />} />
         <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      ) :
      (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes >
        </>
      )} 
      
    </Router>
    );
}

export default App
