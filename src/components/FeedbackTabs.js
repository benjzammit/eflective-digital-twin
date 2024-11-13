// src/components/FeedbackTabs.js
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Avatar,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Rating
} from '@mui/material';
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
  Assessment,
  Timeline,
  CheckCircle,
  Cancel,
  TrendingUp,
  TrendingDown,
  Info
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import personasData from '../data/personas.json';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const DetailedFeedbackCard = ({ feedback, persona }) => (
  <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        {persona?.image ? (
          <Avatar
            src={persona.image}
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              border: '2px solid',
              borderColor: 'primary.main'
            }}
            alt={persona.name}
          />
        ) : (
          <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{persona?.name[0]}</Avatar>
        )}
        <Box>
          <Typography variant="h6">{persona?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {persona?.title} • {persona?.age} years
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {persona?.location}
          </Typography>
          <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={persona?.technology_usage.adoption_of_technology}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip 
              label={`${persona?.consumer_behavior.online_shopping_frequency} Shopper`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Chip 
          icon={<Assessment />}
          label={`${feedback.confidence}% Confidence`}
          color="primary"
          size="small"
        />
        <Chip 
          icon={getSentimentIcon(feedback.sentiment)}
          label={feedback.sentiment}
          color={getSentimentColor(feedback.sentiment)}
          size="small"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Key Points
        </Typography>
        <List dense>
          {feedback.keyPoints?.map((point, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Detailed Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {feedback.analysis}
        </Typography>
      </Box>

      {feedback.recommendations && (
        <Box>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Recommendations
          </Typography>
          <List dense>
            {feedback.recommendations.map((rec, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Info color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={rec} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </CardContent>
  </StyledCard>
);

const QuickSummaryCard = ({ feedback, persona }) => (
  <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        {persona?.image ? (
          <Avatar
            src={persona.image}
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              border: '2px solid',
              borderColor: 'primary.main'
            }}
            alt={persona.name}
          />
        ) : (
          <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{persona?.name[0]}</Avatar>
        )}
        <Box>
          <Typography variant="h6">{persona?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {persona?.title} • {persona?.age} years
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {persona?.location}
          </Typography>
          <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`${persona?.personality_traits.openness} Openness`}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip 
              label={`${persona?.consumer_behavior.use_of_reviews} Reviews User`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Chip 
          icon={getSentimentIcon(feedback.sentiment)}
          label={feedback.sentiment}
          color={getSentimentColor(feedback.sentiment)}
          size="small"
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          {feedback.summary}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="success.main" gutterBottom>
              Pros
            </Typography>
            <List dense>
              {feedback.pros?.map((pro, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <TrendingUp color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={pro} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="error.main" gutterBottom>
              Cons
            </Typography>
            <List dense>
              {feedback.cons?.map((con, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <TrendingDown color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={con} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </CardContent>
  </StyledCard>
);

// Helper functions
const getSentimentIcon = (sentiment) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return <SentimentSatisfiedAlt />;
    case 'negative':
      return <SentimentVeryDissatisfied />;
    default:
      return <SentimentNeutral />;
  }
};

const getSentimentColor = (sentiment) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return 'success';
    case 'negative':
      return 'error';
    default:
      return 'warning';
  }
};

const OverallAnalysisContent = ({ analysis }) => {
  const {
    overallSentiment = 'neutral',
    consensusPoints = [],
    keyInsights = '',
    marketPotential = '',
    recommendedActions = []
  } = analysis || {};

  return (
    <Box sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overall Sentiment
            </Typography>
            <Chip 
              icon={getSentimentIcon(overallSentiment)}
              label={overallSentiment}
              color={getSentimentColor(overallSentiment)}
            />
          </Box>

          {consensusPoints.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Consensus Points
              </Typography>
              <List>
                {consensusPoints.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {keyInsights && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Key Insights
              </Typography>
              <Typography variant="body1" paragraph>
                {keyInsights}
              </Typography>
            </Box>
          )}

          {marketPotential && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Market Potential
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body1">
                  {marketPotential}
                </Typography>
              </Paper>
            </Box>
          )}

          {recommendedActions.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Recommended Actions
              </Typography>
              <List>
                {recommendedActions.map((action, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Timeline color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={action} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

// Main component
const FeedbackTabs = ({ feedbackData, isLoading }) => {
  const [tabValue, setTabValue] = useState(0);
  
  const { individualFeedback = {}, overallAnalysis = null } = feedbackData || {};

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  const hasData = Object.keys(individualFeedback).length > 0 || overallAnalysis;

  if (!hasData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        p: 3 
      }}>
        <Typography color="text.secondary">
          No feedback generated yet. Use the sidebar to generate feedback.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab 
          label="Individual Feedback" 
          icon={<SentimentSatisfiedAlt />} 
          iconPosition="start"
        />
        <Tab 
          label="Overall Analysis" 
          icon={<Assessment />} 
          iconPosition="start"
        />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Object.entries(individualFeedback).map(([personaId, feedback]) => (
            <Grid item xs={12} md={6} key={personaId}>
              {feedback.responseType === 'detailed' ? (
                <DetailedFeedbackCard 
                  feedback={feedback}
                  persona={personasData.find(p => p.id === personaId)}
                />
              ) : (
                <QuickSummaryCard 
                  feedback={feedback}
                  persona={personasData.find(p => p.id === personaId)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && overallAnalysis && (
        <OverallAnalysisContent analysis={overallAnalysis} />
      )}
    </Box>
  );
};

export default FeedbackTabs;
