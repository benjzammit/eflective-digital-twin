import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Error } from '@mui/icons-material';

const ErrorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: 600,
  margin: '100px auto',
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <Error color="error" sx={{ fontSize: 64 }} />
          <Typography variant="h5" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography color="text.secondary" align="center">
            We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh Page
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 