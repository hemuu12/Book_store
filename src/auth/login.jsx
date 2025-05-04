import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password })
      .then((res) => {
        const token = res.data.token;
        login(token)
        localStorage.setItem('token', token);
        toast.success('Login successful');

        if (token) {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.error('Error logging in:', err);
        toast.error('Login failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Fade in timeout={500}>
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            marginTop: 8,
            borderRadius: 3,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="primary"
              sx={{ mb: 3 }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                paddingY: 1.2,
                fontWeight: 'bold',
                textTransform: 'none',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3 }}
            >
              Need an account?{' '}
              <MuiLink component={Link} to="/signup" color="secondary">
                Register here
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;
