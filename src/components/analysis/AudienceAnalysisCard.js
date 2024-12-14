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
  Divider
} from '@mui/material';
import {
  Block,
  TouchApp,
  Campaign,
  Group,
  AttachMoney,
  InterestsTwoTone
} from '@mui/icons-material';

const AudienceAnalysisCard = ({ audience }) => {
  const { segment, barriers, triggers, messages } = audience;

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Target Segment
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip icon={<Group />} label={segment.age_range} />
            <Chip icon={<AttachMoney />} label={segment.income_level} />
            <Chip icon={<InterestsTwoTone />} label={segment.occupation_type} />
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {segment.interests.map((interest, idx) => (
              <Chip
                key={idx}
                label={interest}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <List dense>
          {barriers.map((barrier, idx) => (
            <ListItem key={`barrier-${idx}`}>
              <ListItemIcon>
                <Block color={barrier.severity === 'high' ? 'error' : 'action'} />
              </ListItemIcon>
              <ListItemText 
                primary={barrier.issue}
                secondary={`Severity: ${barrier.severity}`}
              />
            </ListItem>
          ))}

          {triggers.map((trigger, idx) => (
            <ListItem key={`trigger-${idx}`}>
              <ListItemIcon>
                <TouchApp color={trigger.effectiveness === 'high' ? 'success' : 'action'} />
              </ListItemIcon>
              <ListItemText 
                primary={trigger.motivation}
                secondary={`Effectiveness: ${trigger.effectiveness}`}
              />
            </ListItem>
          ))}

          {messages.map((message, idx) => (
            <ListItem key={`message-${idx}`}>
              <ListItemIcon>
                <Campaign color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={message.content}
                secondary={`Channel: ${message.channel} | CTA: ${message.call_to_action}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AudienceAnalysisCard; 