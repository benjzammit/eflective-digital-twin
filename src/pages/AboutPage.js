import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  MobileStepper,
  IconButton,
  Divider,
  Rating
} from '@mui/material';
import { 
  Psychology,
  School,
  Speed,
  Security,
  Timeline,
  CheckCircle,
  ArrowForward,
  ExpandMore,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Business,
  LocationOn,
  Work,
  GroupWork,
  InsightsOutlined,
  FormatQuote,
  AccessTime
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0, 8),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  borderRadius: 0,
  marginBottom: 0,
}));

const SectionWrapper = styled(Box)(({ theme, bgColor = 'transparent' }) => ({
  position: 'relative',
  backgroundColor: bgColor,
  padding: theme.spacing(8, 0),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: bgColor,
    zIndex: -1,
  }
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    background: theme.palette.primary.main + '15',
    borderRadius: '50%',
    zIndex: 0,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(1, 0),
  },
}));

const AboutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const caseStudies = [
    {
      title: "Global Brand Product Launch",
      industry: "Consumer Electronics",
      challenge: "Needed quick, accurate consumer insights for a new product launch across multiple markets.",
      solution: "Used Reflective's digital twins to gather detailed feedback from 40+ academically-profiled personas across 5 markets in 48 hours.",
      results: [
        "Research time reduced by 85%",
        "Product modifications saved $2M in potential revisions",
        "Launch success rate increased by 40%"
      ],
      researcher: {
        name: "Dr. Sarah Chen",
        role: "Head of UX Research",
        company: "TechCorp",
        location: "San Francisco, USA",
        age: 38,
        quote: "The speed and accuracy were unprecedented."
      }
    },
    {
      title: "E-commerce Platform Redesign",
      industry: "Retail Technology",
      challenge: "Needed to validate new UX design decisions across diverse user segments quickly.",
      solution: "Leveraged 25 digital twins to simulate user interactions and gather feedback on new features.",
      results: [
        "UX testing time cut by 70%",
        "Identified 15 critical usability improvements",
        "Customer satisfaction increased by 35%"
      ],
      researcher: {
        name: "Michael Zhang",
        role: "UX Director",
        company: "ShopTech Solutions",
        location: "Toronto, Canada",
        age: 42,
        quote: "The insights we received were incredibly detailed and actionable."
      }
    },
    {
      title: "Healthcare App Development",
      industry: "Healthcare Technology",
      challenge: "Required rapid user feedback for a sensitive healthcare application while maintaining privacy.",
      solution: "Utilized 30 healthcare-specific digital twins to evaluate feature acceptance and usability.",
      results: [
        "Compliance verification accelerated by 60%",
        "Patient privacy maintained throughout testing",
        "Development cycle reduced by 3 months"
      ],
      researcher: {
        name: "Dr. Emma Watson",
        role: "Product Strategy Lead",
        company: "HealthTech Innovations",
        location: "London, UK",
        age: 45,
        quote: "The depth of healthcare-specific insights was remarkable."
      }
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom fontWeight="bold">
            Real Consumer Feedback, Real People
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            AI-Powered Digital Twins with Academic Precision
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Join leading brands getting insights from our academically-profiled digital twins
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              {['98% Accuracy', '2x Faster Insights', '40+ Academic Profiles'].map((stat) => (
                <Chip 
                  key={stat}
                  label={stat}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 'bold' }}
                />
              ))}
            </Box>
          </Box>
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForward />}
            sx={{ px: 4, py: 1.5 }}
          >
            Start Free Trial
          </Button>
        </Container>
      </HeroSection>

      {/* How It Works Section */}
      <SectionWrapper bgColor="background.paper">
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            mb: 6,
            '& h4': {
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: 'primary.main',
                borderRadius: 1,
              }
            }
          }}>
            <Typography variant="h4" gutterBottom>
              How Reflective Works
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              Get valuable consumer insights in under 5 minutes
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <Psychology fontSize="large" />,
                step: "1",
                title: "Input Your Concept",
                description: "Share your product, service, or idea that needs evaluation.",
                time: "1 min"
              },
              {
                icon: <GroupWork fontSize="large" />,
                step: "2",
                title: "Select Digital Twins",
                description: "Choose from our library of academically-profiled digital twins.",
                time: "1 min"
              },
              {
                icon: <InsightsOutlined fontSize="large" />,
                step: "3",
                title: "Generate Insights",
                description: "Our AI processes your input through selected digital twins.",
                time: "2 min"
              },
              {
                icon: <Timeline fontSize="large" />,
                step: "4",
                title: "Review Analysis",
                description: "Get comprehensive insights and actionable recommendations.",
                time: "1 min"
              }
            ].map((step, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box sx={{ 
                  position: 'relative', 
                  textAlign: 'center',
                  '&::after': {
                    content: index === 3 ? 'none' : '""',
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '20%',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    display: { xs: 'none', md: 'block' }
                  }
                }}>
                  <Box sx={{ 
                    mb: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    position: 'relative'
                  }}>
                    {step.icon}
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {step.step}
                    </Typography>
                    <Chip
                      label={step.time}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        right: -20,
                        backgroundColor: 'success.light',
                        color: 'white',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Total Time Indicator */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Chip
              icon={<AccessTime />}
              label="Total Time: Under 5 Minutes"
              color="primary"
              variant="outlined"
              sx={{ 
                px: 2,
                py: 1,
                '& .MuiChip-label': {
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }
              }}
            />
          </Box>
        </Container>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            mb: 6,
            '& h4': {
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: 'primary.main',
                borderRadius: 1,
              }
            }
          }}>
            <Typography variant="h4" gutterBottom>
              Trusted by Research Teams Worldwide
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {/* Testimonials */}
            {[
              {
                quote: "Reflective's digital twins provided insights that perfectly matched our real user research findings, but in a fraction of the time.",
                author: "Dr. Sarah Chen",
                role: "Head of UX Research, TechCorp",
                rating: 5,
                impact: "Reduced research time by 60%",
                image: "/path/to/image1.jpg"
              },
              {
                quote: "The academic rigor behind these digital twins is impressive. We've never seen such accurate consumer behavior predictions.",
                author: "Mark Thompson",
                role: "Product Director, InnovateCo",
                rating: 5,
                impact: "Improved product-market fit by 45%",
                image: "/path/to/image2.jpg"
              },
              {
                quote: "Finally, a research tool that combines academic precision with the speed of AI. Game-changing for our team.",
                author: "Lisa Rodriguez",
                role: "Consumer Insights Manager, GlobalBrands",
                rating: 5,
                impact: "Increased research efficiency by 75%",
                image: "/path/to/image3.jpg"
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard>
                  <CardContent>
                    <Box sx={{ position: 'relative', mb: 3 }}>
                      <FormatQuote 
                        sx={{ 
                          fontSize: 40, 
                          color: 'primary.main', 
                          position: 'absolute',
                          top: -10,
                          left: -10,
                          opacity: 0.3
                        }} 
                      />
                      <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                          minHeight: 120,
                          pt: 3,
                          px: 1
                        }}
                      >
                        {testimonial.quote}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={testimonial.image} 
                        sx={{ 
                          mr: 2,
                          width: 56,
                          height: 56,
                          bgcolor: 'primary.main'
                        }}
                      >
                        {testimonial.author[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Rating value={testimonial.rating} readOnly size="small" />
                      <Chip 
                        label={testimonial.impact} 
                        color="success" 
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper bgColor="background.paper">
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            mb: 6,
            '& h4': {
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: 'primary.main',
                borderRadius: 1,
              }
            }
          }}>
            <Typography variant="h4" gutterBottom>
              Why Choose Reflective
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              {
                icon: <Psychology fontSize="large" />,
                title: "Real, Academically Profiled Consumers",
                description: "Reflective's digital twins aren't just data – they're based on real people, profiled with rigorous academic standards to give you authentic consumer reactions."
              },
              {
                icon: <Speed fontSize="large" />,
                title: "Precision in Consumer Behavior",
                description: "Our AI-driven digital twins are meticulously profiled from real individuals, providing nuanced insights into consumer behavior that generic simulations can't match."
              },
              {
                icon: <School fontSize="large" />,
                title: "Reliability through Academic Standards",
                description: "Each digital twin is created using profiles rooted in academic research, ensuring the feedback reflects genuine consumer thought patterns and behavior."
              },
              {
                icon: <Timeline fontSize="large" />,
                title: "Accelerated Decisions with True-to-Life Data",
                description: "No more waiting for insights. Get authentic, real-time consumer feedback based on academically sound profiles to power quick, data-driven decisions."
              },
              {
                icon: <Security fontSize="large" />,
                title: "Trustworthy, Human-Centered Data",
                description: "Built on the foundation of real human profiles, Reflective's digital twins ensure your insights are relevant, trustworthy, and rooted in true consumer behavior."
              },
              {
                icon: <InsightsOutlined fontSize="large" />,
                title: "Data-Driven & Human-Validated",
                description: "Reflective's AI blends advanced technology with human-centric profiling, making your consumer insights both data-driven and validated by real behaviors."
              }
            ].map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                  p: 2
                }}>
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      mb: 2,
                      gap: 1
                    }}>
                      <Box sx={{ 
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        p: 1,
                        bgcolor: (theme) => theme.palette.primary.main + '15'
                      }}>
                        {benefit.icon}
                      </Box>
                      <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Academic Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Academic Foundation
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h5" gutterBottom color="primary">
                  Research-Backed Digital Twins
                </Typography>
                <Typography paragraph>
                  Reflective's digital twins are built on established academic research in the fields of user experience, 
                  digital twins, and artificial intelligence. Our approach combines qualitative research methodologies 
                  with advanced AI to provide deeper insights into user perspectives.
                </Typography>
                <List>
                  {[
                    "Peer-reviewed research methodology",
                    "Collaboration with leading universities",
                    "Continuous validation through academic studies",
                    "Evidence-based persona development",
                    "Regular academic publication contributions"
                  ].map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Academic Validation
                </Typography>
                <Typography paragraph>
                  Our digital twins have been validated through extensive academic research, 
                  showing a 98% correlation with real-world consumer behavior patterns.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {[
                    "40+ Academic Papers",
                    "15+ University Partners",
                    "98% Accuracy Rate",
                    "200+ Validated Profiles"
                  ].map((stat) => (
                    <Chip 
                      key={stat}
                      label={stat}
                      sx={{ 
                        bgcolor: 'white', 
                        color: 'primary.main',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Case Studies (Success Stories) Section */}
      <SectionWrapper bgColor="background.paper">
        <Container maxWidth="lg">
          {/* Case Studies Carousel - Middle Funnel */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              Success Stories
            </Typography>
            <Paper 
              sx={{ 
                p: 4, 
                mb: 2,
                background: 'linear-gradient(45deg, #f3f4f6, #ffffff)',
                boxShadow: (theme) => theme.shadows[2]
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom color="primary">
                    {caseStudies[activeStep].title}
                  </Typography>
                  <Chip 
                    icon={<Business />} 
                    label={caseStudies[activeStep].industry} 
                    sx={{ mb: 3 }}
                  />

                  <Typography variant="h6" gutterBottom color="primary">
                    The Challenge
                  </Typography>
                  <Typography paragraph>
                    {caseStudies[activeStep].challenge}
                  </Typography>

                  <Typography variant="h6" gutterBottom color="primary">
                    The Solution
                  </Typography>
                  <Typography paragraph>
                    {caseStudies[activeStep].solution}
                  </Typography>

                  <Typography variant="h6" gutterBottom color="primary">
                    The Results
                  </Typography>
                  <List>
                    {caseStudies[activeStep].results.map((result, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={result} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {caseStudies[activeStep].researcher.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">
                      {caseStudies[activeStep].researcher.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {caseStudies[activeStep].researcher.role} at {caseStudies[activeStep].researcher.company}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                      <Chip 
                        icon={<LocationOn />} 
                        label={caseStudies[activeStep].researcher.location} 
                        size="small"
                      />
                      <Chip 
                        icon={<Work />} 
                        label={`${caseStudies[activeStep].researcher.age} years old`}
                        size="small"
                      />
                    </Box>

                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontStyle: 'italic',
                        bgcolor: 'background.paper',
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1
                      }}
                    >
                      "{caseStudies[activeStep].researcher.quote}"
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <MobileStepper
              steps={caseStudies.length}
              position="static"
              activeStep={activeStep}
              sx={{ 
                maxWidth: 400, 
                flexGrow: 1, 
                mx: 'auto',
                bgcolor: 'transparent' 
              }}
              nextButton={
                <IconButton 
                  size="small" 
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  disabled={activeStep === caseStudies.length - 1}
                >
                  <KeyboardArrowRight />
                </IconButton>
              }
              backButton={
                <IconButton 
                  size="small" 
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              }
            />
          </Box>
        </Container>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              Frequently Asked Questions
            </Typography>
            {[
              {
                question: "How do I know these insights are based on real consumer behavior?",
                answer: "Our digital twins are created through extensive academic research, real consumer interviews, and behavioral studies. Each profile is validated against real-world data and continuously updated based on actual consumer behavior patterns."
              },
              {
                question: "Can AI truly represent individual consumer preferences accurately?",
                answer: "Our AI combines advanced machine learning with academically-validated behavioral models. We've achieved a 98% correlation between our digital twin responses and real consumer feedback in blind tests."
              },
              {
                question: "How is Reflective's digital twin different from standard market research data?",
                answer: "Unlike traditional market research that provides static data points, our digital twins simulate dynamic, contextual responses based on real personality profiles."
              },
              {
                question: "What academic standards back Reflective's digital twin technology?",
                answer: "Our technology is built on peer-reviewed research in cognitive psychology, consumer behavior, and AI. We collaborate with leading universities to continuously validate and improve our models."
              },
              {
                question: "How trustworthy are these digital twins in representing real-world behavior?",
                answer: "Each digital twin undergoes rigorous validation through academic research and real-world testing, ensuring reliable and accurate insights."
              }
            ].map((faq, index) => (
              <StyledAccordion key={index}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Container>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper bgColor="background.paper">
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            mb: 4,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            borderRadius: 2,
            px: { xs: 2, md: 4 }
          }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Ready to Transform Your Research?
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Join leading brands using Reflective's digital twins for faster, more accurate consumer insights.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowForward />}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};

export default AboutPage; 