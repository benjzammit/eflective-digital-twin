import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const OverlayContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: theme.zIndex.modal + 1,
}));

const LoadingOverlay = ({ message = 'Generating feedback...' }) => (
  <OverlayContainer>
    <CircularProgress size={60} thickness={4} />
    <Typography variant="h6" sx={{ mt: 2 }}>
      {message}
    </Typography>
  </OverlayContainer>
);

export default LoadingOverlay; 