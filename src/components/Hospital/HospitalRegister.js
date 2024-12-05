// src/components/Hospital/HospitalRegister.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function HospitalRegister() {
  const { completeHospitalRegistration } = useContext(AuthContext);
  const navigate = useNavigate();

  const [hospitalData, setHospitalData] = useState({
    name: '',
    address: '',
    about: '',
    contact: '',
    image: '', // URL or file upload
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e) => {
    setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = completeHospitalRegistration(hospitalData);
    if (success) {
      setRegistrationComplete(true);
    } else {
      // Handle registration failure if needed
    }
  };

  if (registrationComplete) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Hospital Registration Complete!
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/profile')}>
          Go to Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Complete Hospital Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Hospital Name" 
          name="name" 
          fullWidth 
          margin="normal" 
          value={hospitalData.name}
          onChange={handleChange}
          required
        />
        <TextField 
          label="Address" 
          name="address" 
          fullWidth 
          margin="normal" 
          value={hospitalData.address}
          onChange={handleChange}
          required
        />
        <TextField 
          label="About" 
          name="about" 
          fullWidth 
          margin="normal" 
          multiline
          rows={4}
          value={hospitalData.about}
          onChange={handleChange}
          required
        />
        <TextField 
          label="Contact Number" 
          name="contact" 
          fullWidth 
          margin="normal" 
          value={hospitalData.contact}
          onChange={handleChange}
          required
        />
        {/* For simplicity, we'll use a text field for image URL. In a real app, implement file upload. */}
        <TextField 
          label="Hospital Image URL" 
          name="image" 
          fullWidth 
          margin="normal" 
          value={hospitalData.image}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Complete Registration
        </Button>
      </form>
    </Box>
  );
}

export default HospitalRegister;
