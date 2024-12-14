import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Paper 
} from '@mui/material';
import { Warning, Computer } from '@mui/icons-material';

const MobileNotice = () => {
  return (
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      textAlign: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <Warning sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>

        <Typography variant="h5" gutterBottom fontWeight="500">
          For a better experience
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Please access the Research Lab on a desktop computer for the full experience and functionality
        </Typography>

        <Button
          variant="contained"
          startIcon={<Computer />}
          href="/"
          sx={{
            borderRadius: 2,
            py: 1.5,
            px: 3,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Return to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default MobileNotice; 