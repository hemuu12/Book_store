import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          Book Manager
        </Typography>
        <Box>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ textTransform: 'none' }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup" sx={{ textTransform: 'none' }}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
