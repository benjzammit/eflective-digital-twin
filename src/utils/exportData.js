import { saveAs } from 'file-saver';

export const exportFeedbackData = (feedbackData, overallAnalysis) => {
  const exportData = {
    timestamp: new Date().toISOString(),
    individualFeedback: feedbackData,
    overallAnalysis,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });

  saveAs(blob, `digital-twin-feedback-${new Date().toISOString()}.json`);
};

export const exportAsPDF = async (feedbackData, overallAnalysis) => {
  // Implementation for PDF export
  // You'll need to add a PDF library like jsPDF
};

export const exportAsCSV = (feedbackData) => {
  // Implementation for CSV export
  // You can use a library like papaparse
}; 