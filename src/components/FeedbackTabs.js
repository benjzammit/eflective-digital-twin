// src/components/FeedbackTabs.js
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import FeedbackCard from './FeedbackCard';
import OverallAnalysis from './OverallAnalysis';

const FeedbackTabs = ({ feedbackData, isLoading }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 500
            }
          }}
        >
          <Tab label="Individual Feedback" />
          <Tab label="Overall Analysis" />
        </Tabs>
      </Box>
      
      {/* Individual Feedback Tab */}
      {value === 0 && (
        <Box sx={{ mt: 3 }}>
          {feedbackData.responses.map((response, index) => (
            <FeedbackCard 
              key={index}
              feedback={response.detailed} 
              isLoading={isLoading} 
            />
          ))}
        </Box>
      )}
      
      {/* Overall Analysis Tab */}
      {value === 1 && (
        <Box sx={{ mt: 3 }}>
          <OverallAnalysis 
            data={{
              ...feedbackData.overallAnalysis,
              responses: feedbackData.responses
            }} 
            isLoading={isLoading} 
          />
        </Box>
      )}
    </Box>
  );
};

export default FeedbackTabs;
