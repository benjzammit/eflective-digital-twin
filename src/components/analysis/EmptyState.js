import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EmptyState = () => (
  <Card>
    <CardContent>
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2 
      }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No overall analysis available yet. Generate feedback first to see insights.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default EmptyState; 