// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Paper,
  Divider,
  InputAdornment,
  Tooltip,
  Grid,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Help as HelpIcon,
  Psychology,
  School,
  Work,
  Business,
  Elderly,
  TrendingUp,
  FamilyRestroom,
  ShoppingBag,
  Lightbulb,
  TipsAndUpdates,
  HelpOutline
} from '@mui/icons-material';
import personasData from '../data/personas.json';

const PersonaSelectionDialog = ({ open, onClose, selectedPersonas, onPersonasChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ageGroups: [],
    location: '',
  });
  const [activeQuickSelect, setActiveQuickSelect] = useState(null);
  const [availablePersonas, setAvailablePersonas] = useState(personasData);

  const quickSelectGroups = [
    {
      name: "Digital Natives",
      tooltip: "Tech-savvy young adults (18-34)",
      icon: <Psychology fontSize="small" />,
      filters: { ageGroup: ['18-24', '25-34'] }
    },
    {
      name: "Students",
      tooltip: "University and young learners (18-24)",
      icon: <School fontSize="small" />,
      filters: { ageGroup: ['18-24'] }
    },
    {
      name: "Young Professionals",
      tooltip: "Career-focused individuals (25-34)",
      icon: <Work fontSize="small" />,
      filters: { ageGroup: ['25-34'] }
    },
    {
      name: "Business Leaders",
      tooltip: "Senior decision makers (35-54)",
      icon: <Business fontSize="small" />,
      filters: { ageGroup: ['35-54'] }
    },
    {
      name: "Family Focused",
      tooltip: "Parents and caregivers",
      icon: <FamilyRestroom fontSize="small" />,
      filters: { ageGroup: ['35-44'] }
    }
  ];

  const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const locations = [
    { code: 'MT', name: 'Malta' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'LON', name: 'London' }
  ];

  // Update filtered personas whenever filters change
  useEffect(() => {
    const filtered = personasData.filter(persona => {
      // If quick select is active, use its criteria
      if (activeQuickSelect) {
        const group = quickSelectGroups.find(g => g.name === activeQuickSelect);
        if (!group) return false;
        return group.filters.ageGroup.some(range => {
          if (range === '65+') return persona.age >= 65;
          const [min, max] = range.split('-').map(Number);
          return persona.age >= min && persona.age <= max;
        });
      }

      // Otherwise apply manual filters
      const ageMatch = filters.ageGroups.length === 0 || filters.ageGroups.some(range => {
        if (range === '65+') return persona.age >= 65;
        const [min, max] = range.split('-').map(Number);
        return persona.age >= min && persona.age <= max;
      });

      // Updated country matching logic to check both country_code and location
      const locationMatch = !filters.location || (
        filters.location === 'MT' && (
          persona.country_code === 'MT' ||
          persona.location?.toLowerCase().includes('malta')
        )) || (
        filters.location === 'UK' && (
          persona.country_code === 'UK' ||
          persona.location?.toLowerCase().includes('united kingdom') ||
          persona.location?.toLowerCase().includes('uk') ||
          persona.location?.toLowerCase().includes('england') ||
          persona.location?.toLowerCase().includes('scotland') ||
          persona.location?.toLowerCase().includes('wales') ||
          persona.location?.toLowerCase().includes('britain')
        )) || (
        filters.location === 'LON' && (
          persona.location?.toLowerCase().includes('london')
        )
      );

      const searchMatch = !searchTerm || 
        persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.occupation?.toLowerCase().includes(searchTerm.toLowerCase());

      return ageMatch && locationMatch && searchMatch;
    });

    setAvailablePersonas(filtered);
  }, [filters, activeQuickSelect, searchTerm]);

  const handleQuickSelect = (group) => {
    if (activeQuickSelect === group.name) {
      setActiveQuickSelect(null);
      onPersonasChange([]);
    } else {
      setActiveQuickSelect(group.name);
      const filteredIds = personasData
        .filter(persona => 
          group.filters.ageGroup.some(range => {
            if (range === '65+') return persona.age >= 65;
            const [min, max] = range.split('-').map(Number);
            return persona.age >= min && persona.age <= max;
          })
        )
        .map(p => p.id);
      onPersonasChange(filteredIds);
    }
    setFilters({ ageGroups: [], location: '' });
  };

  const handleAgeGroupToggle = (age) => {
    if (activeQuickSelect) {
      setActiveQuickSelect(null);
      onPersonasChange([]);
    }
    setFilters(prev => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(age)
        ? prev.ageGroups.filter(g => g !== age)
        : [...prev.ageGroups, age]
    }));
  };

  const handleLocationSelect = (locationCode) => {
    if (activeQuickSelect) {
      setActiveQuickSelect(null);
      onPersonasChange([]);
    }
    setFilters(prev => ({
      ...prev,
      location: prev.location === locationCode ? '' : locationCode
    }));
  };

  const handlePersonaToggle = (personaId) => {
    if (activeQuickSelect) return;
    onPersonasChange(prev => 
      prev.includes(personaId)
        ? prev.filter(id => id !== personaId)
        : [...prev, personaId]
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Select Digital Twins
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Choose the personas that will analyze your concept
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Quick Select Section */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Quick Select
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickSelectGroups.map((group) => (
                <Tooltip key={group.name} title={group.tooltip}>
                  <Paper
                    variant="outlined"
                    onClick={() => handleQuickSelect(group)}
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 140,
                      bgcolor: activeQuickSelect === group.name ? 'primary.main' : 'transparent',
                      color: activeQuickSelect === group.name ? 'white' : 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                      }
                    }}
                  >
                    {group.icon}
                    <Typography variant="body2">{group.name}</Typography>
                  </Paper>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* Filters */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Age Groups
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {ageGroups.map((age) => (
                <Chip
                  key={age}
                  label={age}
                  onClick={() => handleAgeGroupToggle(age)}
                  variant={filters.ageGroups.includes(age) ? "filled" : "outlined"}
                  color="primary"
                />
              ))}
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Location
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {locations.map((location) => (
                <Chip
                  key={location.code}
                  label={location.name}
                  onClick={() => handleLocationSelect(location.code)}
                  variant={filters.location === location.code ? "filled" : "outlined"}
                  color="primary"
                />
              ))}
            </Box>
          </Box>

          {/* Available Personas */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Available Personas ({availablePersonas.length})
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Click on personas below to select them for your analysis
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              maxHeight: 200,
              overflowY: 'auto',
              p: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper'
            }}>
              {availablePersonas.map((persona) => (
                <Tooltip 
                  key={persona.id}
                  title={`${persona.name} • ${persona.age} years • ${persona.occupation || 'N/A'}`}
                >
                  <Chip
                    avatar={<Avatar>{persona.name[0]}</Avatar>}
                    label={`${persona.name} (${persona.age})`}
                    onClick={() => handlePersonaToggle(persona.id)}
                    variant={selectedPersonas.includes(persona.id) ? "filled" : "outlined"}
                    color="primary"
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConceptGuideDialog = ({ open, onClose }) => {
  const examples = [
    {
      icon: <ShoppingBag />,
      title: "Products",
      examples: [
        "A sustainable water bottle that tracks daily hydration",
        "An AI-powered meal planning app for busy families",
        "Smart garden sensors for urban farming"
      ]
    },
    {
      icon: <Business />,
      title: "Services",
      examples: [
        "Monthly subscription for personalized wellness coaching",
        "On-demand pet care service via mobile app",
        "Virtual reality fitness classes"
      ]
    },
    {
      icon: <Lightbulb />,
      title: "Ideas & Concepts",
      examples: [
        "Community marketplace for sharing DIY tools",
        "Educational platform connecting seniors with tech mentors",
        "Food waste reduction program for restaurants"
      ]
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TipsAndUpdates color="primary" />
          <Typography variant="h6">Concept Guide</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          What makes a good research input?
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                ✓ Do Include
              </Typography>
              <List dense>
                <ListItem>• Clear target audience or use case</ListItem>
                <ListItem>• Key features or benefits</ListItem>
                <ListItem>• Pricing strategy (if applicable)</ListItem>
                <ListItem>• Unique selling points</ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="error" gutterBottom>
                ✗ Avoid
              </Typography>
              <List dense>
                <ListItem>• Vague or overly broad descriptions</ListItem>
                <ListItem>• Technical jargon without context</ListItem>
                <ListItem>• Multiple concepts at once</ListItem>
                <ListItem>• Missing core value proposition</ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          Example Concepts
        </Typography>
        
        <Grid container spacing={2}>
          {examples.map((category) => (
            <Grid item xs={12} md={4} key={category.title}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {category.icon}
                  <Typography variant="subtitle2">{category.title}</Typography>
                </Box>
                <List dense>
                  {category.examples.map((example) => (
                    <ListItem key={example} sx={{ pl: 0 }}>
                      <Typography variant="body2" color="text.secondary">
                        • {example}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Got it</Button>
      </DialogActions>
    </Dialog>
  );
};

const Sidebar = ({ onGenerate, isLoading, width }) => {
  const [concept, setConcept] = useState('');
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [openPersonaDialog, setOpenPersonaDialog] = useState(false);
  const [conceptGuideOpen, setConceptGuideOpen] = useState(false);

  const handleGenerate = () => {
    if (!concept || selectedPersonas.length === 0) return;
    onGenerate({
      feedbackContent: concept,
      selectedPersonas: selectedPersonas
    });
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: width,
      display: 'flex', 
      flexDirection: 'column', 
      gap: 3,
      overflow: 'hidden'
    }}>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h6" noWrap>
            Research Lab
          </Typography>
          <Tooltip title="Get AI-powered feedback from diverse digital personas in minutes">
            <HelpIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Get instant feedback on your concept from our AI-powered digital twins
        </Typography>
        
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            • Describe your product, service, or idea below
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • Select relevant personas for targeted feedback
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • Receive personalized insights and recommendations
          </Typography>
        </Stack>
      </Box>

      <Divider />

      {/* Concept Input */}
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
            Your Concept
          </Typography>
          <Tooltip title="View concept guide and examples">
            <IconButton 
              size="small" 
              onClick={() => setConceptGuideOpen(true)}
              sx={{ color: 'primary.main' }}
            >
              <HelpOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Describe your product, service, or idea that needs evaluation..."
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
        />
        <ConceptGuideDialog 
          open={conceptGuideOpen}
          onClose={() => setConceptGuideOpen(false)}
        />
      </Box>

      {/* Selected Personas Summary */}
      <Box sx={{ minWidth: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setOpenPersonaDialog(true)}
          startIcon={<Psychology />}
          sx={{ mb: 1 }}
        >
          Select Digital Twins ({selectedPersonas.length})
        </Button>
        
        {selectedPersonas.length > 0 && (
          <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Stack 
              direction="row" 
              spacing={1} 
              flexWrap="wrap" 
              gap={1}
              sx={{ minWidth: 0 }}
            >
              {selectedPersonas.map(id => {
                const persona = personasData.find(p => p.id === id);
                return (
                  <Chip
                    key={id}
                    label={persona.name}
                    size="small"
                    onDelete={() => {
                      setSelectedPersonas(prev => prev.filter(p => p !== id));
                    }}
                  />
                );
              })}
            </Stack>
          </Paper>
        )}
      </Box>

      {/* Generate Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleGenerate}
        disabled={isLoading || selectedPersonas.length === 0 || !concept}
        sx={{ 
          mt: 'auto',
          py: 1.5, 
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem'
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Analysis'}
      </Button>

      <PersonaSelectionDialog
        open={openPersonaDialog}
        onClose={() => setOpenPersonaDialog(false)}
        selectedPersonas={selectedPersonas}
        onPersonasChange={setSelectedPersonas}
      />
    </Box>
  );
};

export default Sidebar;
