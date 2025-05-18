import React, { useState, useEffect } from 'react';
import './OutfitPage.css';

const items = {
  Tops: ['T-shirt', 'Hoodie', 'Sweat Shirt', 'Blouse', 'Tank Top'],
  Bottoms: ['Jeans', 'Skirt', 'Shorts', 'Dress Pants', 'Leggings'],
  Footwear: ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats']
};

const styleMap = {
  'T-shirt': 'casual',
  'Hoodie': 'sporty',
  'Sweat Shirt': 'casual',
  'Blouse': 'semi-formal',
  'Tank Top': 'casual',
  'Jeans': 'casual',
  'Skirt': 'semi-formal',
  'Shorts': 'casual',
  'Dress Pants': 'formal',
  'Leggings': 'sporty',
  'Sneakers': 'casual',
  'Boots': 'stylish',
  'Sandals': 'casual',
  'Heels': 'formal',
  'Flats': 'casual',
};

function computeScore(top, bottom, shoe) {
  const ts = styleMap[top];
  const bs = styleMap[bottom];
  const fs = styleMap[shoe];

  let score = 5;
  if (ts === bs && bs === fs) score = 9;
  else if ((ts === bs && ts !== fs) || (bs === fs && bs !== ts) || (ts === fs && ts !== bs)) score = 7;
  else if (ts && bs && fs) score = 4;

  // Bonus and Penalties for specific combinations
  if (top === 'Blouse' && bottom === 'Skirt' && shoe === 'Boots') score = 8;
  if (top === 'Tank Top' && bottom === 'Dress Pants') score = 3;
  if (top === 'Hoodie' && bottom === 'Skirt' && shoe === 'Heels') score = 3;

  return score;
}

const allCombos = [];
Object.values(items)[0].forEach(top => {
  Object.values(items)[1].forEach(bottom => {
    Object.values(items)[2].forEach(shoe => {
      allCombos.push({
        top,
        bottom,
        shoe,
        score: computeScore(top, bottom, shoe)
      });
    });
  });
});

function sortCombosByScore(combos) {
  return [...combos].sort((a, b) => b.score - a.score);
}

const topRatedCombos = sortCombosByScore(allCombos).slice(0, 5);

export default function OutfitPage() {
  const [outfit, setOutfit] = useState({ Tops: '', Bottoms: '', Footwear: '' });
  const [highlight, setHighlight] = useState(null);
  const [showTopCombos, setShowTopCombos] = useState(false);

  const handleDrop = (category, item) => {
    setOutfit(prev => ({ ...prev, [category]: item }));
    setHighlight(category);
    setTimeout(() => setHighlight(null), 500);
  };

  const getComboScore = () => {
    const { Tops, Bottoms, Footwear } = outfit;
    if (!Tops || !Bottoms || !Footwear) return 'Incomplete';
    return computeScore(Tops, Bottoms, Footwear);
  };

  const toggleTopCombos = () => {
    setShowTopCombos(!showTopCombos);
  };

  return (
    <main className="outfit-container">
      <h2 className="vibrant-title">Style Your Look</h2>
      <div className="outfit-builder">
        <div className="categories-grid">
          {Object.entries(items).map(([category, list]) => (
            <div key={category} className={`category category-${category.toLowerCase()} elevate-on-hover`}>
              <h3>{category}</h3>
              <div className="items-scrollable">
                {list.map(item => (
                  <div
                    key={item}
                    className="draggable item-bubble"
                    draggable
                    onDragStart={e =>
                      e.dataTransfer.setData('text/plain', JSON.stringify({ category, item }))
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`dropzone elegant-border ${highlight ? 'dropzone-highlight' : ''}`}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            handleDrop(data.category, data.item);
          }}
        >
          <h3>Your Outfit</h3>
          <ul className="current-outfit">
            {Object.entries(outfit).map(([category, item]) => (
              <li key={category} className={`outfit-item ${highlight === category ? 'highlighted' : ''}`}>
                <span className="category-label">{category}:</span> <span className="item-name">{item || 'None'}</span>
              </li>
            ))}
          </ul>
          <div className="score stylish-text">Outfit Score: {getComboScore()}</div>
        </div>
      </div>

      <div className="top-combos-section">
        <button className="show-combos-button pulse-on-hover" onClick={toggleTopCombos}>
          {showTopCombos ? 'Hide Top Combinations' : 'Show Top Style Combinations'}
        </button>
        {showTopCombos && (
          <div className="combo-table glassmorphism">
            <h3>Top Rated Combinations</h3>
            <table>
              <thead>
                <tr>
                  <th>Top</th>
                  <th>Bottom</th>
                  <th>Footwear</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {topRatedCombos.map((combo, index) => (
                  <tr key={index}>
                    <td>{combo.top}</td>
                    <td>{combo.bottom}</td>
                    <td>{combo.shoe}</td>
                    <td className="score-value">{combo.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}