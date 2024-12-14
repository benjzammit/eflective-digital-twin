// src/App.js
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ResearchLabPage from './pages/ResearchLabPage';
import AboutPage from './pages/AboutPage';
import PersonasPage from './pages/PersonasPage';
import UseCasesPage from './pages/UseCasesPage';
import { generateDigitalTwinFeedback, generateOverallAnalysis } from './services/openai';
import personasData from './data/personas.json';
import { theme } from './theme/theme';
import PersonaResultCard from './components/PersonaResultCard';

console.log('Personas data:', personasData); 

function App() {
  const [feedbackData, setFeedbackData] = useState({
    responses: [],
    overallAnalysis: null
  });
  const [loadingPersonas, setLoadingPersonas] = useState({});
  const [isOverallAnalysisLoading, setIsOverallAnalysisLoading] = useState(false);

  const handleGenerate = async ({ feedbackContent, selectedPersonas }) => {
    console.log('=== Generation Started ===');
    console.log('Inputs:', { feedbackContent, selectedPersonas });
    const startTime = performance.now();
    
    if (!feedbackContent || selectedPersonas.length === 0) {
      console.error('Missing required inputs');
      return;
    }

    // Reset states
    setFeedbackData({ responses: [], overallAnalysis: null });
    setIsOverallAnalysisLoading(true);
    
    // Initialize loading states
    const initialLoadingState = selectedPersonas.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
    setLoadingPersonas(initialLoadingState);

    try {
      const selectedPersonasData = selectedPersonas
        .map(id => personasData.find(p => p.id === id))
        .filter(Boolean);
      
      console.log('Selected Personas Data:', selectedPersonasData);
      const responseMap = new Map();

      // Process personas in parallel
      const personaPromises = selectedPersonasData.map(async (persona) => {
        try {
          console.log(`Starting analysis for persona: ${persona.name}`);
          const detailed = await generateDigitalTwinFeedback(feedbackContent, persona, 'detailed');
          console.log(`Received feedback for ${persona.name}:`, detailed);
          
          // Update the responses immediately when each one completes
          setFeedbackData(prev => {
            const newResponse = {
              detailed: {
                ...detailed,
                persona: persona
              }
            };
            
            responseMap.set(persona.id, newResponse);
            const orderedResponses = selectedPersonas
              .map(id => responseMap.get(id))
              .filter(Boolean);

            return { ...prev, responses: orderedResponses };
          });
          
          setLoadingPersonas(prev => ({
            ...prev,
            [persona.id]: false
          }));
          
          return detailed;
        } catch (error) {
          console.error(`Error processing persona ${persona.name}:`, error);
          return null;
        }
      });

      // Wait for all promises to complete
      const responses = await Promise.all(personaPromises);
      console.log('=== All Responses Completed ===');
      console.log('Final Response Map:', Object.fromEntries(responseMap));
      
      // Generate overall analysis
      console.log('Starting overall analysis generation');
      const overallAnalysis = await generateOverallAnalysis(responses);
      console.log('Overall Analysis:', overallAnalysis);
      
      setFeedbackData(prev => ({
        ...prev,
        overallAnalysis
      }));
      
      setIsOverallAnalysisLoading(false);
      console.log('Time taken:', performance.now() - startTime, 'ms');
      
    } catch (error) {
      console.error('Error in handleGenerate:', error);
      setIsOverallAnalysisLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout 
          onGenerate={handleGenerate}
          loadingPersonas={loadingPersonas}
          isOverallAnalysisLoading={isOverallAnalysisLoading}
        >
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/research-lab" element={
              <ResearchLabPage 
                onGenerate={handleGenerate}
                feedbackData={feedbackData}
                loadingPersonas={loadingPersonas}
                isOverallAnalysisLoading={isOverallAnalysisLoading}
              />
            } />
            <Route path="/use-cases" element={<UseCasesPage />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
