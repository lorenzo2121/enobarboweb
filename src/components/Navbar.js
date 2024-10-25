// src/components/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside of the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Close the sidebar if the click is outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        ☰
      </button>
      <nav ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/tavoli" className="sidebar-link">Tavoli</Link>
        <Link to="/magazzino" className="sidebar-link">Magazzino</Link>
      </nav>
    </div>
  );
}

export default Navbar;
