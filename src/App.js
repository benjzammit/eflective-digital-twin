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
    const startTime = performance.now();
    console.log('Starting generation with:', { 
      contentLength: feedbackContent.length,
      selectedPersonas 
    });

    if (!feedbackContent || selectedPersonas.length === 0) {
      console.error('Missing required inputs');
      return;
    }

    // Reset states
    setFeedbackData({ responses: [], overallAnalysis: null });
    console.log('States reset');
    
    // Initialize loading states
    const initialLoadingState = selectedPersonas.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
    setLoadingPersonas(initialLoadingState);
    console.log('Loading states initialized:', initialLoadingState);

    try {
      const selectedPersonasData = selectedPersonas
        .map(id => personasData.find(p => p.id === id))
        .filter(Boolean);
      console.log('Selected personas data:', selectedPersonasData);

      // Process personas in parallel
      console.log('Starting parallel persona processing...');
      const personaPromises = selectedPersonasData.map(async (persona, index) => {
        console.log(`Processing persona ${persona.name} (${index + 1}/${selectedPersonasData.length})`);
        try {
          const detailed = await generateDigitalTwinFeedback(feedbackContent, persona, 'detailed');
          console.log(`Completed processing for ${persona.name}`);
          
          setFeedbackData(prev => {
            const newResponses = [...prev.responses];
            newResponses[index] = {
              detailed: {
                ...detailed,
                persona: persona
              }
            };
            return { ...prev, responses: newResponses };
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

      try {
        console.log('Starting overall analysis...');
        setIsOverallAnalysisLoading(true);
        
        const completedResponses = await Promise.all(personaPromises);
        console.log('All persona responses completed:', completedResponses);
        
        const validResponses = completedResponses.filter(Boolean);
        console.log('Valid responses for analysis:', validResponses.length);
        
        if (validResponses.length > 0) {
          console.log('Generating overall analysis...');
          const overallAnalysis = await generateOverallAnalysis(validResponses);
          console.log('Overall analysis generated:', overallAnalysis);
          
          setFeedbackData(prev => ({
            ...prev,
            overallAnalysis
          }));
        } else {
          console.warn('No valid responses available for overall analysis');
        }
      } catch (error) {
        console.error('Error in overall analysis:', error);
      } finally {
        setIsOverallAnalysisLoading(false);
        console.log('Overall analysis process completed');
      }
    } catch (error) {
      console.error('Error in generate process:', error);
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
