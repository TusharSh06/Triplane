import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Insta.Trip</h1>
          <p className="hero-subtitle">- instagrammable tours</p>
          <p className="hero-description">
            We are passionate about creating unforgettable travel experiences that not only take you to the most beautiful places in the world 
            but also ensure you capture stunning photos for your Instagram. Our mission is to make every journey both memorable and shareable.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Insta.Trip, we believe that travel should be both enriching and visually stunning. We've combined the art of photography 
                with the science of travel planning to create tours that deliver both incredible experiences and Instagram-worthy content.
              </p>
              <p>
                Our professional photographers accompany every tour, ensuring you get the perfect shots at the most picturesque locations. 
                We know the best angles, the perfect lighting, and the most photogenic spots that will make your Instagram followers envious.
              </p>
            </div>
            <div className="mission-stats">
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
                They'll guide you to the most photogenic locations and help you pose for stunning photos.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-hotel"></i>
              </div>
              <h3>Premium Accommodations</h3>
              <p>
                We carefully select 4-star hotels and boutique accommodations that are not only comfortable 
                but also provide beautiful backdrops for your photos.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>Curated Itineraries</h3>
              <p>
                Each tour is meticulously planned to include the most Instagram-worthy locations, 
                hidden gems, and must-see attractions that will make your feed stand out.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Small Group Tours</h3>
              <p>
                We keep our groups small to ensure personalized attention and the best photo opportunities. 
                Maximum 15 travelers per tour for an intimate experience.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Comfortable Transfers</h3>
              <p>
                All transportation is included and arranged for maximum comfort and convenience. 
                From airport transfers to daily excursions, we've got you covered.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Local Expertise</h3>
              <p>
                Our local guides know the best spots, the perfect timing for photos, and the hidden gems 
                that most tourists never discover.
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
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" alt="Alexandro Rossa" />
              </div>
              <h3>Alexandro Rossa</h3>
              <p className="member-role">Lead Photographer</p>
              <p className="member-bio">
                With over 10 years of experience in travel photography, Alexandro knows how to capture 
                the perfect moment. He's traveled to over 30 countries and has a keen eye for composition.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=2070&auto=format&fit=crop" alt="Alicia Keish" />
              </div>
              <h3>Alicia Keish</h3>
              <p className="member-role">Travel Coordinator</p>
              <p className="member-bio">
                Alicia ensures every detail of your journey is perfect. From booking the best hotels 
                to arranging unique experiences, she makes sure your trip is seamless and memorable.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" alt="Melissa Sol" />
              </div>
              <h3>Melissa Sol</h3>
              <p className="member-role">Creative Director</p>
              <p className="member-bio">
                Melissa curates our tour itineraries with an eye for the most photogenic locations. 
                She researches every destination to find the perfect spots for Instagram-worthy content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Passion for Travel</h3>
              <p>
                We're not just travel agents - we're travel enthusiasts who love exploring new places 
                and sharing those experiences with others.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Quality First</h3>
              <p>
                We never compromise on quality. From accommodations to experiences, we only offer 
                the best to our clients.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Safety & Trust</h3>
              <p>
                Your safety and comfort are our top priorities. We work with trusted partners 
                and maintain the highest safety standards.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Sustainable Tourism</h3>
              <p>
                We believe in responsible travel that benefits local communities and preserves 
                the beauty of our destinations for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Create Your Perfect Instagram Story?</h2>
          <p>
            Join us on an adventure that will not only give you incredible memories but also 
            provide you with stunning content for your social media. Let's make your Instagram followers jealous!
          </p>
          <div className="cta-buttons">
            <a href="/" className="btn-primary">Explore Tours</a>
            <a href="/contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
