import React from 'react';
import { Box, Tooltip, CircularProgress } from '@mui/material';
import {
  SentimentVerySatisfied,
  SentimentNeutral,
  SentimentVeryDissatisfied
} from '@mui/icons-material';

const SentimentIndicator = ({ score = 0, sentiment = 'neutral' }) => {
  const getColor = () => {
    if (sentiment === 'positive') return 'success.main';
    if (sentiment === 'negative') return 'error.main';
    return 'warning.main';
  };

  const getIcon = () => {
    if (sentiment === 'positive') return <SentimentVerySatisfied />;
    if (sentiment === 'negative') return <SentimentVeryDissatisfied />;
    return <SentimentNeutral />;
  };

  return (
    <Tooltip title={`Sentiment Score: ${score}%`}>
      <Box sx={{ 
        color: getColor(),
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {getIcon()}
        <CircularProgress 
          variant="determinate" 
          value={score} 
          size={24}
          sx={{ color: 'inherit' }}
        />
      </Box>
    </Tooltip>
  );
};

export default SentimentIndicator; 