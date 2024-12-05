// src/components/Task/BookingForm.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

function BookingForm() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, bookTask, user } = useContext(AuthContext);
  
  const task = tasks.find(t => t.task_id === parseInt(taskId));
  
  const [formData, setFormData] = useState({
    name: user.type === 'Doctor' ? user.username : '',
    contact: '',
    comments: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      ...formData,
      taskId: task.task_id,
      userId: user.type === 'Doctor' ? user.username : user.hospitalId,
      dateBooked: new Date().toISOString(),
    };
    bookTask(task.task_id, bookingDetails);
    setBookingSuccess(true);
    // In a real app, send bookingDetails to the backend
  };

  if (!task) {
    return <Typography variant="h6">Task not found.</Typography>;
  }

  if (bookingSuccess) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have successfully booked the task at {task.hospital_name}.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} >
          Go to Listings
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Book Task at {task.hospital_name}
      </Typography>
      <form onSubmit={handleSubmit}>
        {user.type === 'Doctor' && (
          <TextField 
            label="Full Name" 
            name="name" 
            fullWidth 
            margin="normal" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <TextField 
          label="Contact Number" 
          name="contact" 
          fullWidth 
          margin="normal" 
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <TextField 
          label="Comments" 
          name="comments" 
          fullWidth 
          margin="normal" 
          multiline
          rows={4}
          value={formData.comments}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Confirm Booking
        </Button>
      </form>
    </Box>
  );
}

export default BookingForm;
