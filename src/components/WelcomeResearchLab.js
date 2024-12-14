import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Stack 
} from '@mui/material';
import {
  Psychology,
  GroupWork,
  InsightsOutlined,
  Timeline
} from '@mui/icons-material';

const WelcomeResearchLab = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        '& h4': {
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 3,
            backgroundColor: 'primary.main',
            borderRadius: 1,
          }
        }
      }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Research Lab
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mt: 3, maxWidth: 800, mx: 'auto' }}
        >
          Get valuable consumer insights in under 5 minutes using our digital twins
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {[
          {
            icon: <Psychology fontSize="large" />,
            step: "1",
            title: "Input Your Concept",
            description: "Use the sidebar on the left to describe your product, service, or idea that needs evaluation.",
            time: "1 min"
          },
          {
            icon: <GroupWork fontSize="large" />,
            step: "2",
            title: "Select Digital Twins",
            description: "Choose which digital twin personas you want to analyze your concept.",
            time: "1 min"
          },
          {
            icon: <InsightsOutlined fontSize="large" />,
            step: "3",
            title: "Generate Insights",
            description: "Click 'Generate Analysis' and our AI will process your input through selected twins.",
            time: "2 min"
          },
          {
            icon: <Timeline fontSize="large" />,
            step: "4",
            title: "Review Analysis",
            description: "View individual feedback from each twin and get an overall analysis.",
            time: "1 min"
          }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Stack spacing={2} alignItems="center" textAlign="center">
                {item.icon}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  Step {item.step} • {item.time}
                </Typography>
                <Typography variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WelcomeResearchLab; 