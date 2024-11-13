// src/App.js
import React, { useState } from 'react';
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
  const [feedbackData, setFeedbackData] = useState({
    responses: [],
    overallAnalysis: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async ({ feedbackContent, responseType, selectedPersonas }) => {
    setIsLoading(true);
    try {
      // Get all selected personas' full data
      const selectedPersonasData = selectedPersonas.map(id => 
        personasData.find(p => p.id === id)
      ).filter(Boolean);
      
      if (selectedPersonasData.length === 0) {
        throw new Error('Please select at least one persona');
      }

      // Generate feedback for each selected persona
      const responses = await Promise.all(
        selectedPersonasData.map(persona => 
          generateDigitalTwinFeedback(feedbackContent, persona, responseType)
        )
      );
      
      // Generate overall analysis with all responses
      const analysis = await generateOverallAnalysis(responses);
      
      setFeedbackData({
        responses,
        overallAnalysis: analysis
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <ErrorBoundary>
        <MainLayout onGenerate={handleGenerate} isLoading={isLoading} feedbackData={feedbackData}>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/research-lab" element={
              <ResearchLabPage 
                onGenerate={handleGenerate}
                isLoading={isLoading}
                feedbackData={feedbackData}
              />
            } />
            <Route path="/use-cases" element={<UseCasesPage />} />
          </Routes>
        </MainLayout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
