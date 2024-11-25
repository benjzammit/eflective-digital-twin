import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Box,
  Typography,
  Chip,
  Grid
} from '@mui/material';
import {
  TrendingUp,
  Launch,
  AttachMoney,
  Person as PersonIcon
} from '@mui/icons-material';
import SentimentIndicator from './SentimentIndicator';
import FeedbackPoints from './FeedbackPoints';

const PersonaResultCard = ({ persona = {}, feedback = {} }) => {
  // Destructure with default values
  const {
    name = 'Unknown',
    image = '',
    occupation = 'Not specified',
    age = '',
    trait = ''
  } = persona;

  const {
    confidence = 0,
    sentiment = 'neutral',
    summary = 'No feedback available',
    interestLevel = 0,
    adoptionLikelihood = 0,
    priceSensitivity = 0,
    pros = [],
    cons = []
  } = feedback;

  return (
    <Card 
      elevation={0}
      sx={{ 
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        mb: 3,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar
            src={image}
            sx={{ 
              width: 64, 
              height: 64,
              border: 2,
              borderColor: 'primary.main'
            }}
          >
            {/* Fallback to icon if no image */}
            <PersonIcon />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Stack direction="row" spacing={1}>
              {occupation && (
                <Chip 
                  size="small"
                  label={occupation}
                  color="primary"
                  variant="outlined"
                />
              )}
              {age && (
                <Chip 
                  size="small"
                  label={`${age} years`}
                  variant="outlined"
                />
              )}
              {trait && (
                <Chip 
                  size="small"
                  label={trait}
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
          <SentimentIndicator 
            score={confidence}
            sentiment={sentiment}
          />
        </Stack>

        <Typography 
          variant="body1" 
          sx={{ 
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            fontStyle: 'italic',
            mb: 3
          }}
        >
          "{summary}"
        </Typography>

        <Grid container spacing={2} mb={3}>
          <MetricBox
            label="Interest Level"
            value={interestLevel}
            icon={<TrendingUp />}
          />
          <MetricBox
            label="Adoption"
            value={adoptionLikelihood}
            icon={<Launch />}
          />
          <MetricBox
            label="Price Sensitivity"
            value={priceSensitivity}
            icon={<AttachMoney />}
          />
        </Grid>

        <FeedbackPoints 
          pros={pros}
          cons={cons}
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