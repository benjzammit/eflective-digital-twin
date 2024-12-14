import React from 'react';
import { Box } from '@mui/material';
import FeedbackTabs from '../components/FeedbackTabs';
import WelcomeResearchLab from '../components/WelcomeResearchLab';

const ResearchLabPage = ({ 
  onGenerate, 
  feedbackData, 
  loadingPersonas, 
  isOverallAnalysisLoading 
}) => {
  const showWelcome = !feedbackData.responses.length && 
                     !feedbackData.overallAnalysis && 
                     Object.keys(loadingPersonas).length === 0 &&
                     !isOverallAnalysisLoading;

  return (
    <Box sx={{ p: 3 }}>
      {showWelcome ? (
        <WelcomeResearchLab />
      ) : (
        <FeedbackTabs 
          feedbackData={feedbackData}
          loadingPersonas={loadingPersonas}
          isOverallAnalysisLoading={isOverallAnalysisLoading}
        />
      )}
    </Box>
  );
};

export default ResearchLabPage; 