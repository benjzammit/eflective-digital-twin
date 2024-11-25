import React from 'react';
import { Card, CardContent, Box, Typography, CircularProgress } from '@mui/material';

const LoadingState = () => (
  <Card>
    <CardContent>
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2 
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6">
          Analyzing feedback from all personas...
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default LoadingState; 