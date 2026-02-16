import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content animate-fade-in-up">
          <h1>About Triplane</h1>
          <p className="hero-subtitle">- instagrammable tours</p>
          <p className="hero-description">
            We are passionate about creating unforgettable travel experiences that not only take you to the most beautiful places in the world 
            but also ensure you capture stunning photos for your Instagram. Our mission is to make every journey both memorable and shareable.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="about-preview-section">
        <div className="container about-preview-container">
          <div className="about-preview-content">
            <span className="section-subtitle">Who We Are</span>
            <h2>Redefining The Art Of Travel</h2>
            <p>
              Founded in 2024, Triplane was born from a simple belief: travel should be effortless, immersive, and deeply personal. 
              We've spent years scouting the most breathtaking corners of the globe to curate experiences that go beyond the ordinary.
            </p>
            <p>
              From the hidden alleys of Rome to the pristine peaks of the Himalayas, our mission is to connect you with the soul of every destination. 
              We handle every detail, so you can focus on the moments that matter.
            </p>
            <Link to="/packages" className="btn btn-primary">Start Your Adventure</Link>
          </div>
          <div className="about-preview-image">
            <img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop" alt="Travel Adventure" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text animate-slide-in-left">
              <h2>Our Mission</h2>
              <p>
                At Triplane, we believe that travel should be both enriching and visually stunning. We've combined the art of photography 
                with the science of travel planning to create tours that deliver both incredible experiences and Instagram-worthy content.
              </p>
              <p>
                Our professional photographers accompany every tour, ensuring you get the perfect shots at the most picturesque locations. 
                We know the best angles, the perfect lighting, and the most photogenic spots that will make your Instagram followers envious.
              </p>
            </div>
            <div className="mission-stats animate-slide-in-right">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Travelers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Destinations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Instagram Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-camera"></i>
              </div>
              <h3>Professional Photography</h3>
              <p>
                Our expert photographers know exactly where and when to capture the perfect shot. 
                They'll guide you to the most photogenic locations.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-hotel"></i>
              </div>
              <h3>Premium Accommodations</h3>
              <p>
                We carefully select 4-star hotels and boutique accommodations that are not only comfortable 
                but also provide beautiful backdrops.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>Curated Itineraries</h3>
              <p>
                Each tour is meticulously planned to include the most Instagram-worthy locations, 
                hidden gems, and must-see attractions.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Small Group Tours</h3>
              <p>
                We keep our groups small to ensure personalized attention and the best photo opportunities. 
                Maximum 15 travelers per tour.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=387&auto=format&fit=crop" alt="Tushar Sharma" />
              </div>
              <h3>Tushar Sharma</h3>
              <p className="member-role">Lead Photographer</p>
              <div className="member-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop" alt="Rudraksh Singh" />
              </div>
              <h3>Rudraksh Singh</h3>
              <p className="member-role">Travel Coordinator</p>
              <div className="member-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://wallpapers.com/images/high/funny-duck-pictures-p2xgp4wvt2fm7isd.webp" alt="Arun" />
              </div>
              <h3>Arun</h3>
              <p className="member-role">Creative Director</p>
              <div className="member-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://plus.unsplash.com/premium_photo-1666278379770-440439b08656?w=500&auto=format&fit=crop" alt="Tushar Kadian" />
              </div>
              <h3>Tushar Kadian</h3>
              <p className="member-role">Operations Manager</p>
              <div className="member-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://media.istockphoto.com/id/143921954/photo/male-chimpanzee-in-business-clothes.webp?a=1&b=1&s=612x612&w=0&k=20&c=yhWCdS5Zl0QyeDWI-AF9TtJukmFCfqk6Y-SA7mVo2nE=" alt="Anirudh" />
              </div>
              <h3>Anirudh</h3>
              <p className="member-role">Customer Experience</p>
              <div className="member-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Create Your Story?</h2>
          <p>
            Join us on an adventure that will not only give you incredible memories but also 
            provide you with stunning content for your social media.
          </p>
          <div className="cta-buttons">
            <Link to="/packages" className="btn-primary">Explore Tours</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
