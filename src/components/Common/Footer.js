// src/components/Common/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} MedDuty. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
