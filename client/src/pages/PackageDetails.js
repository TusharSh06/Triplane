import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { packageAPI, bookingAPI } from '../services/api';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingForm, setBookingForm] = useState({
    numberOfPeople: 1,
    bookingDate: '',
    duration: '',
    specialRequests: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    fetchPackageDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await packageAPI.getPackageById(id);
      setPackageData(response.data);
      setBookingForm(prev => ({
        ...prev,
        duration: response.data.duration
      }));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch package details');
      setLoading(false);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      const totalPrice = packageData.price * bookingForm.numberOfPeople;
      const bookingData = {
        packageId: id,
        numberOfPeople: parseInt(bookingForm.numberOfPeople),
        bookingDate: bookingForm.bookingDate,
        duration: bookingForm.duration,
        totalPrice,
        specialRequests: bookingForm.specialRequests
      };

      await bookingAPI.createBooking(bookingData);
      alert('Booking created successfully!');
      navigate('/');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading adventure details...</p>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="details-error">
        <h2>Package Not Found</h2>
        <p>{error || "The package you're looking for doesn't exist."}</p>
        <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="package-details-page">
      {/* Hero Section */}
      <div className="details-hero" style={{ backgroundImage: `url(${packageData.image || '/placeholder-image.jpg'})` }}>
        <div className="details-hero-overlay"></div>
        <div className="details-hero-content container">
          <span className="location-tag"><i className="fas fa-map-marker-alt"></i> {packageData.location}</span>
          <h1>{packageData.title}</h1>
          <div className="hero-meta">
            <span><i className="far fa-clock"></i> {packageData.duration}</span>
            <span><i className="far fa-user"></i> Max {packageData.maxGroupSize} People</span>
            <span><i className="fas fa-mountain"></i> {packageData.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="details-container container">
        <div className="details-layout">
          {/* Main Content */}
          <div className="details-main">
            {/* Tabs */}
            <div className="details-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (24)
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content animate-fade">
                  <h3>About This Trip</h3>
                  <p>{packageData.description}</p>
                  
                  <div className="highlights-grid">
                    <div className="highlight-item">
                      <i className="fas fa-check-circle"></i>
                      <div>
                        <h4>Professional Guide</h4>
                        <p>Expert local guide throughout the trip</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <i className="fas fa-utensils"></i>
                      <div>
                        <h4>Meals Included</h4>
                        <p>Breakfast and dinner provided daily</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <i className="fas fa-bus"></i>
                      <div>
                        <h4>Transport</h4>
                        <p>Private air-conditioned vehicle</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <i className="fas fa-camera"></i>
                      <div>
                        <h4>Photography</h4>
                        <p>Scenic spots and photo opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-content animate-fade">
                  <h3>Trip Itinerary</h3>
                  <div className="timeline">
                    {[1, 2, 3].map((day) => (
                      <div key={day} className="timeline-item">
                        <div className="timeline-marker">{day}</div>
                        <div className="timeline-content">
                          <h4>Day {day}: Exploration & Adventure</h4>
                          <p>Start the day with a hearty breakfast followed by a guided tour of the local landmarks. Afternoon free time for shopping and personal exploration. Evening cultural show and dinner.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-content animate-fade">
                  <h3>Traveler Reviews</h3>
                  <div className="overall-rating">
                    <div className="rating-number">4.8</div>
                    <div className="rating-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <p>Based on 24 reviews</p>
                  </div>
                  {/* Mock Reviews */}
                  <div className="review-list">
                    <div className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">S</div>
                          <div>
                            <h4>Sarah Johnson</h4>
                            <span className="review-date">Oct 2023</span>
                          </div>
                        </div>
                        <div className="review-rating"><i className="fas fa-star"></i> 5.0</div>
                      </div>
                      <p>Absolutely amazing experience! The guide was knowledgeable and the scenery was breathtaking.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Booking Widget */}
          <div className="details-sidebar">
            <div className="booking-widget">
              <div className="price-header">
                <span className="price-label">Price per person</span>
                <div className="price-value">
                  <span className="currency">$</span>
                  <span className="amount">{packageData.price}</span>
                </div>
              </div>

              {bookingError && <div className="error-message">{bookingError}</div>}

              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingForm.bookingDate}
                    onChange={handleBookingChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Travelers</label>
                  <div className="guests-input">
                    <button type="button" onClick={() => setBookingForm(prev => ({ ...prev, numberOfPeople: Math.max(1, prev.numberOfPeople - 1) }))}>-</button>
                    <input
                      type="number"
                      name="numberOfPeople"
                      value={bookingForm.numberOfPeople}
                      onChange={handleBookingChange}
                      readOnly
                    />
                     <button type="button" onClick={() => setBookingForm(prev => ({ ...prev, numberOfPeople: Math.min(packageData.maxGroupSize, prev.numberOfPeople + 1) }))}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={bookingForm.specialRequests}
                    onChange={handleBookingChange}
                    placeholder="Dietary requirements, etc."
                    rows="2"
                  />
                </div>

                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>${packageData.price} x {bookingForm.numberOfPeople} people</span>
                    <span>${packageData.price * bookingForm.numberOfPeople}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>${packageData.price * bookingForm.numberOfPeople}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="book-now-btn"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Book Now'}
                </button>
              </form>
              
               {!isAuthenticated() && (
                <div className="login-prompt">
                  <p>Please <Link to="/login">login</Link> to book this tour.</p>
                </div>
              )}
            </div>
            
            <div className="help-box">
              <i className="fas fa-question-circle"></i>
              <div>
                <h4>Need Help?</h4>
                <p>Call us at +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
