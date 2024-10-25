// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        ☰
      </button>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/tavoli" className="sidebar-link">Tavoli</Link>
        <Link to="/magazzino" className="sidebar-link">Magazzino</Link>
      </nav>
    </div>
  );
}

export default Navbar;
