import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../../Images/Logo.png'
class AuthNavbar extends Component {
  handleLogoutClick = () => {
    // Handle logout functionality
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" height="50" style={{ marginRight: '10px' }} />
            <span style={{ color: '#0A244B' }}>AUTHORITY</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/authdash" style={{ color: '#0A244B' }}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seereports" style={{ color: '#0A244B' }}>
                  See reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/busfares" style={{ color: '#0A244B' }}>
                  Bus fares & bus schedule
                </Link>
              </li>
             
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={this.handleLogoutClick}>
                  <i className="fa fa-sign-out" aria-hidden="true" style={{ color: '#0A244B' }}></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default AuthNavbar;


