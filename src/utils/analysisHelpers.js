export const calculateAverageMetrics = (responses) => {
  if (!responses.length) return {
    overall_sentiment: '0% neutral',
    average_interest: '0%',
    adoption_rate: '0%'
  };
  
  const totals = responses.reduce((acc, response) => ({
    sentiment: acc.sentiment + (response.detailed.sentimentScore || 0),
    interest: acc.interest + (response.detailed.interestLevel || 0),
    adoption: acc.adoption + (response.detailed.adoptionLikelihood || 0)
  }), { sentiment: 0, interest: 0, adoption: 0 });

  const averages = {
    overall_sentiment: `${Math.round(totals.sentiment / responses.length)}% ${getSentimentLabel(totals.sentiment / responses.length)}`,
    average_interest: `${Math.round(totals.interest / responses.length)}%`,
    adoption_rate: `${Math.round(totals.adoption / responses.length)}%`
  };

  return averages;
};

const getSentimentLabel = (score) => {
  if (score >= 75) return 'positive';
  if (score <= 45) return 'negative';
  return 'neutral';
};

export const findTopPersonas = (responses) => {
  return responses
    .map(response => ({
      name: response.detailed.personaName,
      score: (
        (response.detailed.interestLevel || 0) +
        (response.detailed.adoptionLikelihood || 0) +
        (100 - (response.detailed.priceSensitivity || 0))
      ) / 3,
      sentiment: response.detailed.sentiment,
      persona: response.detailed.persona
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}; 