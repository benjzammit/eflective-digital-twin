// src/App.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Alert, 
  Snackbar 
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AboutPage from './pages/AboutPage';
import PersonasPage from './pages/PersonasPage';
import ResearchLabPage from './pages/ResearchLabPage';
import UseCasesPage from './pages/UseCasesPage';
import ErrorBoundary from './components/ErrorBoundary';
import personasData from './data/personas.json';
import { generateDigitalTwinFeedback, generateOverallAnalysis } from './services/openai';

console.log('Personas data:', personasData); 

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackData, setFeedbackData] = useState({
    individualFeedback: {},
    overallAnalysis: '',
  });

  const handleGenerate = async ({ feedbackContent, responseType, selectedPersonas }) => {
    if (!feedbackContent || selectedPersonas.length === 0) {
      setError('Please enter feedback content and select at least one persona.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting feedback generation with:', {
        feedbackContent,
        responseType,
        selectedPersonas
      });

      const results = await Promise.all(
        selectedPersonas.map(async (personaId) => {
          const persona = personasData.find(p => p.id === personaId);
          if (!persona) {
            throw new Error(`Persona not found for ID: ${personaId}`);
          }
          const feedback = await generateDigitalTwinFeedback(feedbackContent, persona, responseType);
          return [personaId, { ...feedback, name: persona.name }];
        })
      );

      const newFeedback = Object.fromEntries(results);
      console.log('Individual feedback generated:', newFeedback);
      
      const overallAnalysis = await generateOverallAnalysis(newFeedback);
      console.log('Overall analysis generated:', overallAnalysis);
      
      setFeedbackData({
        individualFeedback: newFeedback,
        overallAnalysis,
      });
    } catch (err) {
      console.error('Error in handleGenerate:', err);
      setError(err.message || 'Failed to generate feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router basename="/">
      <MainLayout onGenerate={handleGenerate} isLoading={isLoading} feedbackData={feedbackData} overallAnalysis={feedbackData.overallAnalysis}>
        <ErrorBoundary>
          <Routes>
            <Route 
              path="/" 
              element={
                <ResearchLabPage 
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  feedbackData={feedbackData}
                />
              } 
            />
            <Route 
              path="/research-lab" 
              element={
                <ResearchLabPage 
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  feedbackData={feedbackData}
                />
              } 
            />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </ErrorBoundary>
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </MainLayout>
    </Router>
  );
}

export default App;
