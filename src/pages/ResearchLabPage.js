import React from 'react';
import { Box } from '@mui/material';
import FeedbackTabs from '../components/FeedbackTabs';

const ResearchLabPage = ({ onGenerate, isLoading, feedbackData }) => {
  return (
    <Box sx={{ 
      width: '100%',
      '& .MuiTabs-root': {
        minHeight: 48,
      }
    }}>
      <FeedbackTabs 
        feedbackData={feedbackData || { individualFeedback: {}, overallAnalysis: '' }}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ResearchLabPage; 