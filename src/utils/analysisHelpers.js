export const calculateAverageMetrics = (responses) => {
  if (!responses.length) return {
    sentiment: 0,
    interest: 0,
    adoption: 0,
    price: 0,
    social: 0
  };
  
  const totals = responses.reduce((acc, response) => ({
    sentiment: acc.sentiment + (response.detailed.sentimentScore || 0),
    interest: acc.interest + (response.detailed.interestLevel || 0),
    adoption: acc.adoption + (response.detailed.adoptionLikelihood || 0),
    price: acc.price + (response.detailed.priceSensitivity || 0),
    social: acc.social + (response.detailed.socialImpact || 0)
  }), { sentiment: 0, interest: 0, adoption: 0, price: 0, social: 0 });

  return Object.entries(totals).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: Math.round(value / responses.length)
  }), {});
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