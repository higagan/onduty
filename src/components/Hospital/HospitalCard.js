// src/components/Hospital/HospitalCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HospitalCard({ hospital }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={hospital.image}
        alt={hospital.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hospital.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hospital.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {hospital.about.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/tasks/${hospital.hospital_id}`}>
          View Tasks
        </Button>
      </CardActions>
    </Card>
  );
}

export default HospitalCard;
