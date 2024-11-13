import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Avatar,
  Chip,
  MobileStepper
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  CheckCircle,
  Business,
  LocationOn,
  Work
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CaseStudyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(45deg, #f3f4f6, #ffffff)',
  minHeight: 500,
}));

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
      image: "/images/sarah-chen.jpg",
      role: "Head of UX Research",
      company: "TechCorp",
      location: "San Francisco, USA",
      age: 38,
      quote: "The speed and accuracy were unprecedented."
    }
  },
  {
    title: "Startup Market Validation",
    industry: "FinTech",
    challenge: "Early-stage startup needed to validate their product concept with limited budget and time.",
    solution: "Leveraged 25 digital twins to simulate target market responses and iterate on product features.",
    results: [
      "Saved $50,000 in initial research costs",
      "Reduced time-to-market by 2 months",
      "Secured seed funding based on insights"
    ],
    researcher: {
      name: "Marcus Rodriguez",
      image: "/images/marcus-rodriguez.jpg",
      role: "Product Strategy Lead",
      company: "PayFin",
      location: "London, UK",
      age: 32,
      quote: "Game-changing for early-stage startups."
    }
  },
  {
    title: "Service Design Optimization",
    industry: "Healthcare",
    challenge: "Healthcare provider needed to optimize their patient experience without disrupting current services.",
    solution: "Used digital twins to simulate patient journeys and identify pain points across different demographics.",
    results: [
      "Patient satisfaction increased by 45%",
      "Operational efficiency improved by 30%",
      "Staff training time reduced by 50%"
    ],
    researcher: {
      name: "Dr. Emily Wong",
      image: "/images/emily-wong.jpg",
      role: "Service Design Director",
      company: "HealthPlus",
      location: "Singapore",
      age: 41,
      quote: "The insights transformed our service design approach."
    }
  }
];

const CaseStudyCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = caseStudies.length;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const currentCase = caseStudies[activeStep];

  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Success Stories
      </Typography>
      
      <CaseStudyPaper elevation={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom color="primary">
              {currentCase.title}
            </Typography>
            <Chip 
              icon={<Business />} 
              label={currentCase.industry} 
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" gutterBottom color="primary">
              The Challenge
            </Typography>
            <Typography paragraph>
              {currentCase.challenge}
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              The Solution
            </Typography>
            <Typography paragraph>
              {currentCase.solution}
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              The Results
            </Typography>
            <List>
              {currentCase.results.map((result, index) => (
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
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                src={currentCase.researcher.image}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6">
                {currentCase.researcher.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {currentCase.researcher.role} at {currentCase.researcher.company}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                <Chip 
                  icon={<LocationOn />} 
                  label={currentCase.researcher.location} 
                  size="small"
                />
                <Chip 
                  icon={<Work />} 
                  label={`${currentCase.researcher.age} years old`}
                  size="small"
                />
              </Box>

              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{currentCase.researcher.quote}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CaseStudyPaper>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1, mx: 'auto' }}
        nextButton={
          <IconButton 
            size="small" 
            onClick={handleNext} 
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton 
            size="small" 
            onClick={handleBack} 
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
      />
    </Box>
  );
};

export default CaseStudyCarousel; 