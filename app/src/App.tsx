import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes como componente
import {Login} from '../src/Login';
import {Home} from '../src/Home'
import Register from '../src/Register'
import Completed from '../src/Completed'
import Pending from '../src/Pending'

function App() {
  return (
    <Router>
      <Routes> {}
        <Route path="/" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Completed" element={<Completed />} />
        <Route path="/Pending" element={<Pending />} />
        
      </Routes>
    </Router>
  );
}

export default App;