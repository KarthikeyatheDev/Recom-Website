import React from 'react';
import './ComparisonPage.css';

export default function ComparisonPage() {
  // Sample data: Your recs and friend's recs
  const yourRecs = [
    'Inception',
    'The Matrix',
    'Interstellar',
    'The Dark Knight',
    'Parasite',
  ];

  const friendRecs = [
    'Inception',
    'The Matrix',
    'Avengers: Endgame',
    'Parasite',
    'Joker',
  ];

  // Compute overlap and unique items
  const overlap = yourRecs.filter(item => friendRecs.includes(item));
  const yourUnique = yourRecs.filter(item => !friendRecs.includes(item));
  const friendUnique = friendRecs.filter(item => !yourRecs.includes(item));

  return (
    <>
      <main className="comparison-container">
        <h2>Recommendation Overlap Map</h2>
        <div className="overlap-map">
          <section className="your-recs">
            <h3>Your Recommendations</h3>
            <ul>
              {yourUnique.length > 0 ? yourUnique.map(item => (
                <li key={item}>{item}</li>
              )) : <li className="empty">No unique recommendations</li>}
            </ul>
          </section>
          <section className="overlap-recs">
            <h3>Overlapping Recommendations</h3>
            <ul>
              {overlap.length > 0 ? overlap.map(item => (
                <li key={item}>{item}</li>
              )) : <li className="empty">No overlap</li>}
            </ul>
          </section>
          <section className="friend-recs">
            <h3>Friend's Recommendations</h3>
            <ul>
              {friendUnique.length > 0 ? friendUnique.map(item => (
                <li key={item}>{item}</li>
              )) : <li className="empty">No unique recommendations</li>}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
