// src/components/Filters/FilterBar.js
import React, { useContext, useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

function FilterBar({ onFilter }) {
  const { hospitals } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    date: '',
    hospital: '',
    shift: '',
    department: '',
    qualification: '',
  });

  const handleChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      date: '',
      hospital: '',
      shift: '',
      department: '',
      qualification: '',
    });
    onFilter({});
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField 
            label="Date" 
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Hospital</InputLabel>
            <Select
              name="hospital"
              value={filters.hospital}
              label="Hospital"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {hospitals.map(hospital => (
                <MenuItem key={hospital.hospital_id} value={hospital.hospital_id}>
                  {hospital.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Shift</InputLabel>
            <Select
              name="shift"
              value={filters.shift}
              label="Shift"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Morning">Morning (6 AM - 2 PM)</MenuItem>
              <MenuItem value="Afternoon">Afternoon (2 PM - 8 PM)</MenuItem>
              <MenuItem value="Night">Night (9 PM - 6 AM)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={filters.department}
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Ward">Ward</MenuItem>
              <MenuItem value="ICU">ICU</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Qualification</InputLabel>
            <Select
              name="qualification"
              value={filters.qualification}
              label="Qualification"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="MBBS">MBBS</MenuItem>
              <MenuItem value="AYUSH">AYUSH</MenuItem>
              <MenuItem value="BDS">BDS</MenuItem>
              <MenuItem value="Nursing">Nursing</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2} display="flex" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleApplyFilters} fullWidth sx={{ mr: 1 }}>
            Apply
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClearFilters} fullWidth>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterBar;
