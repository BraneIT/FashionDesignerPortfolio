import React from 'react';
import { Link } from 'react-router-dom';


const Menu = () => {
  return (
    <nav>
      <ol>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ol>
    </nav>
  );
};

export default Menu;