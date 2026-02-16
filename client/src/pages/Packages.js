import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { packageAPI } from '../services/api';
import './Packages.css';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedDuration, setSelectedDuration] = useState('all');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageAPI.getAllPackages();
        setPackages(res.data);
        setFilteredPackages(res.data);
      } catch (err) {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let result = packages;

    if (searchTerm) {
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange < 5000) {
      result = result.filter(pkg => pkg.price <= priceRange);
    }

    if (selectedDuration !== 'all') {
      if (selectedDuration === 'short') { // < 5 days
        result = result.filter(pkg => parseInt(pkg.duration) < 5);
      } else if (selectedDuration === 'medium') { // 5-10 days
        result = result.filter(pkg => parseInt(pkg.duration) >= 5 && parseInt(pkg.duration) <= 10);
      } else if (selectedDuration === 'long') { // > 10 days
        result = result.filter(pkg => parseInt(pkg.duration) > 10);
      }
    }

    setFilteredPackages(result);
  }, [searchTerm, priceRange, selectedDuration, packages]);

  if (loading) {
    return (
      <div className="packages-loading">
        <div className="loading-spinner"></div>
        <p>Loading your next adventure...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="packages-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">Try Again</button>
      </div>
    );
  }

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <div className="packages-hero">
        <div className="packages-hero-content">
          <h1>Explore the World</h1>
          <p>Find the perfect destination for your next journey</p>
        </div>
      </div>

      <div className="packages-container">
        {/* Search & Filter Section */}
        <div className="packages-filters">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Max Price: ${priceRange}</label>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100" 
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <select 
              value={selectedDuration} 
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="all">Any Duration</option>
              <option value="short">Short Getaway (&lt; 5 days)</option>
              <option value="medium">Standard Trip (5-10 days)</option>
              <option value="long">Long Adventure (&gt; 10 days)</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div key={pkg._id} className="package-card">
                <div className="package-image">
                  <img
                    src={pkg.image || '/placeholder-image.jpg'}
                    alt={pkg.title}
                    onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                  />
                  {pkg.featured && <div className="featured-badge">Featured</div>}
                  <div className="package-overlay">
                    <Link to={`/package/${pkg._id}`} className="view-btn">View Details</Link>
                  </div>
                </div>
                <div className="package-content">
                  <span className="package-location"><i className="fas fa-map-marker-alt"></i> {pkg.location}</span>
                  <h3 className="package-title">{pkg.title}</h3>
                  <div className="package-meta">
                    <span><i className="far fa-clock"></i> {pkg.duration}</span>
                    <span><i className="far fa-user"></i> {pkg.maxGroupSize} People</span>
                  </div>
                  <div className="package-price-row">
                    <div className="price">
                      <span className="label">From</span>
                      <span className="amount">${pkg.price}</span>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star"></i> 4.5
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-packages">
              <h3>No packages match your search</h3>
              <p>Try adjusting your filters or search term.</p>
              <button 
                className="btn-reset"
                onClick={() => {
                  setSearchTerm('');
                  setPriceRange(5000);
                  setSelectedDuration('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
