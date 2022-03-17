import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RegisterCompany from './pages/RegisterCompany';
import UserDirectory from './pages/UserDirectory';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  // {  
  //   let dataOfLoggedUser = JSON.parse(localStorage.getItem("user_data"));
  // }

  return (
    <div className="App">
      <h1> Not LinkeIn</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/registerCompany" element={<RegisterCompany />} />
          <Route path="/userDirectory" element={<UserDirectory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
