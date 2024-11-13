// src/components/Sidebar.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Drawer, 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  CircularProgress,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { generateDigitalTwinFeedback } from '../services/openai';
import personasData from '../data/personas.json';

const HEADER_HEIGHT = 64;

const StyledDrawer = styled(Drawer)(({ theme, width }) => ({
  width: width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: width,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    border: 'none',
    padding: theme.spacing(3),
  },
}));

const SidebarCard = styled(Card)(({ theme }) => ({
  height: 'calc(100vh - 140px)', // Adjust based on header and footer heights
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: HEADER_HEIGHT + 16, // Header height + desired gap
}));

const Sidebar = ({ onGenerate, isLoading, width }) => {
  const [feedbackContent, setFeedbackContent] = useState('');
  const [responseType, setResponseType] = useState('detailed');
  const [selectedPersonas, setSelectedPersonas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      feedbackContent,
      responseType,
      selectedPersonas,
    });
  };

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      width={width}
    >
      <SidebarCard>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Research Lab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your concept or idea and select digital twins for analysis
            </Typography>
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}
          >
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter your concept or idea"
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              placeholder="Describe your concept, product, or idea here..."
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Response Type</InputLabel>
              <Select
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                label="Response Type"
              >
                <MenuItem value="detailed">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InsightsIcon fontSize="small" />
                    <Box>
                      <Typography variant="body2">Detailed Analysis</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Comprehensive feedback with recommendations
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem value="summary">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssessmentIcon fontSize="small" />
                    <Box>
                      <Typography variant="body2">Quick Summary</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Concise overview with pros and cons
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {/* Example of selecting personas */}
            <FormControl fullWidth>
              <InputLabel>Select Personas</InputLabel>
              <Select
                multiple
                value={selectedPersonas}
                onChange={(e) => setSelectedPersonas(e.target.value)}
                label="Select Personas"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={personasData.find(p => p.id === value)?.name || value} />
                    ))}
                  </Box>
                )}
              >
                {personasData.map((persona) => (
                  <MenuItem key={persona.id} value={persona.id}>
                    {persona.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isLoading}
              sx={{ 
                py: 1.5, 
                borderRadius: 2, 
                textTransform: 'none', 
                fontSize: '1rem' 
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Generating...
                </Box>
              ) : 'Generate Analysis'}
            </Button>
          </Box>
        </CardContent>
      </SidebarCard>
    </StyledDrawer>
  );
};

export default Sidebar;
