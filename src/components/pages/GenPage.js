import React, { useState } from 'react';
import './GenPage.css';

const activities = {
  Education: ['Learn a new language skill', 'Explore a new subject online'],
  Fitness: ['Engage in a 15-minute bodyweight workout', 'Practice mindful stretching'],
  Fun: ['Try a new recipe', 'Listen to a genre of music you\'ve never heard']
};

const travelIdeas = [
  { place: 'Bora Bora', region: 'Oceania', rating: 5, image: '/assets/travel_bora_bora.jpg' },
  { place: 'Machu Picchu', region: 'South America', rating: 4, image: '/assets/travel_machu_picchu.jpg' },
  { place: 'Santorini', region: 'Europe', rating: 5, image: '/assets/travel_santorini.jpg' },
  { place: 'Mount Fuji', region: 'Asia', rating: 4, image: '/assets/travel_fuji.jpg' },
];

const giftIdeas = {
  Birthday: ['Personalized journal', 'Subscription to a hobby box'],
  Anniversary: ['Experience day (cooking class, pottery)', 'Engraved keepsake'],
  Graduation: ['Career development book', 'High-quality pen set'],
  'Just Because': ['A cozy blanket', 'Gourmet snack basket']
};

export default function GenPage() {
  const [activityCategory, setActivityCategory] = useState('Education');
  const [activity, setActivity] = useState('');
  const [activityGenerated, setActivityGenerated] = useState(false);

  const [region, setRegion] = useState('All');
  const [filteredTravelIdeas, setFilteredTravelIdeas] = useState(travelIdeas);

  const [occasion, setOccasion] = useState('Birthday');
  const [gift, setGift] = useState('');
  const [giftGenerated, setGiftGenerated] = useState(false);

  const generateActivity = () => {
    const items = activities[activityCategory];
    setActivity(items[Math.floor(Math.random() * items.length)]);
    setActivityGenerated(true);
  };

  const generateGift = () => {
    const items = giftIdeas[occasion];
    setGift(items[Math.floor(Math.random() * items.length)]);
    setGiftGenerated(true);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    setFilteredTravelIdeas(
      travelIdeas.filter(t => selectedRegion === 'All' || t.region === selectedRegion)
    );
  };

  return (
    <main className="gen-container">
      <section className="gen-section activity-generator">
        <h2 className="section-title">Unleash Your Next Activity</h2>
        <label htmlFor="activityCategory">Category:</label>
        <select id="activityCategory" value={activityCategory} onChange={e => setActivityCategory(e.target.value)}>
          {Object.keys(activities).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button className="generate-button" onClick={generateActivity}>Spark an Idea</button>
        {activityGenerated && <p className="result activity-result">Activity: <span className="highlight">{activity}</span></p>}
      </section>

      <section className="gen-section travel-ideas">
        <h2 className="section-title">Wanderlust Inspiration</h2>
        <label htmlFor="regionFilter">Filter by Region:</label>
        <select id="regionFilter" value={region} onChange={handleRegionChange}>
          <option value="All">All Regions</option>
          {[...new Set(travelIdeas.map(t => t.region))].sort().map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>
        <ul className="idea-list travel-list">
          {filteredTravelIdeas.map(t => (
            <li key={t.place} className="idea-item travel-item">
              {t.image && <div className="idea-image-container"><img src={t.image} alt={t.place} className="idea-image" /></div>}
              <div className="idea-details">
                <h3 className="idea-title">{t.place}</h3>
                <p className="idea-subtitle">Region: {t.region}</p>
                <div className="rating">Rating: <span className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span></div>
              </div>
            </li>
          ))}
        </ul>
        {filteredTravelIdeas.length === 0 && <p className="no-results">No travel ideas found for the selected region.</p>}
      </section>

      <section className="gen-section gift-generator">
        <h2 className="section-title">Find the Perfect Gift</h2>
        <label htmlFor="occasionSelect">Occasion:</label>
        <select id="occasionSelect" value={occasion} onChange={e => setOccasion(e.target.value)}>
          {Object.keys(giftIdeas).sort().map(occ => (
            <option key={occ} value={occ}>{occ}</option>
          ))}
        </select>
        <button className="generate-button" onClick={generateGift}>Suggest a Gift</button>
        {giftGenerated && <p className="result gift-result">Gift Idea: <span className="highlight">{gift}</span></p>}
      </section>
    </main>
  );
}