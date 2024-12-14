import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 48;
const SIDEBAR_WIDTH = '30%';

const MainLayout = ({ 
  children, 
  onGenerate, 
  loadingPersonas,
  isOverallAnalysisLoading 
}) => {
  const location = useLocation();
  
  const showSidebar = location.pathname === '/research-lab';

  // Get loading states from the URL parameters
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
          <Sidebar 
            width={SIDEBAR_WIDTH} 
            onGenerate={onGenerate}
            isLoading={isLoading}
          />
        )}
        <Box
          sx={{
            flex: 1,
            width: showSidebar ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%',
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;