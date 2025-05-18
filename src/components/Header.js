import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('/assets/nopfp.jpg');
  const dropdownRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };
  
  // Load profile pic from localStorage when Header mounts
  useEffect(() => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

useEffect(() => {
  const handleStorageChange = (event) => {
    if (event.key === 'profilePic') {
      setProfilePic(event.newValue);
    }
  };
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-3">
      <div>
        <img
          src="/assets/website logo 1.png"
          alt="Logo"
          className="h-10 w-auto"
        />
      </div>
      <nav className="space-x-6">
        <Link to="/home" className="text-white hover:text-gray-300 transition">Home</Link>
        <Link to="/recom" className="text-white hover:text-gray-300 transition">Recom</Link>
        <Link to="/gen" className="text-white hover:text-gray-300 transition">Gen</Link>
        <Link to="/outfit" className="text-white hover:text-gray-300 transition">Outfit</Link>
        <Link to="/about" className="text-white hover:text-gray-300 transition">About Us</Link>
      </nav>
      <div className="relative inline-block" ref={dropdownRef}>
        <img
          src={profilePic}
          alt="/assets/nopfp.jpg"
          onClick={toggleDropdown}
            onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/assets/nopfp.jpg'; // fallback image
  }}
          className="h-10 w-10 rounded-full cursor-pointer object-cover"
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded-md shadow-lg z-50">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </Link>
            <Link
              to="/comparison"
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Comparison
            </Link>
            <Link
              to="/wishlist"
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Wishlist
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
