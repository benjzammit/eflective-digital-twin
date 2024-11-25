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

const FeedbackCard = ({ feedback, isLoading }) => {
  const sentimentScore = feedback.sentimentScore || 0;
  const confidenceScore = feedback.confidence || 0;
  const persona = feedback.persona || {};

  // Extract the specific traits we want to display
  const traits = [
    // Openness from personality traits
    { label: `Openness: ${persona?.personality_traits?.openness}`, type: 'openness' },
    // First hobby
    { label: `Interest: ${persona?.preferences_and_interests?.hobbies?.[0]}`, type: 'hobby' },
    // Shopping preference
    { label: `Shops: ${persona?.consumer_behavior?.shopping_preferences?.[0]}`, type: 'shopping' },
    // Most important purchase factor (highest value)
    { label: `Values: ${Object.entries(persona?.consumer_behavior?.purchase_factors || {})
        .sort(([,a], [,b]) => b - a)[0]?.[0]}`, type: 'purchase' }
  ].filter(trait => trait.label.indexOf('undefined') === -1);

  return (
    <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
                <Typography variant="h5">
                  {feedback.personaName}
                </Typography>
                {traits.map((trait, index) => (
                  <Chip 
                    key={index}
                    label={trait.label}
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      borderColor: trait.type === 'openness' ? 'primary.main' :
                                 trait.type === 'hobby' ? 'success.main' :
                                 trait.type === 'shopping' ? 'warning.main' :
                                 'info.main',
                      borderRadius: 2 
                    }} 
                  />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {feedback.age} • {feedback.location} • {feedback.occupation} • {persona?.consumer_behavior?.yearly_income || persona?.income}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`${sentimentScore}% ${feedback.sentiment}`}
                color={feedback.sentiment === 'positive' ? 'success' : 
                       feedback.sentiment === 'negative' ? 'error' : 'warning'}
                sx={{ borderRadius: 4 }}
              />
              <Chip
                label={`AI Confidence: ${confidenceScore}%`}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 4 }}
              />
            </Box>
          </Box>
        </Box>

        {/* Quote */}
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 4,
            fontStyle: 'italic',
            color: 'text.secondary',
            borderLeft: '3px solid',
            borderColor: 'primary.main',
            pl: 2,
            py: 1
          }}
        >
          "{feedback.summary}"
        </Typography>

        {/* Digital Twin Feedback */}
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Digital Twin Feedback
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          {feedback.analysis}
        </Typography>

        {/* Key Points and Recommendations */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Key Concerns & Observations
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {feedback.keyPoints?.map((point, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <RadioButtonUnchecked 
                    sx={{ 
                      color: 'primary.main',
                      fontSize: 20,
                      mt: 0.5,
                      mr: 1
                    }} 
                  />
                  <Typography variant="body1">{point}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Suggested Improvements
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {feedback.recommendations?.map((rec, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <RadioButtonUnchecked 
                    sx={{ 
                      color: 'primary.main',
                      fontSize: 20,
                      mt: 0.5,
                      mr: 1
                    }} 
                  />
                  <Typography variant="body1">{rec}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Updated Metrics Section */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Interest Level"
              value={feedback.interestLevel}
              lowLabel="Not Interested"
              highLabel="Very Interested"
              reverseColors={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Adoption Likelihood"
              value={feedback.adoptionLikelihood}
              lowLabel="Unlikely"
              highLabel="Highly Likely"
              reverseColors={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Cost Sensitivity"
              value={feedback.priceSensitivity}
              lowLabel="Low Concern"
              highLabel="High Concern"
              reverseColors={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MetricScale
              label="Social Impact"
              value={feedback.socialImpact}
              lowLabel="Low Impact"
              highLabel="High Impact"
              reverseColors={false}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { MetricScale };  // Export the MetricScale component
export default FeedbackCard;  // Keep the default export 