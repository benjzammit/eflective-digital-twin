import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const FeedbackPoints = ({ pros = [], cons = [] }) => {
  return (
    <Box>
      <Stack spacing={2}>
        {/* Pros Section */}
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'success.main',
              mb: 1
            }}
          >
            <ThumbUp /> Pros
          </Typography>
          <Stack spacing={1}>
            {pros.map((point, index) => (
              <Typography 
                key={index} 
                variant="body2"
                sx={{ 
                  pl: 3,
                  position: 'relative',
                  '&::before': {
                    content: '"•"',
                    position: 'absolute',
                    left: 8,
                    color: 'success.main'
                  }
                }}
              >
                {point}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Cons Section */}
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'error.main',
              mb: 1
            }}
          >
            <ThumbDown /> Cons
          </Typography>
          <Stack spacing={1}>
            {cons.map((point, index) => (
              <Typography 
                key={index} 
                variant="body2"
                sx={{ 
                  pl: 3,
                  position: 'relative',
                  '&::before': {
                    content: '"•"',
                    position: 'absolute',
                    left: 8,
                    color: 'error.main'
                  }
                }}
              >
                {point}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default FeedbackPoints; 