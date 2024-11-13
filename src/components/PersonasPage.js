import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import PersonaCard from './PersonaCard';
import personasData from '../data/personas.json';

const PersonasPage = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Personas Gallery
        </Typography>
        <Grid container spacing={3}>
          {personasData.map((persona) => (
            <Grid item xs={12} sm={6} md={4} key={persona.id}>
              <PersonaCard persona={persona} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PersonasPage; 