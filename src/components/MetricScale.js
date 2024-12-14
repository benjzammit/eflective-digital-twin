import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const MetricScale = ({ label, value, lowLabel, highLabel, reverseColors = false, compact = false }) => {
  return (
    <Box sx={{ mb: compact ? 1.5 : 2 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 0.5,
          fontSize: compact ? '0.8rem' : '0.85rem',
          fontWeight: 500
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: compact ? '0.7rem' : '0.75rem' }}
        >
          {lowLabel}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            flex: 1,
            height: compact ? 4 : 6,
            borderRadius: compact ? 2 : 3,
            bgcolor: reverseColors ? 'success.light' : 'error.light',
            '& .MuiLinearProgress-bar': {
              bgcolor: reverseColors ? 'error.main' : 'success.main'
            }
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: compact ? '0.7rem' : '0.75rem' }}
        >
          {highLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default MetricScale; 