import React, { useState } from 'react';
import { Box } from '@mui/material';
import FeedbackTabs from '../components/FeedbackTabs';

const ResearchLabPage = ({ onGenerate, isLoading, feedbackData }) => {
  const [feedbackContent, setFeedbackContent] = useState('');
  const [selectedPersonas, setSelectedPersonas] = useState([]);

  return (
    <Box sx={{ p: 3 }}>
      <FeedbackTabs 
        feedbackData={feedbackData}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ResearchLabPage; 