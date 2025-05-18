import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
