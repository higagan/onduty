// src/components/Hospital/HospitalList.js
import React from 'react';
import { Grid, Typography } from '@mui/material';
import HospitalCard from './HospitalCard';
import hospitals from '../../data/hospitals';

function HospitalList() {
  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        Available Hospitals & Clinics
      </Typography>
      <Grid container spacing={4}>
        {hospitals.map((hospital) => (
          <Grid item key={hospital.hospital_id} xs={12} sm={6} md={4}>
            <HospitalCard hospital={hospital} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HospitalList;
