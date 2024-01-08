import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/Logo.png';
import { FaUser } from "react-icons/fa";
import '../Styles/Navbar1.css';

function Navbar1() {
    return (
      <nav className="navbar1">
        <div className="navbar1-logo">
            <img src={logo} alt="logo" />
        </div>
    
        <ul className="navbar1-links">
        <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT US</Link>
          </li>
          <li>
            <Link to="/services">SERVICES</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT US</Link>
          </li>
          <li>
          <Link to="/chooseaccount">
            <FaUser/>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar1;