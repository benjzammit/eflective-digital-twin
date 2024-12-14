import React from 'react';
import { Box, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 48;
const SIDEBAR_WIDTH = 380;

const MainLayout = ({ 
  children, 
  onGenerate, 
  loadingPersonas,
  isOverallAnalysisLoading 
}) => {
  const location = useLocation();
  const showSidebar = location.pathname === '/research-lab';
  const isLoading = location.pathname === '/research-lab' && (
    Object.keys(loadingPersonas || {}).some(key => loadingPersonas[key]) || 
    isOverallAnalysisLoading
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: 1,
          mt: `${HEADER_HEIGHT}px`,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        {showSidebar && (
          <Paper
            elevation={4}
            sx={{
              width: SIDEBAR_WIDTH,
              flexShrink: 0,
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              position: 'fixed',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 0,
              zIndex: 1200,
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Sidebar 
                width={SIDEBAR_WIDTH}
                onGenerate={onGenerate}
                isLoading={isLoading}
              />
            </Box>
          </Paper>
        )}
        <Box
          sx={{
            flex: 1,
            ml: showSidebar ? `${SIDEBAR_WIDTH}px` : 0,
            transition: 'margin-left 0.3s ease',
            width: showSidebar ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;