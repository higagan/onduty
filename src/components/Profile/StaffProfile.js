// src/components/Profile/StaffProfile.js
import React, { useContext, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider, Paper, TextField, Button } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

function StaffProfile() {
  const { user, bookings, tasks, updateUserProfile } = useContext(AuthContext);

  const userBookings = bookings.filter(b => b.userId === user.username);

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    email: user.email || '',
    phone: user.phone || '',
    // Add other profile fields as needed
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Use updateUserProfile instead of setUser directly
    updateUserProfile(profileData);
    setEditMode(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user.username}'s Profile
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Type: Medical Staff
        </Typography>
        {!editMode ? (
          <>
            <Typography variant="body1">Email: {user.email || 'Not provided'}</Typography>
            <Typography variant="body1">Phone: {user.phone || 'Not provided'}</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </>
        ) : (
          <>
            <TextField 
              label="Email" 
              name="email" 
              fullWidth 
              margin="normal" 
              value={profileData.email}
              onChange={handleChange}
            />
            <TextField 
              label="Phone" 
              name="phone" 
              fullWidth 
              margin="normal" 
              value={profileData.phone}
              onChange={handleChange}
            />
            {/* Add other profile fields as needed */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
              Save
            </Button>
            <Button variant="text" sx={{ mt: 2, ml: 2 }} onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </>
        )}
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Bookings
        </Typography>
        {userBookings.length === 0 ? (
          <Typography variant="body1">No bookings yet.</Typography>
        ) : (
          <List>
            {userBookings.map((booking) => {
              const task = tasks.find(t => t.task_id === booking.taskId);
              return (
                <React.Fragment key={booking.bookingId}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Task ID: ${task.task_id} - ${task.department}`}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.primary">
                            Hospital: {task.hospital_name}
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            Date: {task.date}
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            Shift: {task.shift}
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            Qualification: {task.qualification}
                          </Typography>
                          {booking.bookingDetails.comments && (
                            <Typography variant="body2" color="text.secondary">
                              Comments: {booking.bookingDetails.comments}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default StaffProfile;
