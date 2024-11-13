// src/components/Header.js
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton,
  useTheme,
  Tooltip,
  Avatar
} from '@mui/material';
import { 
  Psychology,
  Science,
  Group,
  Info,
  GitHub
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const HEADER_HEIGHT = 64;

const Logo = () => (
  <Box 
    component={Link} 
    to="/" 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1.5,
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: 'primary.main',
      p: 1,
      borderRadius: 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Psychology 
        sx={{ 
          fontSize: 28,
          color: 'white'
        }} 
      />
    </Box>
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 700,
        fontSize: '1.3rem',
        color: 'text.primary',
        letterSpacing: '-0.5px'
      }}
    >
      Reflective
    </Typography>
  </Box>
);

const NavButton = ({ to, icon: Icon, label, current }) => (
  <Button
    component={Link}
    to={to}
    color="inherit"
    startIcon={<Icon />}
    sx={{ 
      mx: 1,
      color: current ? 'primary.main' : 'text.primary',
      fontWeight: current ? 600 : 400,
      '&:hover': {
        backgroundColor: 'action.hover',
      }
    }}
  >
    {label}
  </Button>
);

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      to: "/research-lab",
      icon: Science,
      label: "Research Lab"
    },
    {
      to: "/use-cases",
      icon: Psychology,
      label: "Use Cases"
    },
    {
      to: "/personas",
      icon: Group,
      label: "Digital Twins"
    },
    {
      to: "/about",
      icon: Info,
      label: "About"
    }
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: HEADER_HEIGHT,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ height: '100%', px: 3, gap: 4 }}>
        <Logo />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navigationItems.map((item) => (
            <NavButton 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              current={currentPath === item.to}
            />
          ))}
        </Box>

        {/* Right-side items */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          ml: 'auto' 
        }}>
          <Tooltip title="View on GitHub">
            <IconButton 
              href="https://github.com/yourusername/reflective" 
              target="_blank"
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <GitHub />
            </IconButton>
          </Tooltip>

          <Tooltip title="Your Profile">
            <IconButton sx={{ p: 0.5 }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: `2px solid ${theme.palette.primary.main}`
                }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
