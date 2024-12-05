// src/components/Task/TaskList.js
import React, { useContext, useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import FilterBar from '../Filters/FilterBar';

function TaskList() {
  const { tasks, hospitals, user } = useContext(AuthContext);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilter = (filters) => {
    let filtered = tasks;

    if (filters.date) {
      filtered = filtered.filter(task => task.date === filters.date);
    }

    if (filters.hospital) {
      filtered = filtered.filter(task => task.hospital_id === parseInt(filters.hospital));
    }

    if (filters.shift) {
      filtered = filtered.filter(task => task.shift === filters.shift);
    }

    if (filters.department) {
      filtered = filtered.filter(task => task.department === filters.department);
    }

    if (filters.qualification) {
      filtered = filtered.filter(task => task.qualification === filters.qualification);
    }

    setFilteredTasks(filtered);
  };

  const handleBookClick = (taskId) => {
    if (!user) {
      // If user is not authenticated, redirect to login
      navigate('/login', { state: { from: `/book/${taskId}` } });
    } else if (user.type !== 'Doctor') {
      // If user is not a Doctor, show an error
      alert('Only Medical Staff can book tasks.');
    } else {
      // Redirect to booking form
      navigate(`/book/${taskId}`);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        Available Tasks
      </Typography>
      {!user && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Want to book a task? <Button component={Link} to="/login">Login</Button> or <Button component={Link} to="/register">Register</Button> to get started.
          </Typography>
        </Box>
      )}
      <FilterBar onFilter={handleFilter} />
      <Grid container spacing={4}>
        {filteredTasks.map((task) => {
          const hospital = hospitals.find(h => h.hospital_id === task.hospital_id);
          return (
            <Grid item key={task.task_id} xs={12} sm={6} md={4}>
              <Card>
                {hospital && (
                  <CardContent>
                    <Typography variant="h6">{hospital.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hospital.address}
                    </Typography>
                  </CardContent>
                )}
                <CardContent>
                  <Typography variant="subtitle1">{task.department}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {task.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shift: {task.shift}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Qualification: {task.qualification}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleBookClick(task.task_id)}>
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default TaskList;
