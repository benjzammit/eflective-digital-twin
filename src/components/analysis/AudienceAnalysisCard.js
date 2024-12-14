import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import {
  Group,
  AttachMoney,
  Block,
  TouchApp,
  Campaign,
  InterestsTwoTone,
  Person,
  TrendingUp,
  WbSunny,
  Message
} from '@mui/icons-material';

const AudienceAnalysisCard = ({ audience }) => {
  const { segment, barriers, triggers, messages } = audience;

  return (
    <Card sx={{ 
      mb: 2, 
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider'
    }}>
      <CardContent>
        {/* Primary Audience Section */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              fontWeight: 600,
              mb: 2
            }}
          >
            <WbSunny /> Target Audience
          </Typography>

          <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip 
                icon={<Group />} 
                label={segment.age_range}
                sx={{ 
                  bgcolor: 'white',
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
              <Chip 
                icon={<AttachMoney />} 
                label={segment.income_level}
                sx={{ 
                  bgcolor: 'white',
                  '& .MuiChip-icon': { color: 'success.main' }
                }}
              />
              <Chip 
                icon={<Person />} 
                label={segment.occupation_type}
                sx={{ 
                  bgcolor: 'white',
                  '& .MuiChip-icon': { color: 'info.main' }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {segment.interests.map((interest, idx) => (
                <Chip
                  key={idx}
                  icon={<InterestsTwoTone />}
                  label={interest}
                  size="small"
                  sx={{ 
                    bgcolor: 'white',
                    '& .MuiChip-icon': { color: 'warning.main' }
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Challenges & Opportunities */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'error.main',
              fontWeight: 600,
              mb: 2
            }}
          >
            <TrendingUp /> Challenges & Opportunities
          </Typography>

          <List dense>
            {barriers.map((barrier, idx) => (
              <ListItem 
                key={`barrier-${idx}`}
                sx={{ 
                  bgcolor: barrier.severity === 'high' ? 'error.50' : 'background.paper',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemIcon>
                  <Block color={barrier.severity === 'high' ? 'error' : 'action'} />
                </ListItemIcon>
                <ListItemText 
                  primary={barrier.issue}
                  secondary={`Severity: ${barrier.severity}`}
                  primaryTypographyProps={{
                    fontWeight: barrier.severity === 'high' ? 600 : 400
                  }}
                />
              </ListItem>
            ))}

            {triggers.map((trigger, idx) => (
              <ListItem 
                key={`trigger-${idx}`}
                sx={{ 
                  bgcolor: trigger.effectiveness === 'high' ? 'success.50' : 'background.paper',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemIcon>
                  <TouchApp color={trigger.effectiveness === 'high' ? 'success' : 'action'} />
                </ListItemIcon>
                <ListItemText 
                  primary={trigger.motivation}
                  secondary={`Effectiveness: ${trigger.effectiveness}`}
                  primaryTypographyProps={{
                    fontWeight: trigger.effectiveness === 'high' ? 600 : 400
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Marketing Messages */}
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'info.main',
              fontWeight: 600,
              mb: 2
            }}
          >
            <Message /> Marketing Strategy
          </Typography>

          <List dense>
            {messages.map((message, idx) => (
              <ListItem 
                key={`message-${idx}`}
                sx={{ 
                  bgcolor: 'info.50',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemIcon>
                  <Campaign color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary={message.content}
                  secondary={`Channel: ${message.channel} | CTA: ${message.call_to_action}`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AudienceAnalysisCard; 