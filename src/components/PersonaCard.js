import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Divider,
  Avatar,
  Stack,
  CardActions,
  Button,
  Grid
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocationOn,
  Work,
  School,
  Language,
  InterestsTwoTone,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { styled } from '@mui/system';

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PersonaCard = ({ persona }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {persona.name[0]}
          </Avatar>
        }
        title={persona.name}
        subheader={
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {persona.age} years • {persona.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {persona.occupation || persona.title}
            </Typography>
          </Stack>
        }
      />
      
      <CardContent>
        <Stack spacing={2}>
          {/* Key Traits */}
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Key Traits
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {persona.traits?.map((trait) => (
                <Chip key={trait} label={trait} size="small" />
              ))}
            </Box>
          </Box>

          {/* Quick Stats */}
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Quick Stats
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Work fontSize="small" color="action" />
                  <Typography variant="body2">
                    {persona.income || persona.consumer_behavior?.yearly_income || 'Income N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School fontSize="small" color="action" />
                  <Typography variant="body2">
                    {persona.education || 'Education N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Language fontSize="small" color="action" />
                  <Typography variant="body2">
                    {persona.communication_style?.languages?.[0] || persona.languages?.[0] || persona.language || 'Language N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InterestsTwoTone fontSize="small" color="action" />
                  <Typography variant="body2">
                    {persona.preferences_and_interests?.hobbies?.[0] || persona.hobbies?.[0] || 'Hobbies N/A'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Description */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {persona.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          sx={{ ml: 'auto' }}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            {/* Background */}
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Background
              </Typography>
              <Typography variant="body2" paragraph>
                {persona.background || persona.description || 'No background information available.'}
              </Typography>
            </Box>

            {/* Additional Info */}
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Additional Information
              </Typography>
              <Stack spacing={1}>
                {persona.marital_status && (
                  <Typography variant="body2">
                    Marital Status: {persona.marital_status}
                  </Typography>
                )}
                {persona.ethnicity && (
                  <Typography variant="body2">
                    Ethnicity: {persona.ethnicity}
                  </Typography>
                )}
                {persona.religion && (
                  <Typography variant="body2">
                    Religion: {persona.religion}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PersonaCard; 