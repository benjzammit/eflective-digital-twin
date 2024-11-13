import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 48;
const SIDEBAR_WIDTH = '30%';

const MainLayout = ({ children, onGenerate, isLoading, feedbackData, overallAnalysis }) => {
  const theme = useTheme();
  const location = useLocation();
  const isResearchLabPage = location.pathname === '/research-lab' || location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box 
        sx={{ 
          display: 'flex', 
          flex: 1,
          mt: `${HEADER_HEIGHT}px`,
          mb: `${FOOTER_HEIGHT}px`
        }}
      >
        {/* Only render Sidebar on Research Lab page */}
        {isResearchLabPage && (
          <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
            <Sidebar 
              onGenerate={onGenerate} 
              isLoading={isLoading} 
              width={SIDEBAR_WIDTH}
            />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'grey.50',
            overflow: 'auto',
            width: isResearchLabPage ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%'
          }}
        >
          {children}
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: FOOTER_HEIGHT,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Reflective. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;