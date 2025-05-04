import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  console.log(token,"ffffffffff");
  
  useEffect(()=>{

    
  },[token])

  if (!token) {
    console.log(token,"222222222");

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;