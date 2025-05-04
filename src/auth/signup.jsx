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

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // 🔹 New loading state
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !name) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true); // 🔹 Start loading
    const obj = { email, password, name };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, obj)
      .then((res) => {
        toast.success('Registration successful');
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration error:', err);
        toast.error('Registration failed');
      })
      .finally(() => {
        setLoading(false); // 🔹 Stop loading
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
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full Name"
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading} // 🔹 disable button while loading
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" color="secondary">
                Login here
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default RegisterForm;
