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
    overallAnalysis: {
      overallSentiment: '',
      confidenceScore: 0,
      responseRate: 0,
      sentimentBreakdown: {},
      keyInsights: '',
      keyThemes: [],
      recommendations: [],
      riskFactors: [],
      consensusPoints: [],
      divergentViews: []
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async ({ feedbackContent, selectedPersonas }) => {
    setIsLoading(true);
    setFeedbackData({ responses: [], overallAnalysis: {
      overallSentiment: '',
      confidenceScore: 0,
      responseRate: 0,
      sentimentBreakdown: {},
      keyInsights: '',
      keyThemes: [],
      recommendations: [],
      riskFactors: [],
      consensusPoints: [],
      divergentViews: []
    } });

    try {
      const selectedPersonasData = selectedPersonas.map(id => 
        personasData.find(p => p.id === id)
      ).filter(Boolean);
      
      console.log('Selected Personas:', selectedPersonasData);

      if (selectedPersonasData.length === 0) {
        throw new Error('Please select at least one persona');
      }

      const allResponses = await Promise.all(
        selectedPersonasData.map(async persona => {
          const detailed = await generateDigitalTwinFeedback(feedbackContent, persona, 'detailed');
          
          return {
            detailed: { ...detailed, persona: persona }
          };
        })
      );
      
      console.log('All Responses:', allResponses);

      const analysis = await generateOverallAnalysis(
        allResponses.map(r => r.detailed)
      );
      
      setFeedbackData({
        responses: allResponses,
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
          <main>
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
          </main>
        </MainLayout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
