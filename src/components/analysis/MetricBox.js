import React from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';

const MetricBox = ({ title, value, score, icon }) => (
  <Grid item xs={12} md={4}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      p: 2,
      borderRadius: 2,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider'
    }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress 
          variant="determinate" 
          value={typeof score === 'number' ? score : 0}
          size={56}
          thickness={4}
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main'
        }}>
          {icon}
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

export default MetricBox; 