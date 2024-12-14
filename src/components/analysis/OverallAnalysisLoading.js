import React from 'react';
import { Box, Typography, LinearProgress, Paper, Stack } from '@mui/material';
import { Psychology, Analytics, Timeline, Lightbulb } from '@mui/icons-material';

const OverallAnalysisLoading = () => {
  const steps = [
    {
      icon: <Psychology />,
      title: "Digital Twin Analysis",
      subtitle: "Collecting Persona Feedback",
      description: "Gathering unique perspectives and insights from each digital twin persona"
    },
    {
      icon: <Analytics />,
      title: "Pattern Recognition",
      subtitle: "Identifying Trends",
      description: "Discovering common themes and key differences across all responses"
    },
    {
      icon: <Timeline />,
      title: "Performance Metrics",
      subtitle: "Calculating Impact",
      description: "Evaluating sentiment, adoption potential, and market viability"
    },
    {
      icon: <Lightbulb />,
      title: "Strategic Insights",
      subtitle: "Actionable Recommendations",
      description: "Generating targeted suggestions based on collective feedback"
    }
  ];

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontSize: '1.1rem',
          fontWeight: 500,
          mb: 1
        }}
      >
        Generating Overall Analysis
      </Typography>
      
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Our AI is analyzing feedback from all digital twins to create a comprehensive analysis
      </Typography>

      <Stack spacing={2}>
        {steps.map((step, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ 
                color: 'primary.main', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minWidth: 80 
              }}>
                {step.icon}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 0.5, 
                    textAlign: 'center',
                    fontSize: '0.7rem'
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
              <Box flex={1}>
                <Typography 
                  variant="subtitle2" 
                  gutterBottom
                  sx={{ fontSize: '0.85rem' }}
                >
                  {step.subtitle}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  {step.description}
                </Typography>
              </Box>
              <LinearProgress 
                sx={{ width: 80 }} 
                variant="indeterminate"
              />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default OverallAnalysisLoading; 