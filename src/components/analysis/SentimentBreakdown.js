import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

export const SentimentBreakdown = ({ sentimentBreakdown = {} }) => (
  <Box sx={{ width: '100%' }}>
    {Object.entries(sentimentBreakdown).map(([sentiment, value]) => (
      <Box key={sentiment} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">{sentiment}</Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(value)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={value}
          color={sentiment === 'Positive' ? 'success' : 
                 sentiment === 'Negative' ? 'error' : 'warning'}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: 'background.default'
          }}
        />
      </Box>
    ))}
  </Box>
);