import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { bookingAPI, authAPI, uploadAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, login, isAdmin } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
        setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
    // Only fetch bookings for non-admin users
    if (!isAdmin()) {
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, [isAdmin, user]);

  const fetchUserBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await uploadAPI.uploadImage(formData);

      // Update user profile with new photo URL
      const updateResponse = await authAPI.updateProfile({
        profilePhoto: response.data.url
      });

      // Update context with new user data
      login(localStorage.getItem('token'), updateResponse.data);
      alert('Profile photo updated successfully!');
    } catch (err) {
      setError('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await authAPI.updateProfile(updateData);

      login(localStorage.getItem('token'), response.data);
      setEditMode(false);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.updateBookingStatus(bookingId, 'cancelled');
      fetchUserBookings();
      alert('Booking cancelled successfully!');
    } catch (err) {
      setError('Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'var(--success-color)';
      case 'pending': return 'var(--warning-color)';
      case 'cancelled': return 'var(--danger-color)';
      case 'completed': return 'var(--info-color)';
      default: return 'var(--text-light)';
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="profile-cover">
        <div className="profile-cover-overlay"></div>
      </div>

      <div className="profile-container">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img 
                src={user?.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2070&auto=format&fit=crop'} 
                alt={user?.name} 
              />
              <label htmlFor="photo-upload" className="avatar-upload-btn">
                <i className="fas fa-camera"></i>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {uploading && <div className="upload-spinner"></div>}
            </div>
            <div className="profile-info">
              <h1>{user?.name}</h1>
              <p className="user-email">{user?.email}</p>
              <div className="user-role-badge">{user?.role}</div>
            </div>
          </div>
          <div className="profile-actions">
            <button 
              className={`action-btn ${editMode ? 'active' : ''}`}
              onClick={() => setEditMode(!editMode)}
            >
              <i className="fas fa-edit"></i> {editMode ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Edit Form Section */}
        {editMode && (
          <div className="profile-section edit-section animate-fade">
             <div className="section-header">
              <h2>Edit Profile</h2>
            </div>
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="password-section">
                <h3>Change Password <span className="optional">(Optional)</span></h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Required to set new password"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* Dashboard Content */}
        {!isAdmin() && !editMode && (
          <div className="profile-content">
            <div className="content-tabs">
              <button 
                className={`tab-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <i className="fas fa-suitcase"></i> My Bookings
              </button>
              <button 
                className={`tab-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <i className="fas fa-heart"></i> Wishlist
              </button>
            </div>

            <div className="tab-panel">
              {activeTab === 'bookings' && (
                <div className="bookings-list">
                  {bookings.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon"><i className="fas fa-map-marked-alt"></i></div>
                      <h3>No bookings yet</h3>
                      <p>Time to start your next adventure!</p>
                      <a href="/packages" className="btn-primary">Explore Packages</a>
                    </div>
                  ) : (
                     bookings.map((booking) => {
                      if (!booking.packageId) return null;
                      return (
                        <div key={booking._id} className="booking-item">
                          <div className="booking-thumb">
                             <img 
                                src={booking.packageId.image || '/placeholder-image.jpg'} 
                                alt={booking.packageId.title} 
                                onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                              />
                              <span className="booking-status-badge" style={{ background: getStatusColor(booking.status) }}>
                                {booking.status}
                              </span>
                          </div>
                          <div className="booking-info">
                            <h3>{booking.packageId.title}</h3>
                            <div className="booking-meta">
                              <span><i className="far fa-calendar"></i> {new Date(booking.bookingDate).toLocaleDateString()}</span>
                              <span><i className="far fa-user"></i> {booking.numberOfPeople} People</span>
                              <span><i className="far fa-clock"></i> {booking.duration || booking.packageId.duration}</span>
                            </div>
                            <div className="booking-price">
                              Total: <strong>${booking.totalPrice}</strong>
                            </div>
                          </div>
                          <div className="booking-item-actions">
                             {booking.status === 'pending' && (
                                <button className="btn-outline-danger" onClick={() => cancelBooking(booking._id)}>
                                  Cancel
                                </button>
                              )}
                              <button className="btn-outline">View Details</button>
                          </div>
                        </div>
                      );
                     })
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-list">
                  <div className="empty-state">
                    <div className="empty-icon"><i className="far fa-heart"></i></div>
                    <h3>Your wishlist is empty</h3>
                    <p>Save packages you're interested in.</p>
                    <a href="/packages" className="btn-primary">Explore Packages</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
