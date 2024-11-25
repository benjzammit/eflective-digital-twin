import React from 'react';
import { Box, Typography } from '@mui/material';

const MetricScale = ({ label, value, lowLabel, highLabel, reverseColors }) => {
  const getColor = (value) => {
    const normalizedValue = typeof value === 'string' 
      ? convertToScale(value) 
      : value;
    
    if (reverseColors) {
      return normalizedValue <= 33 ? 'success.main' :
             normalizedValue <= 66 ? 'warning.main' : 'error.main';
    }
    return normalizedValue <= 33 ? 'error.main' :
           normalizedValue <= 66 ? 'warning.main' : 'success.main';
  };

  const convertToScale = (value) => {
    const scales = {
      'low': 25,
      'medium': 50,
      'high': 75,
      'very low': 10,
      'very high': 90
    };
    return scales[value.toLowerCase()] || 50;
  };

  const normalizedValue = typeof value === 'string' ? convertToScale(value) : value;
  const color = getColor(normalizedValue);

  return (
    <Box sx={{ textAlign: 'left', mb: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 1,
          fontWeight: 500,
          color: 'text.primary'
        }}
      >
        {label}
      </Typography>
      <Box 
        sx={{ 
          position: 'relative',
          height: 8,
          bgcolor: 'grey.200',
          borderRadius: 4,
          mb: 1
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${normalizedValue}%`,
            bgcolor: color,
            borderRadius: 4,
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {lowLabel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {highLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default MetricScale; 