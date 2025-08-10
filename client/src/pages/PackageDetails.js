import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { packageAPI, bookingAPI } from '../services/api';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await packageAPI.getPackageById(id);
      setPackageData(response.data);
      // Set default duration
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

      const response = await bookingAPI.createBooking(bookingData);

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
      <div className="package-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading package details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="package-details-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="package-details-error">
        <h2>Package Not Found</h2>
        <p>The package you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="package-details-page">
      <div className="package-details-container">
        {/* Package Info Section */}
        <div className="package-info-section">
          <div className="package-image-section">
            <img src={packageData.image} alt={packageData.title} />
            {packageData.featured && <div className="featured-badge">Featured</div>}
          </div>
          
          <div className="package-content-section">
            <div className="package-header">
              <h1>{packageData.title}</h1>
              <p className="package-location">
                <i className="fas fa-map-marker-alt"></i>
                {packageData.location}
              </p>
            </div>
            
            <div className="package-stats">
              <div className="stat-item">
                <i className="fas fa-clock"></i>
                <span>Duration: {packageData.duration}</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <span>Max Group: {packageData.maxGroupSize} people</span>
              </div>
              <div className="stat-item">
                <i className="fas fa-mountain"></i>
                <span>Difficulty: {packageData.difficulty}</span>
              </div>
            </div>

            <div className="package-description">
              <h3>Description</h3>
              <p>{packageData.description}</p>
            </div>

            <div className="package-price">
              <h3>Price</h3>
              <div className="price-amount">${packageData.price}</div>
              <span className="price-per-person">per person</span>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <div className="booking-card">
            <h3>Book This Tour</h3>
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numberOfPeople">Number of People</label>
                  <input
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    min="1"
                    max={packageData.maxGroupSize}
                    value={bookingForm.numberOfPeople}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <select
                    id="duration"
                    name="duration"
                    value={bookingForm.duration}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="7 days">7 days</option>
                    <option value="10 days">10 days</option>
                    <option value="14 days">14 days</option>
                    <option value={packageData.duration}>{packageData.duration} (Recommended)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bookingDate">Preferred Date</label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={bookingForm.bookingDate}
                  onChange={handleBookingChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleBookingChange}
                  rows="3"
                  placeholder="Any special requirements or requests..."
                />
              </div>

              <div className="booking-summary">
                <div className="summary-item">
                  <span>Price per person:</span>
                  <span>${packageData.price}</span>
                </div>
                <div className="summary-item">
                  <span>Number of people:</span>
                  <span>{bookingForm.numberOfPeople}</span>
                </div>
                <div className="summary-item">
                  <span>Duration:</span>
                  <span>{bookingForm.duration || packageData.duration}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Price:</span>
                  <span>${packageData.price * bookingForm.numberOfPeople}</span>
                </div>
              </div>

              {bookingError && (
                <div className="error-message">{bookingError}</div>
              )}

              <button 
                type="submit" 
                className="btn-book"
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Processing...' : 'Book Now'}
              </button>

              {!isAuthenticated() && (
                <p className="login-prompt">
                  Please <button 
                    type="button" 
                    onClick={() => navigate('/login')}
                    className="link-button"
                  >
                    login
                  </button> to book this tour.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
