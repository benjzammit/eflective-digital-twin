import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Container,
  Collapse,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Psychology,
  Interests,
  Language,
  DevicesOther,
  ShoppingCart,
  Person
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import personasData from '../data/personas.json';

// Import images
import matthewBorg from '../assets/images/matthew-borg.png';
import annaGrech from '../assets/images/anna-grech.png';
import danielAttard from '../assets/images/daniel-attard.png';
import mariaFalzon from '../assets/images/maria-falzon.png';
import laraVella from '../assets/images/lara-vella.png';

// Create image mapping
const personaImages = {
  'persona_software_engineer_malta': matthewBorg,
  'persona_small_business_owner_malta': annaGrech,
  'persona_university_student_malta': danielAttard,
  'persona_retired_teacher_malta': mariaFalzon,
  'persona_freelance_graphic_designer_malta': laraVella,
};

const PersonaCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const PersonaDetails = ({ persona }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ my: 2 }} />
      
      <List dense>
        {/* Personality Traits */}
        <ListItem>
          <ListItemIcon>
            <Psychology color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Personality Traits"
            secondary={
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {Object.entries(persona.personality_traits).map(([trait, level]) => (
                  <Chip
                    key={trait}
                    label={`${trait}: ${level}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            }
          />
        </ListItem>

        {/* Interests */}
        <ListItem>
          <ListItemIcon>
            <Interests color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Interests & Hobbies"
            secondary={
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {persona.preferences_and_interests.hobbies.map((hobby) => (
                  <Chip
                    key={hobby}
                    label={hobby}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            }
          />
        </ListItem>

        {/* Communication */}
        <ListItem>
          <ListItemIcon>
            <Language color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Communication"
            secondary={`Languages: ${persona.communication_style.languages.join(', ')}`}
          />
        </ListItem>

        {/* Technology Usage */}
        <ListItem>
          <ListItemIcon>
            <DevicesOther color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Technology Usage"
            secondary={`Devices: ${persona.technology_usage.devices_owned.join(', ')}`}
          />
        </ListItem>

        {/* Consumer Behavior */}
        <ListItem>
          <ListItemIcon>
            <ShoppingCart color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Shopping Preferences"
            secondary={persona.consumer_behavior.shopping_preferences.join(', ')}
          />
        </ListItem>

        {/* Demographics */}
        <ListItem>
          <ListItemIcon>
            <Person color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Demographics"
            secondary={`${persona.education} | ${persona.marital_status} | ${persona.income}`}
          />
        </ListItem>
      </List>
    </Box>
  );
};

const PersonasPage = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const handleExpandClick = (id) => {
    // Get the row number of the clicked card
    const clickedIndex = personasData.findIndex(p => p.id === id);
    const rowStart = Math.floor(clickedIndex / 3) * 3;
    const rowEnd = rowStart + 3;
    
    // Toggle all cards in the same row
    const newExpandedCards = { ...expandedCards };
    personasData.slice(rowStart, rowEnd).forEach(persona => {
      newExpandedCards[persona.id] = !expandedCards[id];
    });
    
    setExpandedCards(newExpandedCards);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Digital Twins Library
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Meet our carefully crafted personas, designed to provide diverse perspectives in user research.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {personasData.map((persona) => (
          <Grid item xs={12} md={6} lg={4} key={persona.id}>
            <PersonaCard>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Basic Info */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={personaImages[persona.id]}
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        mr: 2,
                        border: '2px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      {persona.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {persona.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {persona.title}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {persona.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      size="small" 
                      label={persona.occupation}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip 
                      size="small" 
                      label={`${persona.age} years`}
                      variant="outlined"
                    />
                    <Chip 
                      size="small" 
                      label={persona.location}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                {/* Expand Button */}
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    fullWidth
                    onClick={() => handleExpandClick(persona.id)}
                    endIcon={<ExpandMoreIcon 
                      sx={{ 
                        transform: expandedCards[persona.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                      }} 
                    />}
                  >
                    {expandedCards[persona.id] ? 'Show Less' : 'View Details'}
                  </Button>
                </Box>

                {/* Expanded Content */}
                <Collapse in={expandedCards[persona.id]} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 2 }} />
                  <PersonaDetails persona={persona} />
                </Collapse>
              </CardContent>
            </PersonaCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonasPage; 