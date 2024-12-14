import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Box,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  LinearProgress,
  CardHeader
} from '@mui/material';
import {
  TrendingUp,
  Launch,
  AttachMoney,
  Person as PersonIcon,
  Psychology
} from '@mui/icons-material';
import SentimentIndicator from './SentimentIndicator';
import FeedbackPoints from './FeedbackPoints';
import MetricScale from './MetricScale';

const PersonaResultCard = ({ persona = {}, feedback = {}, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Avatar
              src={persona.image}
              sx={{ 
                width: 64, 
                height: 64,
                border: 2,
                borderColor: 'primary.main'
              }}
            >
              <PersonIcon />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                {persona.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Digital twin is analyzing your concept...
              </Typography>
            </Box>
            <CircularProgress size={24} />
          </Stack>
          
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 3
          }}>
            <Stack spacing={2} alignItems="center">
              <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="body1" color="text.secondary" align="center">
                Analyzing from {persona.name}'s perspective...
              </Typography>
              <LinearProgress sx={{ width: '50%' }} />
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Extract data from the detailed response structure
  const {
    detailed = {}
  } = feedback;

  // Get metrics from the correct location in the response
  const {
    personaName = 'Unknown',
    age = '',
    location = '',
    occupation = '',
    confidence = 0,
    interestLevel = 0,
    adoptionLikelihood = 0,
    priceSensitivity = 0,
    socialImpact = 0,
    sentimentScore = 50,
    concept = {},
    summary: topLevelSummary,
    keyPoints: topLevelKeyPoints = [],
    recommendations: topLevelRecommendations = []
  } = detailed;

  // Get values from concept object if they exist
  const {
    summary = topLevelSummary || 'No feedback available',
    keyPoints = topLevelKeyPoints || [],
    recommendations = topLevelRecommendations || [],
    interestLevel: conceptInterestLevel,
    adoptionLikelihood: conceptAdoptionLikelihood,
    priceSensitivity: conceptPriceSensitivity,
    socialImpact: conceptSocialImpact
  } = concept || {};

  // Use concept values if available, otherwise use top-level values
  const finalMetrics = {
    interestLevel: conceptInterestLevel || interestLevel || 0,
    adoptionLikelihood: conceptAdoptionLikelihood || adoptionLikelihood || 0,
    priceSensitivity: conceptPriceSensitivity || priceSensitivity || 0,
    socialImpact: conceptSocialImpact || socialImpact || 0,
    sentimentScore
  };

  // Convert keyPoints and recommendations to pros/cons
  const pros = keyPoints || [];
  const cons = recommendations || [];

  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        '& .MuiCardHeader-title': {
          fontSize: '0.9rem',
          fontWeight: 500
        },
        '& .MuiCardHeader-subheader': {
          fontSize: '0.75rem'
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            {persona.name?.[0] || '?'}
          </Avatar>
        }
        title={persona.name}
        subheader={`${persona.age} • ${persona.location} • ${persona.occupation}`}
        sx={{ py: 1.5, px: 2 }}
      />
      
      <CardContent sx={{ pt: 0, pb: 1, px: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            fontSize: '0.85rem',
            lineHeight: 1.5
          }}
        >
          {summary}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <MetricScale
            label="Interest Level"
            value={finalMetrics.interestLevel}
            lowLabel="Not Interested"
            highLabel="Very Interested"
            reverseColors={false}
            compact={true}
          />
          <MetricScale
            label="Adoption Likelihood"
            value={finalMetrics.adoptionLikelihood}
            lowLabel="Unlikely"
            highLabel="Highly Likely"
            reverseColors={false}
            compact={true}
          />
          <MetricScale
            label="Cost Sensitivity"
            value={finalMetrics.priceSensitivity}
            lowLabel="Low Concern"
            highLabel="High Concern"
            reverseColors={true}
            compact={true}
          />
          <MetricScale
            label="Social Impact"
            value={finalMetrics.socialImpact}
            lowLabel="Low Impact"
            highLabel="High Impact"
            reverseColors={false}
            compact={true}
          />
        </Box>

        <FeedbackPoints 
          pros={pros}
          cons={cons}
          compact={true}
        />
      </CardContent>
    </Card>
  );
};

const MetricBox = ({ label, value, icon }) => (
  <Grid item xs={6} md={4}>
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider'
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        {icon}
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
      <Typography variant="h6" color="primary">
        {value}
      </Typography>
    </Box>
  </Grid>
);

export default PersonaResultCard; 