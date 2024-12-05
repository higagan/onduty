// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement actual authentication logic here
    const success = login(credentials);
    if (success) {
      // Redirect based on user type
      const from = location.state?.from || '/';
      navigate(from);
    } else {
      setError('Invalid credentials or Hospital not found. Please try again.');
    }
  };
  
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          name="username" 
          fullWidth 
          margin="normal" 
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <TextField 
          label="Password" 
          name="password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          New to MedDuty? <Button component={Link} to="/register">Register Here</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
