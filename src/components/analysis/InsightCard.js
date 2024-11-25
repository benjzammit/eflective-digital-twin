import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Box } from '@mui/material';

export const InsightCard = ({ title, items = [], icon, chipColor = "primary" }) => (
  <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ color: `${chipColor}.main` }}>{icon}</Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Stack spacing={1}>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            color={chipColor}
            variant="outlined"
            sx={{ 
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
                p: 1,
                textAlign: 'left'
              },
              borderRadius: 2
            }}
          />
        ))}
      </Stack>
    </CardContent>
  </Card>
); 