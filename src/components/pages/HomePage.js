import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HomePage() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const featuredHighlights = [
    { title: 'Explore New Books', description: 'Dive into captivating stories and expand your literary horizons.', icon: '📚', link: '/recom?type=book' },
    { title: 'Top Movies & Shows', description: 'Discover critically acclaimed films and binge-worthy series.', icon: '🎬', link: '/recom?type=movie' },
    { title: 'Culinary Delights', description: 'Find highly-rated restaurants and explore diverse cuisines near you.', icon: '🍽️', link: '/recom?type=restaurant' },
  ];

  const newsUpdates = [
    { id: 1, title: 'Site Maintenance Scheduled', date: '2025-05-15', content: 'Our platform will undergo scheduled maintenance on May 20th from 2 AM to 5 AM IST. We apologize for any inconvenience.', category: 'system' },
    { id: 2, title: 'Exciting New Features Launched!', date: '2025-05-12', content: 'We\'ve introduced enhanced filtering options and improved recommendation accuracy. Explore the changes!', category: 'features' },
    { id: 3, title: 'Community Spotlight: Book Club', date: '2025-05-08', content: 'Join our new online book club and connect with fellow readers. Check the forums for details.', category: 'community' },
  ];

  const testimonials = [
    { id: 1, user: 'Eleanor V.', quote: 'The personalized recommendations are fantastic! I\'ve discovered so many hidden gems.', rating: 5 },
    { id: 2, user: 'Samuel K.', quote: 'Finding great local eateries has never been easier. The reviews are always helpful.', rating: 4 },
    { id: 3, user: 'Olivia R.', quote: 'The movie suggestions are spot-on. I always find something interesting to watch.', rating: 5 },
  ];

  return (
    <main className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, {user?.name || 'Explorer'}!</h1>
          <p className="hero-subtitle">Your curated space for discovering books, movies, and dining experiences.</p>
          <Link to="/profile" className="btn-primary hero-cta">View Your Profile</Link>
        </div>
        <div className="hero-image-container">
          <img src="/assets/home-banner-2.jpg" alt="Welcome banner with diverse interests" className="hero-image" />
        </div>
      </section>

      <section className="featured-highlights">
        <h2 className="section-title">Explore Trending Now</h2>
        <div className="highlight-cards">
          {featuredHighlights.map(({ title, description, icon, link }) => (
            <Link key={title} to={link} className="highlight-card">
              <div className="highlight-icon">{icon}</div>
              <h3 className="highlight-title">{title}</h3>
              <p className="highlight-description">{description}</p>
              <span className="explore-more">Explore <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="news-updates">
        <h2 className="section-title">What's New</h2>
        <ul className="news-list">
          {newsUpdates.map(({ id, title, date, content, category }) => (
            <li key={id} className={`news-item ${category}`}>
              <div className="news-header">
                <h4 className="news-title">{title}</h4>
                <span className="news-date">{date}</span>
              </div>
              <p className="news-content">{content}</p>
              {category && <span className={`news-category ${category}`}>{category.toUpperCase()}</span>}
            </li>
          ))}
        </ul>
        {newsUpdates.length > 3 && (
          <Link to="/updates" className="btn-secondary view-all-news">View All Updates</Link>
        )}
      </section>

      <section className="recommendations-teaser">
        <div className="recommendations-content">
          <h2 className="section-title">Dive into Your Personalized Picks</h2>
          <p className="recommendations-text">Ready to discover content tailored just for you? Explore our recommendations based on your interests.</p>
          <Link to="/recom" className="btn-primary recommendations-cta">Go to Recommendations</Link>
        </div>
        <div className="recommendations-image-container">
          <img src="/assets/recommendations-teaser.jpg" alt="Personalized recommendations" className="recommendations-image" />
        </div>
      </section>

      <section className="quick-links">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/recom" className="quick-action-button">
            <span className="action-icon">✨</span> See Recommendations
          </Link>
          <Link to="/gen" className="quick-action-button">
            <span className="action-icon">💡</span> Generate Ideas
          </Link>
          <Link to="/outfit" className="quick-action-button">
            <span className="action-icon"><span role="img" aria-label="shirt">👕</span></span> Build Your Outfit
          </Link>
          <Link to="/comparison" className="quick-action-button">
            <span className="action-icon">⚖️</span> Compare Choices
          </Link>
          <Link to="/wishlist" className="quick-action-button">
            <span className="action-icon">❤️</span> Your Wishlist
          </Link>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Users Are Saying</h2>
        <div className="testimonial-grid">
          {testimonials.map(({ id, user, quote, rating }) => (
            <blockquote key={id} className="testimonial-card">
              <p className="testimonial-quote">"{quote}"</p>
              <footer className="testimonial-footer">
                <span className="testimonial-user">- {user}</span>
                {rating && (
                  <div className="rating">
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;