import './App.css';
import React from 'react'

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Disease from './pages/Disease';
import Risk from './pages/Risk';
import Symptom from './pages/Symptom';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';


function App() {
  
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/diseases" element={<Disease />} />
        <Route path="/risks" element={<Risk />} />
        <Route path="/symptoms" element={<Symptom />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

