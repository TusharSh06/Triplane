import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHomeClick = (e) => {
    // If we're already on the home page, scroll to top
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleHomeClick}>
          <span className="logo-text">Triplane</span>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link" onClick={handleHomeClick}>
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/packages" className="nav-link">
            Packages
          </Link>
          
          {isAuthenticated() ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              {isAdmin() && (
                <>
                  <Link to="/add-package" className="nav-link">
                    Add Package
                  </Link>
                  <Link to="/admin-bookings" className="nav-link">
                    My Bookings
                  </Link>
                </>
              )}
              <div className="nav-user">
                <span className="user-name">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
