import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Psychology from '@mui/icons-material/Psychology';

const LoadingState = ({ message = "Analyzing feedback..." }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      p: 4,
      minHeight: '200px'
    }}
  >
    <Psychology sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
    <CircularProgress size={40} sx={{ mb: 2 }} />
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export default LoadingState; 