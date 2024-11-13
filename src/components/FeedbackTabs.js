// src/components/FeedbackTabs.js
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentNeutral,
  CheckCircle,
  TrendingUp
} from '@mui/icons-material';
import personasData from '../data/personas.json';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`feedback-tabpanel-${index}`}
      aria-labelledby={`feedback-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DetailedFeedbackCard = ({ feedback, persona }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {persona?.name}'s Feedback
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="subtitle1">Sentiment:</Typography>
        {feedback.sentiment && (
          <>
            {renderSentimentIcon(feedback.sentiment)}
            <Typography>{feedback.sentiment}</Typography>
          </>
        )}
      </Box>

      <Typography variant="h6" gutterBottom>
        Key Points
      </Typography>
      <List>
        {feedback.keyPoints?.map((point, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText primary={point} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        Analysis
      </Typography>
      <Typography paragraph>
        {feedback.analysis}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Recommendations
      </Typography>
      <List>
        {feedback.recommendations?.map((rec, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <TrendingUp color="primary" />
            </ListItemIcon>
            <ListItemText primary={rec} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

// Helper function to render sentiment icon
const renderSentimentIcon = (sentiment) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return <SentimentSatisfiedAlt color="success" />;
    case 'negative':
      return <SentimentVeryDissatisfied color="error" />;
    default:
      return <SentimentNeutral color="warning" />;
  }
};

const FeedbackTabs = ({ feedbackData, isLoading }) => {
  const [value, setValue] = useState(0);

  // Extract individual responses and overall analysis
  const responses = Array.isArray(feedbackData.responses) ? feedbackData.responses : [feedbackData.responses];
  const overallAnalysis = feedbackData.overallAnalysis;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Individual Feedback" />
        <Tab label="Overall Analysis" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {isLoading ? (
          <LoadingState />
        ) : responses && responses.length > 0 ? (
          <Grid container spacing={3}>
            {responses.map((feedback, index) => (
              <Grid item xs={12} key={index}>
                <DetailedFeedbackCard 
                  feedback={feedback} 
                  persona={personasData.find(p => p.id === feedback.personaId)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState />
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {isLoading ? (
          <LoadingState />
        ) : overallAnalysis ? (
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overall Sentiment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {renderSentimentIcon(overallAnalysis.overallSentiment)}
                  <Typography>
                    {overallAnalysis.overallSentiment || 'Neutral'}
                  </Typography>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Key Insights
                </Typography>
                <Typography paragraph>
                  {overallAnalysis.keyInsights}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Market Potential
                </Typography>
                <Typography paragraph>
                  {overallAnalysis.marketPotential}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Consensus Points
                </Typography>
                <List>
                  {overallAnalysis.consensusPoints?.map((point, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" gutterBottom>
                  Recommended Actions
                </Typography>
                <List>
                  {overallAnalysis.recommendedActions?.map((action, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <TrendingUp color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={action} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <EmptyState />
        )}
      </TabPanel>
    </Box>
  );
};

// Helper component for empty state
const EmptyState = () => (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <Typography color="text.secondary">
      No feedback generated yet. Try analyzing your concept with some digital twins!
    </Typography>
  </Box>
);

// Helper component for loading state
const LoadingState = () => (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <CircularProgress />
    <Typography color="text.secondary" sx={{ mt: 2 }}>
      Generating feedback...
    </Typography>
  </Box>
);

export default FeedbackTabs;
