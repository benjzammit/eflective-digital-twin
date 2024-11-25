import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Circle } from '@mui/icons-material';
import MetricScale from './MetricScale';
import { Favorite, CheckCircle, AttachMoney, Groups } from '@mui/icons-material';

const QuickSummaryCard = ({ feedback, isLoading }) => {
  const quickFeedback = feedback || {};
  const persona = quickFeedback.persona || {};
  const sentimentScore = quickFeedback.confidence || 0;

  return (
    <Card elevation={0} sx={{ mb: 2, borderRadius: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
                <Typography variant="h5">
                  {quickFeedback.personaName}
                </Typography>
                {persona?.personality_traits && 
                  Object.entries(persona.personality_traits).map(([trait, level]) => (
                    <Chip 
                      key={trait}
                      label={`${trait}: ${level}`}
                      variant="outlined" 
                      size="small" 
                      sx={{ 
                        borderColor: trait.toLowerCase() === 'openness' ? 'primary.main' :
                                   trait.toLowerCase() === 'conscientiousness' ? 'success.main' :
                                   trait.toLowerCase() === 'extraversion' ? 'warning.main' :
                                   trait.toLowerCase() === 'agreeableness' ? 'info.main' :
                                   'secondary.main',
                        borderRadius: 2 
                      }} 
                    />
                  ))
                }
              </Box>
              <Typography variant="body2" color="text.secondary">
                {quickFeedback.age} • {quickFeedback.location} • {quickFeedback.occupation} • {persona?.consumer_behavior?.yearly_income}
              </Typography>
            </Box>
            <Chip 
              label={`${sentimentScore}% ${quickFeedback.sentiment}`}
              color={quickFeedback.sentiment === 'positive' ? 'success' : 
                     quickFeedback.sentiment === 'negative' ? 'error' : 'warning'}
              sx={{ borderRadius: 4 }}
            />
          </Box>
        </Box>

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
          "{quickFeedback.summary}"
        </Typography>

        <Grid container spacing={4} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Pros
              </Typography>
              <List>
                {quickFeedback.pros?.map((point, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Circle sx={{ width: 8, height: 8 }} />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Cons
              </Typography>
              <List>
                {quickFeedback.cons?.map((point, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Circle sx={{ width: 8, height: 8 }} />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={6} sm={3}>
            <MetricScale
              label="Interest"
              value={quickFeedback.interestLevel}
              icon={<Favorite />}
              lowLabel="Not Interested"
              highLabel="Very Interested"
              reverseColors={false}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickSummaryCard;
