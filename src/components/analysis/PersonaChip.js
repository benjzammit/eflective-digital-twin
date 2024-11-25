import React from 'react';
import { Chip, Avatar, Tooltip } from '@mui/material';
import { Person } from '@mui/icons-material';

export const PersonaChip = ({ persona }) => (
  <Tooltip title={`Match Score: ${Math.round(persona.score)}%`}>
    <Chip
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <Person />
        </Avatar>
      }
      label={`${persona.name} (${persona.sentiment})`}
      color={persona.sentiment === 'positive' ? 'success' : 
             persona.sentiment === 'negative' ? 'error' : 'default'}
      variant="outlined"
      sx={{ 
        borderRadius: 2,
        px: 1,
        '& .MuiChip-label': {
          fontSize: '0.875rem'
        }
      }}
    />
  </Tooltip>
); 