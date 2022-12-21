import React from 'react';
import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children }) {
  const token = window.localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
}
