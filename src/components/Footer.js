// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const Footer = ({ onExportData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <FooterContent>
        <Box>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Digital Twin Feedback System
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by OpenAI GPT-4
          </Typography>
        </Box>

        <SocialLinks>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Connect with us:
            </Typography>
            <Typography variant="caption" color="text.secondary">
              LinkedIn, Twitter, Email
            </Typography>
          </Box>
        </SocialLinks>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
