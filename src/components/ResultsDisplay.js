import React from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Fade,
  Button,
  Skeleton
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  Insights as InsightsIcon
} from '@mui/icons-material';

const PersonaLoadingSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={60} height={60} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" />
        </Box>
      </Box>
      <Skeleton variant="rectangular" height={100} />
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="70%" />
      </Box>
    </CardContent>
  </Card>
);

const ResultsDisplay = ({ feedbackData, overallAnalysis, isLoading }) => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Fade in={true}>
      <Box>
        <Paper 
          elevation={0}
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ 
              px: 2, 
              pt: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 48,
                textTransform: 'none',
                fontSize: '1rem'
              }
            }}
          >
            <Tab 
              icon={<AnalyticsIcon sx={{ mr: 1 }} />} 
              label="Analysis Results" 
              iconPosition="start"
            />
            <Tab 
              icon={<InsightsIcon sx={{ mr: 1 }} />} 
              label="Overall Insights" 
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box>
                {isLoading ? (
                  <>
                    <PersonaLoadingSkeleton />
                    <PersonaLoadingSkeleton />
                    <PersonaLoadingSkeleton />
                  </>
                ) : (
                  <>
                    {feedbackData?.map((feedback, index) => (
                      <Card 
                        key={index} 
                        elevation={0}
                        sx={{ 
                          mb: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:last-child': {
                            mb: 0
                          }
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Chip 
                              label={`Feedback ${index + 1}`} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                            <Typography variant="body1">
                              {feedback}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </Box>
            )}

            {tabValue === 1 && (
              <Card 
                elevation={0}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent>
                  {isLoading ? (
                    <>
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" width="85%" />
                      <Skeleton variant="text" width="80%" />
                    </>
                  ) : (
                    <Typography variant="body1">
                      {overallAnalysis || 'No analysis available yet.'}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default ResultsDisplay; 