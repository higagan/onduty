// src/components/Profile/AddTaskForm.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Grid, Paper } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

function AddTaskForm() {
  const { addTask } = useContext(AuthContext);
  const [taskData, setTaskData] = useState({
    department: '',
    date: '',
    shift: '',
    qualification: '',
  });
  const [tasks, setTasks] = useState([]); // To manage multiple tasks
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    // Validate taskData before adding
    const { department, date, shift, qualification } = taskData;
    if (!department || !date || !shift || !qualification) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Add to local tasks array
    setTasks([...tasks, { ...taskData }]);
    // Reset taskData
    setTaskData({
      department: '',
      date: '',
      shift: '',
      qualification: '',
    });
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (tasks.length === 0) {
      setErrorMessage('No tasks to submit.');
      return;
    }

    // Iterate over tasks and add each
    tasks.forEach(task => {
      addTask(task);
    });

    setSuccessMessage(`${tasks.length} task(s) added successfully!`);
    setTasks([]);
    setErrorMessage('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              value={taskData.department}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              {/* Example departments */}
              <MenuItem value="Emergency">Emergency</MenuItem>
              <MenuItem value="Cardiology">Cardiology</MenuItem>
              <MenuItem value="Neurology">Neurology</MenuItem>
              <MenuItem value="Pediatrics">Pediatrics</MenuItem>
              <MenuItem value="Oncology">Oncology</MenuItem>
              {/* Add more departments as needed */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={taskData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Shift"
              name="shift"
              value={taskData.shift}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Qualification"
              name="qualification"
              value={taskData.qualification}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              {/* Example qualifications */}
              <MenuItem value="MBBS">MBBS</MenuItem>
              <MenuItem value="MD">MD</MenuItem>
              <MenuItem value="MS">MS</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
              {/* Add more qualifications as needed */}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="outlined" color="secondary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Display list of tasks to be added */}
      {tasks.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tasks to be Added
          </Typography>
          {tasks.map((task, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography><strong>Department:</strong> {task.department}</Typography>
              <Typography><strong>Date:</strong> {task.date}</Typography>
              <Typography><strong>Shift:</strong> {task.shift}</Typography>
              <Typography><strong>Qualification:</strong> {task.qualification}</Typography>
            </Box>
          ))}
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Tasks
            </Button>
          </Box>
        </Box>
      )}

      {/* Success and Error Messages */}
      {successMessage && (
        <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
}

export default AddTaskForm;
