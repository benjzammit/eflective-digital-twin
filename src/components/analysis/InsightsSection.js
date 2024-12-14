import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack,
  Chip 
} from '@mui/material';
import { Lightbulb } from '@mui/icons-material';

const InsightsSection = ({ insights = [] }) => {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Key Insights
      </Typography>
      
      <Stack spacing={2}>
        {insights.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Lightbulb color="primary" />
              <Box flex={1}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Chip 
                    label={item.persona}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip 
                    label={`Impact: ${item.impact}`}
                    size="small"
                    color={item.impact === 'high' ? 'error' : 'warning'}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body1">
                  {item.insight}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default InsightsSection; 