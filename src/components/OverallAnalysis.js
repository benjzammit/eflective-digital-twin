import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Analytics, TrendingUp, Psychology } from '@mui/icons-material';
import MetricsOverview from './analysis/MetricsOverview';
import InsightsSection from './analysis/InsightsSection';
import AudienceAnalysisCard from './analysis/AudienceAnalysisCard';
import OverallAnalysisLoading from './analysis/OverallAnalysisLoading';

const OverallAnalysis = ({ data = {}, isLoading }) => {
  if (isLoading) {
    return <OverallAnalysisLoading />;
  }

  const { 
    key_metrics: keyMetrics = {},
    key_insights: insights = [],
    recommendations = [],
    audiences: audienceSegments = []
  } = data;

  return (
    <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}
        >
          <Analytics sx={{ fontSize: '1.4rem' }} />
          Overall Analysis
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            p: 2,
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'primary.main',
            bgcolor: 'primary.50',
            borderRadius: 1,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            lineHeight: 1.6
          }}
        >
          {keyMetrics.context || 'No overall analysis available yet.'}
        </Typography>
      </Box>

      <MetricsOverview metrics={keyMetrics} />

      <Box sx={{ mb: 4 }}>
        <InsightsSection insights={insights} />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            color: 'text.primary'
          }}
        >
          <Psychology sx={{ color: 'warning.main' }} />
          Audience Segments
        </Typography>
        {audienceSegments.map((audience, index) => (
          <AudienceAnalysisCard
            key={index}
            audience={audience}
            sx={{ 
              mb: index < audienceSegments.length - 1 ? 2 : 0,
              '& .MuiCard-root': {
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OverallAnalysis; 