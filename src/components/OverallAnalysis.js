import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  MoodOutlined as SentimentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Lightbulb as LightbulbIcon,
  Groups as GroupsIcon,
  Download as DownloadIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';

const MetricCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        {icon}
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" color={color} sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const SentimentBar = ({ sentiment, value }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="body2">{sentiment}</Typography>
      <Typography variant="body2" color="text.secondary">
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: 
            sentiment === 'Positive' ? 'success.main' :
            sentiment === 'Neutral' ? 'warning.main' : 'error.main',
        }
      }}
    />
  </Box>
);

const OverallAnalysis = ({ data, onCopy, onDownload }) => {
  const {
    sentimentBreakdown,
    keyThemes,
    demographicInsights,
    recommendations,
    riskFactors
  } = data;

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Overall Sentiment"
            value={data.overallSentiment}
            icon={<SentimentIcon color="primary" />}
            color={
              data.overallSentiment === 'Positive' ? 'success.main' :
              data.overallSentiment === 'Neutral' ? 'warning.main' : 'error.main'
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Confidence Score"
            value={`${data.confidenceScore}%`}
            icon={<TrendingUpIcon color="primary" />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Response Rate"
            value={`${data.responseRate}%`}
            icon={<GroupsIcon color="primary" />}
            color="secondary.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sentiment Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Sentiment Breakdown</Typography>
                <Box>
                  <Tooltip title="Copy Analysis">
                    <IconButton size="small" onClick={onCopy}>
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download Report">
                    <IconButton size="small" onClick={onDownload}>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {Object.entries(sentimentBreakdown).map(([sentiment, value]) => (
                <SentimentBar key={sentiment} sentiment={sentiment} value={value} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Key Themes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Themes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {keyThemes.map((theme, index) => (
                  <Chip
                    key={index}
                    label={theme}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Demographic Insights */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Demographic Insights
              </Typography>
              <Stack spacing={2}>
                {demographicInsights.map((insight, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {insight.category}
                    </Typography>
                    <Typography variant="body2">
                      {insight.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LightbulbIcon color="primary" />
                Key Recommendations
              </Typography>
              <Stack spacing={2}>
                {recommendations.map((rec, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {rec.title}
                    </Typography>
                    <Typography variant="body2">
                      {rec.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Factors */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: 'error.lighter' }}>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WarningIcon color="error" />
                Potential Risk Factors
              </Typography>
              <Grid container spacing={2}>
                {riskFactors.map((risk, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'background.paper',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'error.light'
                    }}>
                      <Typography variant="subtitle2" color="error" gutterBottom>
                        {risk.title}
                      </Typography>
                      <Typography variant="body2">
                        {risk.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallAnalysis; 