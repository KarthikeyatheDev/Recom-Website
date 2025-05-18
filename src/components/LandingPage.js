// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css'; // Import external CSS

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">Recomania</div>
        <nav className="main-nav">
          <ul>
            <li><a href="#recommendations">Recommendations</a></li>
            <li><a href="#generation">Outfit Generation</a></li>
            <li><a href="#comparison">Style Comparison</a></li>
            <li><a href="#wishlist">Your Favorites</a></li>
            <li><a href="#about-us">About Us</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="secondary-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="primary-btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Ultimate Fashion Experience with Recomania</h1>
          <p className="tagline">Discover personalized recommendations, generate unique outfits, compare styles, and curate your dream wardrobe.</p>
          <div className="call-to-action">
            <button className="primary-btn large-btn" onClick={() => navigate('/register')}>Get Started</button>
            <button className="secondary-btn outline-btn">Explore Features</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/landing-hero.png" alt="Recomania Interface" />
        </div>
      </section>

      <section id="recommendations" className="feature-highlight-section bg-gradient-salmon-pink">
        <div className="feature-highlight-content">
          <h2>Personalized Recommendations Just For You on Recomania</h2>
          <p>Tired of endless scrolling? Our intelligent recommendation engine learns your style and suggests outfits and items you'll love.</p>
          <button className="primary-btn" onClick={() => navigate('/recom')}>See Recommendations</button>
        </div>
        <div className="feature-highlight-image">
          <img src="/assets/landing-recommendations.png" alt="Fashion Recommendations" />
        </div>
      </section>

      <section id="generation" className="feature-highlight-section bg-gradient-purple">
        <div className="feature-highlight-image">
          <img src="/assets/landing-generation.png" alt="Outfit Generation Tool" />
        </div>
        <div className="feature-highlight-content">
          <h2>Unleash Your Creativity with Recomania's Outfit Generation</h2>
          <p>Mix and match your existing wardrobe or explore new combinations with our powerful outfit generator. Discover fresh looks effortlessly.</p>
          <button className="primary-btn" onClick={() => navigate('/gen')}>Generate Outfits</button>
        </div>
      </section>

      <section id="comparison" className="feature-highlight-section bg-gradient-purple-light">
        <div className="feature-highlight-content">
          <h2>Compare Styles and Make the Best Choice with Recomania</h2>
          <p>Deciding between two outfits? Our comparison feature helps you see the differences side-by-side, ensuring you pick the perfect look.</p>
          <button className="primary-btn" onClick={() => navigate('/comparison')}>Compare Styles</button>
        </div>
        <div className="feature-highlight-image">
          <img src="/assets/landing-comparison.png" alt="Style Comparison Interface" />
        </div>
      </section>

      <section id="wishlist" className="feature-highlight-section bg-gradient-green">
        <div className="feature-highlight-image">
          <img src="/assets/landing-wishlist.png" alt="Your Wishlist" />
        </div>
        <div className="feature-highlight-content">
          <h2>Save Your Favorite Looks to Your Recomania Wishlist</h2>
          <p>Found something you love but not ready to buy? Add it to your wishlist and keep track of your future fashion desires.</p>
          <button className="primary-btn" onClick={() => navigate('/wishlist')}>View Wishlist</button>
        </div>
      </section>

      <section id="about-us" className="about-us-section">
        <div className="about-us-content">
          <h2>About Recomania</h2>
          <p>Recomania is designed to revolutionize your online fashion experience. We leverage intelligent algorithms and user-friendly tools to help you discover new styles, make informed decisions, and ultimately feel more confident in your fashion choices.</p>
          <p>Our platform integrates features like personalized recommendations, an outfit generation tool, style comparison, and a wishlist to streamline your fashion journey. We are committed to innovation and providing a seamless, enjoyable experience for all fashion enthusiasts.</p>
          <button className="secondary-btn outline-btn" onClick={() => navigate('/about')}>Learn More</button>
        </div>
        <div className="about-us-image">
          <img src="/assets/landing-about.png" alt="Recomania Team" />
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <p>&copy; 2025 Recomania. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;