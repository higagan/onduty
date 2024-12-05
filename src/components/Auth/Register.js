// src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton 
} from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    type: '', // 'Doctor' or 'Hospital'
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setFormData({ ...formData, type: newType });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(formData);
    if (success) {
      setRegistrationSuccess(true);
    } else {
      // Handle registration failure if needed
    }
  };

  if (registrationSuccess) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for registering. You are now logged in.
        </Typography>
        {formData.type === 'Doctor' ? (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')} // Redirect to Listings
          >
            Go to Listings
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/hospital-register')} // Redirect to Hospital Registration
          >
            Complete Hospital Registration
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          name="username" 
          fullWidth 
          margin="normal" 
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField 
          label="Password" 
          name="password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Register As:
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={formData.type}
          exclusive
          onChange={handleTypeChange}
          fullWidth
          sx={{ mt: 1, mb: 2 }}
        >
          <ToggleButton value="Doctor">Medical Staff</ToggleButton>
          <ToggleButton value="Hospital">Hospital</ToggleButton>
        </ToggleButtonGroup>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={!formData.type}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
