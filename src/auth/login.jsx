import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error('Email and password are required');
      return;
    }

    axios
    .post('http://localhost:4000/user/login', { email, password })
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      toast.success('Login successful');
  
      // Delay the redirection to the dashboard
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard after a delay
      }, 2000);
    })
    .catch((err) => {
      console.error('Error logging in:', err);
      toast.error('Login failed');
    });
  };

  return (
    <React.Fragment>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          fullWidth
          sx={{ mb: 3 }}
          value={email}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          value={password}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <small>
        Need an account? <Link to="/signup">Register here</Link>
      </small>
    </React.Fragment>
  );
};

export default Login;
