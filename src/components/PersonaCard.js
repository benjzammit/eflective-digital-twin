import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocationOn,
  Work,
  School,
  Language,
  InterestsTwoTone
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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={persona.image}
          alt={persona.name}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h6" gutterBottom>
            {persona.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {persona.title}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{persona.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Work fontSize="small" color="action" />
            <Typography variant="body2">{persona.occupation}</Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {persona.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <ExpandButton
            expanded={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </Box>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Background
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School fontSize="small" color="action" />
                  <Typography variant="body2">{persona.education}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Language fontSize="small" color="action" />
                  <Typography variant="body2">
                    Languages: {persona.communication_style.languages.join(', ')}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Interests & Hobbies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {persona.preferences_and_interests.hobbies.map((hobby) => (
                  <Chip
                    key={hobby}
                    label={hobby}
                    size="small"
                    icon={<InterestsTwoTone />}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Personality Traits
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(persona.personality_traits).map(([trait, level]) => (
                  <Chip
                    key={trait}
                    label={`${trait}: ${level}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PersonaCard; 