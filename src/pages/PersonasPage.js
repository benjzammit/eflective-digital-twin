import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Container,
  Chip,
  Stack,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import personasData from '../data/personas.json';
import PersonaCard from '../components/PersonaCard';

const PersonasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  
  const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  const uniquePersonas = personasData.reduce((acc, current) => {
    if (!acc.find(item => item.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleExpandClick = (personaId) => {
    setExpandedCards(prev => ({
      ...prev,
      [personaId]: !prev[personaId]
    }));
  };

  const handleAgeGroupToggle = (ageGroup) => {
    setSelectedAgeGroups(prev => 
      prev.includes(ageGroup) 
        ? prev.filter(g => g !== ageGroup)
        : [...prev, ageGroup]
    );
  };
  
  const filteredPersonas = uniquePersonas.filter(persona => {
    const matchesSearch = searchTerm === '' || 
      persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.occupation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAge = selectedAgeGroups.length === 0 || selectedAgeGroups.some(range => {
      if (range === '65+') return persona.age >= 65;
      const [min, max] = range.split('-').map(Number);
      return persona.age >= min && persona.age <= max;
    });

    return matchesSearch && matchesAge;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Digital Twins Library
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Meet our carefully crafted personas, designed to provide diverse perspectives in user research.
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search by name or occupation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Filter by Age Group
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {ageGroups.map((age) => (
              <Chip
                key={age}
                label={age}
                onClick={() => handleAgeGroupToggle(age)}
                variant={selectedAgeGroups.includes(age) ? "filled" : "outlined"}
                color="primary"
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {filteredPersonas.map((persona) => (
          <Grid item xs={12} sm={6} md={4} key={`${persona.id}-${persona.name}`}>
            <PersonaCard 
              persona={persona}
              isExpanded={expandedCards[persona.id]}
              onExpandClick={() => handleExpandClick(persona.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonasPage; 