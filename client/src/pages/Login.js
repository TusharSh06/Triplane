import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

    try {
      const response = await authAPI.login(formData);
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-full-screen-container">
      <div className="auth-card">
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
            <h2>Log in</h2>
            <p>Don't have an account? <Link to="/register">Create an Account</Link></p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
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
                placeholder="Enter your password"
                required
              />
            </div>

            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>

            <button type="submit" className="auth-btn">
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="social-btn" type="button">
              {/* Using a Google Icon image or keeping the FontAwesome one but ensuring authorized brand colors if needed. User asked for "good looking". Standard Google button is usually white with colored 'G' or blue. I'll stick to the cleanliness of the update in CSS. */}
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: '24px', height: '24px'}} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
