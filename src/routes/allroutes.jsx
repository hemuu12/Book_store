import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from '../components/todoList';
import RegisterForm from '../auth/signup';
import Login from '../auth/login';
import ProtectedRoute from '../components/privateRoute';

const Allroutes = () => {
  return (
    <Routes>
      {/* Root path redirects to dashboard if authenticated */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Allroutes;
