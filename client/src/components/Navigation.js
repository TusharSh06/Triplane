import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we are on the home page


  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.nav-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Always apply transparent/smokey style initially (overlay mode)
  // It will become 'scrolled' (solid) when user scrolls down
  const navbarClass = `navbar ${scrolled ? 'scrolled' : ''}`;

  return (
    <nav className={navbarClass}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleHomeClick}>
          <i className="fas fa-plane-departure logo-icon"></i>
          <span className="logo-text">Triplane</span>
        </Link>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
            Home
          </Link>
          <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>
            About
          </Link>
          <Link to="/packages" className="nav-link" onClick={handleNavLinkClick}>
            Packages
          </Link>
          
          {isAuthenticated() ? (
            <>
              <Link to="/profile" className="nav-link" onClick={handleNavLinkClick}>
                Profile
              </Link>
              {isAdmin() && (
                <>
                  <Link to="/add-package" className="nav-link" onClick={handleNavLinkClick}>
                    Add Package
                  </Link>
                  <Link to="/admin-bookings" className="nav-link" onClick={handleNavLinkClick}>
                    My Bookings
                  </Link>
                </>
              )}
              <div className="nav-user">
                <span className="user-name">Hi, {user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link nav-btn-login" onClick={handleNavLinkClick}>
                Login
              </Link>
              <Link to="/register" className="nav-link nav-btn-register" onClick={handleNavLinkClick}>
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
