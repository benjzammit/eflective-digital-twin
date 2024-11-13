import React from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  styled,
  Tooltip,
  Zoom,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  ExpandMore as ExpandMoreIcon,
  TrendingUp,
  TrendingDown,
  Psychology,
  GroupWork,
  Restaurant,
  Business,
  School,
  Campaign,
  Storefront,
  DesignServices,
  LocalHospital
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

// Styled components
const StyledDemoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

const StepChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 0.5),
  '& .MuiChip-label': {
    fontWeight: 500,
  },
}));

// Add new styled component for hover card
const FeedbackCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    transform: 'translateY(-2px)',
  }
}));

const UseCasesPage = () => {
  const demoExample = {
    concept: `We're developing a mobile app that helps people track and reduce their carbon footprint through daily activities. The app will gamify sustainable choices and provide personalized recommendations.`,
    personas: [
      {
        name: "Emma Chen",
        age: 28,
        location: "San Francisco, USA",
        role: "UX Designer",
        trait: "Early Tech Adopter",
        feedback: {
          sentiment: "Positive",
          sentimentScore: 0.8,
          summary: "Strong potential with some usability concerns",
          pros: [
            "Gamification aspect will drive engagement",
            "Personalized recommendations align with user needs",
            "Mobile-first approach matches target audience"
          ],
          cons: [
            "May be overwhelming for less tech-savvy users",
            "Need clearer value proposition",
            "Consider offline functionality"
          ]
        }
      },
      {
        name: "Marcus Thompson",
        age: 35,
        location: "London, UK",
        role: "Management Consultant",
        trait: "Time-Conscious",
        feedback: {
          sentiment: "Neutral",
          sentimentScore: 0.6,
          summary: "Interesting concept but needs streamlining",
          pros: [
            "Quick daily interactions fit busy lifestyle",
            "Achievement system provides motivation",
            "Social sharing could drive adoption"
          ],
          cons: [
            "Time commitment might be a barrier",
            "Need more immediate rewards",
            "Simplify initial onboarding"
          ]
        }
      }
    ]
  };

  const usesCases = [
    {
      title: "Sustainable Fashion Line Launch Strategy",
      IconComponent: Campaign,
      concept: "An eco-friendly fashion brand validating their messaging and positioning for their first recycled denim collection",
      personas: ["Eco-Conscious Shopper", "Fashion Sustainability Advocate", "Premium Denim Buyer"],
      insights: [
        "Lead with recycling process transparency",
        "Focus on durability over fast fashion",
        "Highlight water conservation stats",
        "Emphasize timeless design elements"
      ],
      impact: "42% higher pre-launch engagement"
    },
    {
      title: "DTC Brand Voice Repositioning",
      IconComponent: Storefront,
      concept: "A traditional skincare brand refreshing their tone of voice to connect with Gen-Z on TikTok and Instagram",
      personas: ["Gen-Z Skinfluencer", "Clean Beauty Advocate", "Social Media Trend Follower"],
      insights: [
        "Adapt scientific terms for social media",
        "Create educational short-form content",
        "Incorporate trending audio strategy",
        "Develop authentic brand personality"
      ],
      impact: "38% increase in social engagement"
    },
    {
      title: "Food Delivery Menu Psychology Testing",
      IconComponent: Restaurant,
      concept: "A food delivery app optimizing their menu layout and categorization based on user decision-making patterns",
      personas: ["Health-Conscious Professional", "Busy Parent", "Convenience Seeker"],
      insights: [
        "Reorder categories by decision factors",
        "Add personalized dietary filters",
        "Implement time-based suggestions",
        "Optimize photo presentation"
      ],
      impact: "28% increase in order completion"
    },
    {
      title: "E-learning Platform Engagement Strategy",
      IconComponent: School,
      concept: "An online course platform validating their student engagement features and content delivery methods",
      personas: ["Remote Student", "Career Changer", "Lifelong Learner"],
      insights: [
        "Implement micro-learning modules",
        "Add social learning features",
        "Create progress gamification",
        "Enhance mobile experience"
      ],
      impact: "45% higher course completion"
    },
    {
      title: "Healthcare App Accessibility Testing",
      IconComponent: LocalHospital,
      concept: "A telehealth platform validating their user interface for elderly patients and those with disabilities",
      personas: ["Senior Patient", "Caregiver", "Accessibility Advocate"],
      insights: [
        "Increase text size and contrast",
        "Simplify navigation paths",
        "Add voice command options",
        "Improve emergency access"
      ],
      impact: "32% better patient engagement"
    },
    {
      title: "Finding Right Influencers for Target Audience",
      IconComponent: Campaign,
      concept: "A wellness supplement brand identifying and validating micro-influencer partnerships for their target demographics",
      personas: ["Wellness Content Creator", "Health-Conscious Millennial", "Fitness Community Leader"],
      insights: [
        "Focus on engagement over follower count",
        "Prioritize healthcare credentials",
        "Analyze audience overlap metrics",
        "Test content authenticity perception"
      ],
      impact: "52% higher audience alignment"
    }
  ];

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          See It In Action
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          Experience how Reflective transforms concepts into actionable insights
        </Typography>

        {/* Demo Cards */}
        <Grid container spacing={3}>
          {/* Step 1: Input */}
          <Grid item xs={12} md={4}>
            <StyledDemoCard>
              <CardContent>
                <StepChip 
                  label="Step 1: Input Concept" 
                  color="primary" 
                  icon={<Psychology />} 
                  sx={{ mb: 3 }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    bgcolor: 'action.hover',
                    p: 2,
                    borderRadius: 1,
                    border: '1px dashed',
                    borderColor: 'divider'
                  }}
                >
                  {demoExample.concept}
                </Typography>
              </CardContent>
            </StyledDemoCard>
          </Grid>

          {/* Step 2: Select Personas */}
          <Grid item xs={12} md={4}>
            <StyledDemoCard>
              <CardContent>
                <StepChip 
                  label="Step 2: Select Digital Twins" 
                  color="secondary" 
                  icon={<GroupWork />} 
                  sx={{ mb: 3 }}
                />
                <Stack spacing={2}>
                  {demoExample.personas.map((persona) => (
                    <Box
                      key={persona.name}
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.default'
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {persona.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {persona.role}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </StyledDemoCard>
          </Grid>

          {/* Step 3: Generated Insights */}
          <Grid item xs={12} md={4}>
            <StyledDemoCard>
              <CardContent>
                <StepChip 
                  label="Step 3: Generated Insights" 
                  color="success" 
                  icon={<CheckCircle />} 
                  sx={{ mb: 3 }}
                />
                <Stack spacing={2}>
                  {demoExample.personas.map((persona) => (
                    <Accordion 
                      key={persona.name}
                      sx={{ 
                        '&:before': { display: 'none' },
                        boxShadow: 'none',
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        '&.Mui-expanded': {
                          margin: 0,
                          mt: 1
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ px: 2 }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                          }}>
                            <Typography variant="subtitle1">
                              {persona.name}
                            </Typography>
                            <Chip 
                              size="small"
                              label={`${(persona.feedback.sentimentScore * 100).toFixed(0)}% ${persona.feedback.sentiment}`}
                              color={persona.feedback.sentimentScore >= 0.7 ? 'success' : 'warning'}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {persona.age} • {persona.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {persona.role} • {persona.trait}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mt: 1,
                              fontStyle: 'italic'
                            }}
                          >
                            "{persona.feedback.summary}"
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                        <Divider sx={{ my: 2 }} />
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography 
                              variant="subtitle2" 
                              color="success.main"
                              gutterBottom
                            >
                              Key Strengths
                            </Typography>
                            {persona.feedback.pros.map((pro, index) => (
                              <Box 
                                key={index}
                                sx={{ 
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1,
                                  mb: 1
                                }}
                              >
                                <TrendingUp 
                                  sx={{ 
                                    color: 'success.main',
                                    fontSize: 16,
                                    mt: 0.3
                                  }}
                                />
                                <Typography variant="body2">
                                  {pro}
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                          <Grid item xs={6}>
                            <Typography 
                              variant="subtitle2" 
                              color="error.main"
                              gutterBottom
                            >
                              Areas to Improve
                            </Typography>
                            {persona.feedback.cons.map((con, index) => (
                              <Box 
                                key={index}
                                sx={{ 
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1,
                                  mb: 1
                                }}
                              >
                                <TrendingDown 
                                  sx={{ 
                                    color: 'error.main',
                                    fontSize: 16,
                                    mt: 0.3
                                  }}
                                />
                                <Typography variant="body2">
                                  {con}
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </CardContent>
            </StyledDemoCard>
          </Grid>
        </Grid>
      </Container>

      {/* Use Cases Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Real-World Applications
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            From startups to enterprise organizations, Reflective helps teams across industries 
            validate ideas, refine products, and understand their target audience.
          </Typography>
          
          {/* Use Cases Carousel */}
          <Grid container spacing={4} sx={{ px: 2 }}>
            {usesCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledDemoCard>
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      gap: 2 
                    }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 48,
                          height: 48
                        }}
                      >
                        {React.createElement(useCase.IconComponent)}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      paragraph
                      sx={{ 
                        minHeight: '3em',
                        mb: 2 
                      }}
                    >
                      {useCase.concept}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {useCase.personas.map((persona, idx) => (
                        <Chip 
                          key={idx}
                          label={persona}
                          size="small"
                          sx={{ 
                            mr: 1, 
                            mb: 1,
                            bgcolor: 'background.default' 
                          }}
                        />
                      ))}
                    </Box>
                    <Typography 
                      variant="subtitle2" 
                      color="primary" 
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Key Insights:
                    </Typography>
                    <List dense sx={{ mb: 2 }}>
                      {useCase.insights.map((insight, idx) => (
                        <ListItem key={idx} sx={{ px: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={insight}
                            primaryTypographyProps={{
                              variant: 'body2'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ 
                      mt: 'auto',
                      p: 1,
                      borderRadius: 1,
                      display: 'inline-block'
                    }}>
                      <Typography variant="subtitle2">
                        Impact: {useCase.impact}
                      </Typography>
                    </Box>
                  </CardContent>
                </StyledDemoCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 100%)'
      }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Transform your product development with AI-powered consumer insights
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            href="/research-lab"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Try Reflective Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default UseCasesPage; 