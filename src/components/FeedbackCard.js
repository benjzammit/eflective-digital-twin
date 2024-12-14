import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import { Favorite, RadioButtonUnchecked } from '@mui/icons-material';
import { CheckCircle, AttachMoney, Groups } from '@mui/icons-material';
import MetricScale from './MetricScale';
import { LightbulbOutlined, RecommendOutlined } from '@mui/icons-material';

const FeedbackCard = ({ feedback, isLoading }) => {
  console.log('FeedbackCard feedback:', feedback);
  
  const sentimentScore = feedback.sentimentScore || 0;
  const confidenceScore = feedback.confidence || 0;
  const persona = feedback.persona || {};

  const traits = [
    { label: `Openness: ${persona?.personality_traits?.openness}`, type: 'openness' },
    { label: `Interest: ${persona?.preferences_and_interests?.hobbies?.[0]}`, type: 'hobby' },
    { label: `Shops: ${persona?.consumer_behavior?.shopping_preferences?.[0]}`, type: 'shopping' },
    { label: `Values: ${Object.entries(persona?.consumer_behavior?.purchase_factors || {})
        .sort(([,a], [,b]) => b - a)[0]?.[0]}`, type: 'purchase' }
  ].filter(trait => trait.label.indexOf('undefined') === -1);

  return (
    <Card 
      elevation={0} 
      sx={{ 
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Typography 
                  variant="subtitle1"
                  sx={{ 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'primary.main'
                  }}
                >
                  {feedback.personaName}
                </Typography>
                {traits.map((trait, index) => (
                  <Chip 
                    key={index}
                    label={trait.label}
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      height: '24px',
                      '& .MuiChip-label': {
                        fontSize: '0.75rem',
                        px: 1
                      },
                      borderRadius: 1,
                      borderColor: trait.type === 'openness' ? 'primary.main' :
                                 trait.type === 'hobby' ? 'success.main' :
                                 trait.type === 'shopping' ? 'warning.main' :
                                 'info.main',
                      borderWidth: '2px'
                    }} 
                  />
                ))}
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {feedback.age} • {feedback.location} • {feedback.occupation}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              <Chip 
                label={`${sentimentScore}% ${feedback.sentiment}`}
                color={feedback.sentiment === 'positive' ? 'success' : 
                       feedback.sentiment === 'negative' ? 'error' : 'warning'}
                size="small"
                sx={{ 
                  height: '24px',
                  '& .MuiChip-label': {
                    fontSize: '0.75rem',
                    px: 1
                  },
                  borderRadius: 1
                }}
              />
              <Chip
                label={`AI Confidence: ${confidenceScore}%`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ 
                  height: '24px',
                  '& .MuiChip-label': {
                    fontSize: '0.75rem',
                    px: 1
                  },
                  borderRadius: 1
                }}
              />
            </Box>
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
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
          "{feedback.summary}"
        </Typography>

        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 2,
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Digital Twin Feedback
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary'
              }}
            >
              <LightbulbOutlined sx={{ color: 'warning.main', fontSize: '1.2rem' }} />
              Key Points
            </Typography>
            <Box>
              {feedback.keyPoints?.map((point, index) => (
                <Typography 
                  key={index} 
                  variant="body2"
                  sx={{ 
                    fontSize: '0.85rem',
                    pl: 2,
                    mb: 1,
                    position: 'relative',
                    '&:before': {
                      content: '"→"',
                      position: 'absolute',
                      left: 0,
                      color: 'primary.main'
                    }
                  }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary'
              }}
            >
              <RecommendOutlined sx={{ color: 'success.main', fontSize: '1.2rem' }} />
              Recommendations
            </Typography>
            <Box>
              {feedback.recommendations?.map((rec, index) => (
                <Typography 
                  key={index} 
                  variant="body2"
                  sx={{ 
                    fontSize: '0.85rem',
                    pl: 2,
                    mb: 1,
                    position: 'relative',
                    '&:before': {
                      content: '"✓"',
                      position: 'absolute',
                      left: 0,
                      color: 'success.main'
                    }
                  }}
                >
                  {rec}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} md={6}>
            <MetricScale
              label="Interest Level"
              value={feedback.interestLevel}
              lowLabel="Not Interested"
              highLabel="Very Interested"
              reverseColors={false}
              compact={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Adoption Likelihood"
              value={feedback.adoptionLikelihood}
              lowLabel="Unlikely"
              highLabel="Highly Likely"
              reverseColors={false}
              compact={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Cost Sensitivity"
              value={feedback.priceSensitivity}
              lowLabel="Low Concern"
              highLabel="High Concern"
              reverseColors={true}
              compact={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Social Impact"
              value={feedback.socialImpact}
              lowLabel="Low Impact"
              highLabel="High Impact"
              reverseColors={false}
              compact={true}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { MetricScale };  // Export the MetricScale component
export default FeedbackCard;  // Keep the default export 