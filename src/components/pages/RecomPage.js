import React, { useState } from 'react';
import './RecomPage.css'; // Import professional styles

const booksData = [
  { title: 'The Hobbit', genre: 'Fantasy', cover: '/assets/book_hobbit.jpg' },
  { title: '1984', genre: 'Dystopian', cover: '/assets/book_1984.jpg' },
  { title: 'To Kill a Mockingbird', genre: 'Classic', cover: '/assets/book_mockingbird.jpg' },
  { title: 'Dune', genre: 'Sci-Fi', cover: '/assets/book_dune.jpg' },
  { title: 'Mistborn: The Final Empire', genre: 'Fantasy', cover: '/assets/book_mistborn.jpg' },
];

const moviesData = [
  { title: 'Inception', image: '/assets/movie_inception.jpg', genre: 'Sci-Fi' },
  { title: 'Interstellar', image: '/assets/movie_interstellar.jpg', genre: 'Sci-Fi' },
  { title: 'The Matrix', image: '/assets/movie_matrix.jpg', genre: 'Sci-Fi' },
  { title: 'Spirited Away', image: '/assets/movie_spiritedaway.jpg', genre: 'Animation' },
];

const restaurantsData = [
  { name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.5, image: '/assets/restaurant_sushi.jpg' },
  { name: 'Spice Route', cuisine: 'Indian', rating: 4.2, image: '/assets/restaurant_indian.jpg' },
  { name: 'Bella Italia', cuisine: 'Italian', rating: 4.8, image: '/assets/restaurant_italian.jpg' },
  { name: 'Taco Fiesta', cuisine: 'Mexican', rating: 3.9, image: '/assets/restaurant_mexican.jpg' },
];

export default function RecomPage() {
  const [bookGenre, setBookGenre] = useState('All');
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [movieGenre, setMovieGenre] = useState('All');
  const [likedMovies, setLikedMovies] = useState([]);
  const [restaurantCuisine, setRestaurantCuisine] = useState('All');
  const [reactions, setReactions] = useState({});

  const toggleFavoriteBook = (title) => {
    setFavoriteBooks(prev => prev.includes(title) ? prev.filter(f => f !== title) : [...prev, title]);
  };

  const toggleLikeMovie = (title) => {
    setLikedMovies(prev => prev.includes(title) ? prev.filter(m => m !== title) : [...prev, title]);
  };

  const reactToRestaurant = (name, emoji) => {
    setReactions(prev => ({ ...prev, [name]: emoji }));
  };

  const filterBooksByGenre = booksData.filter(book => bookGenre === 'All' || book.genre === bookGenre);
  const filterMoviesByGenre = moviesData.filter(movie => movieGenre === 'All' || movie.genre === movieGenre);
  const filterRestaurantsByCuisine = restaurantsData.filter(r => restaurantCuisine === 'All' || r.cuisine === restaurantCuisine);

  return (
    <main className="recom-container">
      <section className="recom-section books">
        <h2 className="section-title">Dive into Books</h2>
        <div className="filter-controls">
          <label htmlFor="bookGenre">Filter by Genre:</label>
          <select id="bookGenre" value={bookGenre} onChange={e => setBookGenre(e.target.value)}>
            <option value="All">All Genres</option>
            {[...new Set(booksData.map(book => book.genre))].map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <ul className="item-list grid-layout">
          {filterBooksByGenre.map(book => (
            <li key={book.title} className="item-card book-card">
              {book.cover && <img src={book.cover} alt={book.title} className="item-cover" />}
              <h3 className="item-title">{book.title}</h3>
              <p className="item-subtitle">Genre: {book.genre}</p>
              <button className="favorite-button" onClick={() => toggleFavoriteBook(book.title)}>
                {favoriteBooks.includes(book.title) ? '★ Favorited' : '☆ Add to Favorites'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="recom-section movies">
        <h2 className="section-title">Explore Movies</h2>
        <div className="filter-controls">
          <label htmlFor="movieGenre">Filter by Genre:</label>
          <select id="movieGenre" value={movieGenre} onChange={e => setMovieGenre(e.target.value)}>
            <option value="All">All Genres</option>
            {[...new Set(moviesData.map(movie => movie.genre))].map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="item-list movie-grid">
          {filterMoviesByGenre.map(movie => (
            <div key={movie.title} className="item-card movie-card">
              {movie.image && <img src={movie.image} alt={movie.title} className="item-cover" />}
              <h3 className="item-title">{movie.title}</h3>
              <p className="item-subtitle">Genre: {movie.genre}</p>
              <button className="like-button" onClick={() => toggleLikeMovie(movie.title)}>
                {likedMovies.includes(movie.title) ? '❤️ Liked' : '♡ Like'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="recom-section restaurants">
        <h2 className="section-title">Discover Restaurants</h2>
        <div className="filter-controls">
          <label htmlFor="restaurantCuisine">Filter by Cuisine:</label>
          <select id="restaurantCuisine" value={restaurantCuisine} onChange={e => setRestaurantCuisine(e.target.value)}>
            <option value="All">All Cuisines</option>
            {[...new Set(restaurantsData.map(r => r.cuisine))].map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
        <ul className="item-list restaurant-list">
          {filterRestaurantsByCuisine.map(restaurant => (
            <li key={restaurant.name} className="item-card restaurant-card">
              {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="item-cover restaurant-image" />}
              <div className="restaurant-details">
                <h3 className="item-title">{restaurant.name}</h3>
                <p className="item-subtitle">Cuisine: {restaurant.cuisine}</p>
                <p className="rating">Rating: {restaurant.rating}/5</p>
              </div>
              <div className="emoji-reactions">
                <span
                  onClick={() => reactToRestaurant(restaurant.name, '😍')}
                  className={reactions[restaurant.name] === '😍' ? 'active-emoji' : ''}
                  aria-label="Love it"
                >
                  😍
                </span>
                <span
                  onClick={() => reactToRestaurant(restaurant.name, '😐')}
                  className={reactions[restaurant.name] === '😐' ? 'active-emoji' : ''}
                  aria-label="Neutral"
                >
                  😐
                </span>
                <span
                  onClick={() => reactToRestaurant(restaurant.name, '🤢')}
                  className={reactions[restaurant.name] === '🤢' ? 'active-emoji' : ''}
                  aria-label="Dislike"
                >
                  🤢
                </span>
                {reactions[restaurant.name] && <span className="user-reaction">{reactions[restaurant.name]}</span>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}