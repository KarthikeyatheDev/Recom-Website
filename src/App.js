import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout';

import HomePage from './components/pages/HomePage';
import RecomPage from './components/pages/RecomPage';
import GenPage from './components/pages/GenPage';
import OutfitPage from './components/pages/OutfitPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ProfilePage from './components/pages/ProfilePage';
import ComparisonPage from './components/pages/ComparisonPage';
import WishlistPage from './components/pages/WishlistPage';

import { ProfilePicProvider } from 'E:\\book_recom\\src\\context\\ProfilePicContext.js';
import './App.css';

// Background color controller component inside App.js
function AppLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (pathname === '/home') {
      document.body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb);";
    } else if (pathname === '/profile') {
      document.body.style.background = 'linear-gradient(135deg, #fce4ec, #f48fb1)';
    } else if (pathname === '/wishlist') {
      document.body.style.background = 'linear-gradient(135deg, #e8f5e9, #81c784)';
    }else if (pathname === '/recom') {
      document.body.style.background = 'linear-gradient(135deg, #fbc7a4, #fa709a)';
    }else if (pathname === '/gen') {
      document.body.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }else if (pathname === '/outfit') {
      document.body.style.background = 'linear-gradient(135deg, #e3f2fd, #64b5f6)';
    }else if (pathname === '/comparison') {
      document.body.style.background = 'linear-gradient(135deg, #ede7f6, #9575cd)';
    }else if (pathname === '/about') {
      document.body.style.background = 'linear-gradient(135deg, #d4fc79, #96e6a1)';
    }
    else {
      document.body.style.backgroundColor = '#fff';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [location]);

  return <>{children}</>;
}

function App() {
  return (
    <ProfilePicProvider>
      <Router>
        {/* AppLayout wraps Routes to change background on route change */}
        <AppLayout>
          <Routes>
            {/* Public routes without Layout */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with Layout */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recom"
              element={
                <ProtectedRoute>
                  <Layout>
                    <RecomPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/gen"
              element={
                <ProtectedRoute>
                  <Layout>
                    <GenPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/outfit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OutfitPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AboutUsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/comparison"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ComparisonPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Layout>
                    <WishlistPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </Router>
    </ProfilePicProvider>
  );
}

export default App;
