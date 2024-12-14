// src/components/FeedbackTabs.js
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import FeedbackCard from './FeedbackCard';
import OverallAnalysis from './OverallAnalysis';
import PersonaResultCard from './PersonaResultCard';
import personasData from '../data/personas.json';

const FeedbackTabs = ({ 
  feedbackData, 
  loadingPersonas = {}, 
  isOverallAnalysisLoading = false 
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Show loading cards for personas that are currently being processed
  const loadingPersonaIds = Object.entries(loadingPersonas)
    .filter(([_, isLoading]) => isLoading)
    .map(([id]) => id);

  // Filter out null responses and ensure detailed property exists
  const validResponses = feedbackData.responses
    .filter(Boolean)
    .filter(response => response.detailed);

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
          {/* Show loading cards for personas being processed */}
          {loadingPersonaIds.map((id) => (
            <PersonaResultCard 
              key={id}
              persona={personasData.find(p => p.id === id)}
              isLoading={true}
            />
          ))}
          {/* Show completed feedback cards */}
          {validResponses.map((response, index) => (
            <FeedbackCard 
              key={index}
              feedback={response.detailed} 
              isLoading={response.detailed.persona && loadingPersonas[response.detailed.persona.id]} 
            />
          ))}
        </Box>
      )}
      
      {/* Overall Analysis Tab */}
      {value === 1 && (
        <Box sx={{ mt: 3 }}>
          <OverallAnalysis 
            data={feedbackData.overallAnalysis || {}}
            isLoading={isOverallAnalysisLoading}
          />
        </Box>
      )}
    </Box>
  );
};

export default FeedbackTabs;
