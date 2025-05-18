import React from 'react';
import './AboutUsPage.css';

const teamMembers = [
  {
    name: 'Ch.M.Karthikeya',
    title: 'Founder & Developer',
    image: '/assets/me.jpg',
    bio: 'Driven by a passion for creating impactful digital solutions and simplifying technology for everyone.',
  },
];

const coreValues = [
  { name: 'Innovation with Integrity', description: 'We strive for groundbreaking solutions while upholding ethical practices.' },
  { name: 'Transparency and Trust', description: 'Building strong relationships with our users through open communication.' },
  { name: 'Impact-Driven Development', description: 'Creating tools that make a real difference in the lives of individuals and organizations.' },
  { name: 'User-First Design Philosophy', description: 'Designing intuitive and user-friendly experiences at the forefront of our process.' },
];

const testimonials = [
  { quote: 'This app has completely transformed the way I organize my life. Highly recommended!', author: 'Jordan A.' },
  { quote: 'A beautiful interface combined with great functionality. Kudos to the team!', author: 'Priya D.' },
  { quote: 'The support is fantastic and the features are incredibly useful. A game changer!', author: 'Sam K.' },
];

export default function AboutUsPage() {
  return (
    <main className="about-container">
      <section className="about-hero">
        <h1 className="hero-title">About Our Creative Hub</h1>
        <p className="hero-subtitle">
          We are a collective of dreamers and doers, united by the desire to craft exceptional digital experiences.
        </p>
      </section>

      <section className="about-mission">
        <h2 className="section-heading">Our Guiding Star</h2>
        <p className="mission-statement">
          To illuminate the digital landscape with innovative solutions that empower users and inspire progress. We are committed to building bridges between technology and everyday life, making the complex intuitive and the powerful accessible.
        </p>
      </section>

      <section className="our-story">
        <h2 className="section-heading">The Genesis of Our Journey</h2>
        <p className="story-paragraph">
          Our story began in the vibrant year of 2021, right here in Vijayawada, Andhra Pradesh, India. Fueled by late-night coding sessions and a shared vision for a simpler digital world, a small team embarked on a mission. What started as a humble endeavor has blossomed into a global community, touching the lives of countless users across diverse platforms.
        </p>
      </section>

      <section className="team-section">
        <h2 className="section-heading">Meet the Core Explorer</h2>
        <div className="team-members">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-member card">
              <img src={member.image} alt={member.name} className="member-image" />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-title">{member.title}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-heading">Pillars of Our Belief</h2>
        <ul className="values-list">
          {coreValues.map((value) => (
            <li key={value.name} className="value-item card">
              <strong className="value-name">✨ {value.name}</strong>
              <p className="value-description">{value.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="testimonials-section">
        <h2 className="section-heading">Echoes from Our Community</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial card">
              <p className="quote-text">“{testimonial.quote}”</p>
              <strong className="quote-author">- {testimonial.author}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section card">
        <h2 className="section-heading">Let's Connect</h2>
        <p className="contact-intro">
          Your thoughts and inquiries are valuable to us. Whether you have a question, a suggestion, or a potential collaboration in mind, we're eager to hear from you. Reach out and let's start a conversation!
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required className="input-field" />
          <input type="email" placeholder="Your Email" required className="input-field" />
          <textarea placeholder="Your Message" required className="textarea-field"></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </main>
  );
}