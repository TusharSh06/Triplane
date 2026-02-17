import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if admin already exists
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const response = await authAPI.checkAdmin();
        setAdminExists(response.data.adminExists);
      } catch (err) {
        console.error('Failed to check admin status:', err);
        // If we can't check, assume admin exists for security
        setAdminExists(true);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminExists();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="auth-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="auth-full-screen-container">
      <div className="auth-card register-card">
        {/* Left Side - Image */}
        <div className="auth-card-left">
          <div className="auth-overlay-logo">
            <i className="fas fa-plane-departure"></i>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-card-right">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
          </Link>

          <div className="auth-header">
            <h2>Create an Account</h2>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">First Name</label> {/* Keeping as Name for now but labeled styling */}
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                minLength="6"
              />
            </div>

            <div className="form-group">
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                minLength="6"
              />
            </div>

             <div className="form-group full-width">
                <label htmlFor="role">Role</label>
                 <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">Traveler</option>
                  {!adminExists && <option value="admin">Admin</option>}
                </select>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link to="/terms">Terms & Condition</Link></label>
            </div>

            <button type="submit" className="auth-btn">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="social-btn" type="button">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '24px', height: '24px'}} />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
