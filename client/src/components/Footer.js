import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Triplane</h3>
          <p>
            Your gateway to adventure. Discover extraordinary destinations and
            create unforgettable memories with our carefully curated travel
            experiences.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/" onClick={scrollToTop}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/packages">Destinations</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Destinations</h4>
          <ul>
            <li>
              <a href="#europe">Europe</a>
            </li>
            <li>
              <a href="#asia">Asia</a>
            </li>
            <li>
              <a href="#africa">Africa</a>
            </li>
            <li>
              <a href="#america">America</a>
            </li>
            <li>
              <a href="#australia">Australia</a>
            </li>
            <li>
              <a href="#featured">Featured Tours</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#guided-tours">Guided Tours</a>
            </li>
            <li>
              <a href="#custom-packages">Custom Packages</a>
            </li>
            <li>
              <a href="#group-travel">Group Travel</a>
            </li>
            <li>
              <a href="#photography-tours">Photography Tours</a>
            </li>
            <li>
              <a href="#adventure-travel">Adventure Travel</a>
            </li>
            <li>
              <a href="#luxury-travel">Luxury Travel</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Travel Street,
              Adventure City, AC 12345
            </p>
            <p>
              <i className="fas fa-phone"></i> +1 (555) 123-4567
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@triplane.com
            </p>
            <p>
              <i className="fas fa-clock"></i> Mon-Fri: 9AM-6PM
            </p>
            <p>
              <i className="fas fa-globe"></i> www.triplane.com
            </p>
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <div className="newsletter-section">
          <h4>Subscribe to Our Newsletter</h4>
          <p>
            Get the latest travel updates, exclusive offers, and destination
            inspiration delivered to your inbox.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            &copy; {new Date().getFullYear()} Triplane. All rights reserved. |
            Your Gateway to Adventure
          </p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms of Service</a>
            <span>|</span>
            <a href="#privacy">Privacy Policy</a>
            <span>|</span>
            <a href="#cookies">Cookie Policy</a>
            <span>|</span>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
