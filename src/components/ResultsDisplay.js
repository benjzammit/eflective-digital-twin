import React from 'react';
import {
  Box,
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Grid
} from '@mui/material';
import {
  Dashboard,
  Analytics,
  Lightbulb,
  TrendingUp,
  Launch,
  AttachMoney
} from '@mui/icons-material';
import SummaryView from './views/SummaryView';
import DetailedView from './views/DetailedView';
import InsightsView from './views/InsightsView';

const ModernResultsLayout = ({ feedbackData, isLoading }) => {
  const [activeView, setActiveView] = React.useState('summary');
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          mb: 4,
          borderBottom: 1,
          borderColor: 'divider',
          pb: 1
        }}
      >
        <TabButton
          active={activeView === 'summary'}
          onClick={() => setActiveView('summary')}
          icon={<Dashboard />}
          label="Summary View"
        />
        <TabButton
          active={activeView === 'detailed'}
          onClick={() => setActiveView('detailed')}
          icon={<Analytics />}
          label="Detailed Analysis"
        />
        <TabButton
          active={activeView === 'insights'}
          onClick={() => setActiveView('insights')}
          icon={<Lightbulb />}
          label="Key Insights"
        />
      </Stack>

      <Box sx={{ minHeight: 400 }}>
        {activeView === 'summary' && (
          <SummaryView data={feedbackData} isLoading={isLoading} />
        )}
        {activeView === 'detailed' && (
          <DetailedView data={feedbackData} isLoading={isLoading} />
        )}
        {activeView === 'insights' && (
          <InsightsView data={feedbackData} isLoading={isLoading} />
        )}
      </Box>
    </Box>
  );
};

// Reusable Components
const TabButton = ({ active, onClick, icon, label }) => (
  <Button
    variant={active ? "contained" : "text"}
    onClick={onClick}
    startIcon={icon}
    sx={{
      borderRadius: 2,
      textTransform: 'none',
      px: 3,
      py: 1
    }}
  >
    {label}
  </Button>
);

export default ModernResultsLayout; 