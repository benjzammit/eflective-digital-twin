import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const COLORS = {
  Positive: '#10b981',
  Neutral: '#f59e0b',
  Negative: '#ef4444'
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ p: 1.5 }}>
        <Typography variant="subtitle2">
          {payload[0].name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Count: {payload[0].value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Percentage: {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%
        </Typography>
      </Card>
    );
  }
  return null;
};

const RechartsChart = ({ feedbackData, chartType }) => {
  if (!feedbackData || Object.keys(feedbackData).length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No feedback data available
        </Typography>
      </Box>
    );
  }

  // Process data for charts
  const sentimentCounts = Object.values(feedbackData).reduce((acc, feedback) => {
    acc[feedback.sentiment] = (acc[feedback.sentiment] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(sentimentCounts).map(([name, value]) => ({
    name,
    value,
    total: Object.values(sentimentCounts).reduce((a, b) => a + b, 0)
  }));

  const confidenceData = Object.entries(feedbackData).map(([id, feedback]) => ({
    name: feedback.name,
    confidence: feedback.confidence
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledCard>
          <CardContent sx={{ height: 350 }}>
            <Typography variant="h6" gutterBottom>
              {chartType === 'sentiment' ? 'Sentiment Distribution' : 'Confidence Scores'}
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                {chartType === 'sentiment' ? (
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index
                      }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill={COLORS[pieData[index].name]}
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                          >
                            {`${pieData[index].name} (${value})`}
                          </text>
                        );
                      }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[entry.name]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                ) : (
                  <BarChart
                    data={confidenceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      label={{ 
                        value: 'Confidence (%)', 
                        angle: -90, 
                        position: 'insideLeft' 
                      }}
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="confidence" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default RechartsChart;