import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  SentimentSatisfied,
  TrendingUp,
  AssignmentTurnedIn
} from '@mui/icons-material';

const MetricCard = ({ title, value, context, icon, color }) => {
  const roundedValue = Math.round(value);
  
  return (
    <Grid item xs={12} md={4}>
      <Card 
        elevation={0}
        sx={{ 
          height: '100%', 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: '1.2rem',
                color: `${color}.main`
              } 
            })}
            <Typography 
              variant="subtitle2" 
              sx={{ 
                ml: 1,
                fontSize: '0.9rem',
                fontWeight: 600 
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography 
            variant="h5" 
            sx={{ 
              color: `${color}.main`,
              fontWeight: 600,
              mb: 1
            }}
          >
            {roundedValue}%
          </Typography>
          <Box sx={{ width: '100%', mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={roundedValue}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: `${color}.50`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: `${color}.main`,
                  borderRadius: 3
                }
              }}
            />
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              fontSize: '0.85rem',
              color: 'text.secondary',
              fontStyle: 'italic',
              borderLeft: '3px solid',
              borderColor: `${color}.main`,
              pl: 1.5,
              py: 0.5
            }}
          >
            {/* Customize context based on metric type */}
            {title === 'Overall Sentiment' && 
              `${roundedValue}% of responses were positive, indicating general enthusiasm for the concept`}
            {title === 'Average Interest' && 
              `Strong initial interest at ${roundedValue}%, suggesting potential market demand`}
            {title === 'Adoption Rate' && 
              `Current adoption rate at ${roundedValue}%, with room for improvement through addressing key barriers`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const MetricsOverview = ({ metrics }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <MetricCard
        title="Overall Sentiment"
        value={parseFloat(metrics.overall_sentiment)}
        icon={<SentimentSatisfied />}
        color="primary"
      />
      <MetricCard
        title="Average Interest"
        value={parseFloat(metrics.average_interest)}
        icon={<TrendingUp />}
        color="success"
      />
      <MetricCard
        title="Adoption Rate"
        value={parseFloat(metrics.adoption_rate)}
        icon={<AssignmentTurnedIn />}
        color="info"
      />
    </Grid>
  );
};

export default MetricsOverview; 