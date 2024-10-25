// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tables from './components/Tables';
import Magazzino from './components/Magazzino';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Aggiungi la sidebar */}
        <Routes>
          <Route path="/tavoli" element={<Tables />} /> {/* Rotta per Tavoli */}
          <Route path="/magazzino" element={<Magazzino />} /> {/* Rotta per Magazzino */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
