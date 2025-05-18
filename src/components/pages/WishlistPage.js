import React, { useState } from 'react';
import './WishlistPage.css';

export default function Wishlist() {
  const initialItems = [
    'New Laptop',
    'Noise Cancelling Headphones',
    'Travel Backpack',
    'Smart Watch',
    'E-book Reader',
  ];

  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle drag start
  const onDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Handle drag over
  const onDragOver = (index, e) => {
    e.preventDefault();
    if (index === draggedIndex) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setItems(newItems);
  };

  // Handle drag end
  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      <main className="wishlist-container">
        <h2>Mini Wishlist - Drag to Prioritize</h2>
        <ul className="wishlist">
          {items.map((item, index) => (
            <li
              key={item}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(e) => onDragOver(index, e)}
              onDragEnd={onDragEnd}
              className={draggedIndex === index ? 'dragging' : ''}
            >
              <span className="drag-handle">☰</span>
              {item}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
