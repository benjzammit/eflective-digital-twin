import React from 'react';
import { Box } from '@mui/material';
import FeedbackTabs from '../components/FeedbackTabs';
import WelcomeResearchLab from '../components/WelcomeResearchLab';
import MobileNotice from '../components/MobileNotice';
import isMobile from '../utils/deviceDetection';

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

  if (isMobile()) {
    return <MobileNotice />;
  }

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