// src/components/Profile/HospitalProfile.js
import React, { useContext } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider, Card, CardMedia, CardContent, Button, Paper } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import AddTaskForm from './AddTaskForm';

function HospitalProfile() {
  const { user, bookings, tasks, hospitals } = useContext(AuthContext);
  
  const hospital = hospitals.find(h => h.hospital_id === user.hospitalId);
  const hospitalTasks = tasks.filter(t => t.hospital_id === hospital.hospital_id);
  const hospitalBookings = bookings.filter(b => hospitalTasks.some(t => t.task_id === b.taskId));

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5 }}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={hospital.image || '/assets/images/placeholder.png'}
          alt={hospital.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {hospital.name}'s Profile
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Address: {hospital.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            About: {hospital.about}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Contact: {hospital.contact}
          </Typography>
          {/* Additional profile update fields can be added here */}
        </CardContent>
      </Card>

      {/* Add Task Form */}
      <AddTaskForm />

      {/* Bookings Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Bookings for Your Tasks
        </Typography>
        {hospitalBookings.length === 0 ? (
          <Typography variant="body1">No bookings yet.</Typography>
        ) : (
          <List>
            {hospitalBookings.map((booking) => {
              const task = tasks.find(t => t.task_id === booking.taskId);
              return (
                <React.Fragment key={booking.bookingId}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Task ID: ${task.task_id} - ${task.department}`}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.primary">
                            Staff: {booking.userId}
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            Date Booked: {new Date(booking.bookingDetails.dateBooked).toLocaleString()}
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

export default HospitalProfile;
