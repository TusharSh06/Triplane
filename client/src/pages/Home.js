import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { packageAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  // Add scroll event listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await packageAPI.getAllPackages();
      setPackages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch packages');
      setLoading(false);
    }
  };

  const featuredPackages = packages.filter(pkg => pkg.featured).slice(0, 6);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchPackages}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-badge">EXPLORE THE WORLD WITH TRIPLANE</div>
          <h1 className="hero-title">Travel Beyond Your Limits</h1>
          <p className="hero-subtitle">Discover hidden gems, vibrant cities, and serene landscapes with our curated travel experiences.</p>
          
          <div className="hero-search-bar">
            <div className="search-item">
              <div className="search-label"><i className="fas fa-map-marker-alt"></i> WHERE TO?</div>
              <input type="text" placeholder="Dream destination..." />
            </div>
            <div className="search-item">
               <div className="search-label"><i className="fas fa-calendar-alt"></i> CHECK IN</div>
               <input type="text" placeholder="dd - mm - yyyy" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
            </div>
             <div className="search-item">
               <div className="search-label"><i className="fas fa-user-friends"></i> GUESTS</div>
               <input type="number" placeholder="How many?" min="1" />
            </div>
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>



      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-title">
            <p>Curated for You</p>
            <h2>Trending Destinations</h2>
          </div>
          
          <div className="featured-grid">
             {featuredPackages.map((pkg) => (
              <div key={pkg._id} className="package-card featured">
                <div className="package-image-wrapper">
                  <img 
                    src={pkg.image || '/placeholder-image.jpg'} 
                    alt={pkg.title} 
                    onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                  />
                  <span className="price-tag">${pkg.price}</span>
                  <button className="wishlist-btn"><i className="far fa-heart"></i></button>
                </div>
                <div className="package-info">
                  <span className="package-location">{pkg.location}</span>
                  <h3>{pkg.title}</h3>
                  <div className="package-meta">
                    <span><i className="far fa-clock"></i> {pkg.duration}</span>
                    <Link to={`/package/${pkg._id}`} className="btn-link">
                      View Details <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
             ))}
          </div>
        </div>
      </section>
      
       {/* Partners Section */}
       <section className="partners-section">
        <div className="container">
          <div className="partners-title">
            <p>Our Global Partners</p>
            <h2>Trusted by the Best</h2>
          </div>
          <div className="partners-grid">
            <div className="partner-logo"><i className="fab fa-fly"></i> Expedia</div>
            <div className="partner-logo"><i className="fab fa-airbnb"></i> Airbnb</div>
            <div className="partner-logo"><i className="fab fa-tripadvisor"></i> TripAdvisor</div>
            <div className="partner-logo"><i className="fas fa-hotel"></i> Booking.com</div>
          </div>
        </div>
      </section>

      {/* About / Newsletter Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-text-content">
            <span className="cta-subtitle">Let's Connect</span>
            <h2>Ready for your next adventure?</h2>
            <p>Feel free to reach out for business inquiries, collaboration, or just a quick travel chat!</p>
          </div>
          
          <div className="cta-social-grid">
            <a href="https://github.com/TusharSh06" target="_blank" rel="noopener noreferrer" className="social-card">
               <div className="social-icon"><i className="fab fa-github"></i></div>
               <span>GitHub Profile</span>
            </a>
            <a href="mailto:sharmatushar.22.06@gmail.com" className="social-card">
               <div className="social-icon"><i className="fas fa-envelope"></i></div>
               <span>Email Me</span>
            </a>
             <a href="https://tusharsharma.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-card">
               <div className="social-icon"><i className="fas fa-briefcase"></i></div>
               <span>My Portfolio</span>
            </a>
            <a href="https://www.linkedin.com/in/tushar-sh06/" target="_blank" rel="noopener noreferrer" className="social-card featured-social">
               <div className="social-icon"><i className="fab fa-linkedin"></i></div>
               <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default Home;
