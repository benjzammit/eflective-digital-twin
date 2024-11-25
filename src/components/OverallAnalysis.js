import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Groups,
  Lightbulb,
  Warning,
  ThumbUp,
  Person,
  Psychology,
  TrendingDown,
  CheckCircle
} from '@mui/icons-material';
import MetricBox from './analysis/MetricBox';
import { InsightCard } from './analysis/InsightCard';
import { PersonaChip } from './analysis/PersonaChip';
import LoadingState from './analysis/LoadingState';
import EmptyState from './analysis/EmptyState';
import { SentimentBreakdown } from './analysis/SentimentBreakdown';
import { calculateAverageMetrics, findTopPersonas } from '../utils/analysisHelpers';

const OverallAnalysis = ({ data = {}, isLoading }) => {
  if (isLoading) return <LoadingState />;
  if (!data || Object.keys(data).length === 0) return <EmptyState />;

  const {
    overallSentiment,
    confidenceScore,
    responseRate,
    sentimentBreakdown = {},
    keyInsights,
    keyThemes = [],
    recommendations = [],
    riskFactors = [],
    consensusPoints = [],
    divergentViews = []
  } = data;

  const averageMetrics = calculateAverageMetrics(data.responses || []);
  const topPersonas = findTopPersonas(data.responses || []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Metrics Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Key Metrics</Typography>
              <Grid container spacing={2}>
                <MetricBox
                  title="Overall Sentiment"
                  value={`${averageMetrics.sentiment}%`}
                  score={confidenceScore}
                  icon={<ThumbUp />}
                />
                <MetricBox
                  title="Average Interest"
                  value={`${averageMetrics.interest}%`}
                  score={averageMetrics.interest}
                  icon={<TrendingUp />}
                />
                <MetricBox
                  title="Adoption Rate"
                  value={`${averageMetrics.adoption}%`}
                  score={averageMetrics.adoption}
                  icon={<Groups />}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Personas */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Person />
                <Typography variant="h6">Top Personas</Typography>
              </Box>
              <Stack spacing={1}>
                {topPersonas.map((persona, index) => (
                  <PersonaChip key={index} persona={persona} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sentiment Breakdown */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Psychology />
                <Typography variant="h6">Sentiment Breakdown</Typography>
              </Box>
              <SentimentBreakdown sentimentBreakdown={sentimentBreakdown} />
            </CardContent>
          </Card>
        </Grid>

        {/* Key Insights */}
        <Grid item xs={12} md={6}>
          <InsightCard
            title="Key Insights"
            items={keyThemes}
            icon={<Lightbulb />}
            chipColor="primary"
          />
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={6}>
          <InsightCard
            title="Recommendations"
            items={recommendations}
            icon={<TrendingUp />}
            chipColor="success"
          />
        </Grid>

        {/* Risk Factors */}
        <Grid item xs={12} md={6}>
          <InsightCard
            title="Risk Factors"
            items={riskFactors}
            icon={<Warning />}
            chipColor="error"
          />
        </Grid>

        {/* Consensus Points */}
        <Grid item xs={12} md={6}>
          <InsightCard
            title="Areas of Agreement"
            items={consensusPoints}
            icon={<CheckCircle />}
            chipColor="info"
          />
        </Grid>

        {/* Divergent Views */}
        <Grid item xs={12}>
          <InsightCard
            title="Divergent Views"
            items={divergentViews}
            icon={<TrendingDown />}
            chipColor="warning"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallAnalysis; 