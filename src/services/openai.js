import OpenAI from 'openai';

// Check if API key exists
if (!process.env.REACT_APP_OPENAI_API_KEY) {
  console.error('OpenAI API key is missing! Make sure REACT_APP_OPENAI_API_KEY is set in your .env file');
}

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // TEMPORARY: Move to backend in production!
});

const createPersonaContext = (persona) => {
  return `
${persona.name} is a ${persona.age}-year-old ${persona.occupation} based in ${persona.location}. 

They have traits such as ${Object.entries(persona.personality_traits)
    .map(([trait, level]) => `${trait.toLowerCase()} (${level.toLowerCase()})`)
    .join(', ')}.

They value ${persona.values_and_beliefs.value_priorities.join(', ')}, with an environmental concern rated at ${persona.values_and_beliefs.environmental_concern} out of 5. Social responsibility is also rated at ${persona.values_and_beliefs.social_responsibility}.

Their shopping preferences include ${persona.consumer_behavior.shopping_preferences.join(', ')}, with decisions influenced by price (${persona.consumer_behavior.purchase_factors.price}/5), quality (${persona.consumer_behavior.purchase_factors.quality}/5), brand reputation (${persona.consumer_behavior.purchase_factors.brand_reputation}/5), sustainability (${persona.consumer_behavior.purchase_factors.sustainability}/5), and customer service (${persona.consumer_behavior.purchase_factors.customer_service}/5).

They use devices like ${persona.technology_usage.devices_owned.join(', ')}, spend about ${persona.technology_usage.internet_usage_hours} hours online daily, and engage in activities like ${persona.technology_usage.primary_online_activities.join(', ')}.
`;
};

const DETAILED_PROMPT_TEMPLATE = (persona, feedbackContent) => `
As ${persona.name}, provide a detailed analysis of the following concept:

${createPersonaContext(persona)}

**Concept to analyze:** "${feedbackContent}"

Respond in JSON format with clear, specific, and actionable insights:

{
  "personaName": "${persona.name}",
  "age": ${persona.age},
  "location": "${persona.location}",
  "occupation": "${persona.occupation}",
  "trait": "${persona.trait}",
  "sentiment": "positive/neutral/negative",
  "confidence": <number 0-100>,
  "summary": "<one-line summary of the reaction in first person>",
  "keyPoints": [
    "<Specific and relevant key point 1>",
    "<Specific and relevant key point 2>",
    "<Specific and relevant key point 3>"
  ],
  "analysis": "<Detailed analysis in first person, including specific examples, concerns, and actionable insights>",
  "recommendations": [
    "<Actionable recommendation 1 with specific examples>",
    "<Actionable recommendation 2 with specific examples>",
    "<Actionable recommendation 3 with specific examples>"
  ],
  "marketPotential": "low/medium/high",
  "riskFactors": "low/medium/high",
  "targetAudience": "<Specific audience description>",
  "implementationConsiderations": "<Challenges, opportunities, and examples for implementation>",
  "interestLevel": <number 0-100>,
  "adoptionLikelihood": <number 0-100>,
  "priceSensitivity": <number 0-100>,
  "socialImpact": <number 0-100>
}
`;

const QUICK_PROMPT_TEMPLATE = (persona, feedbackContent) => `
As ${persona.name}, provide a quick and concise reaction to the following concept:

${createPersonaContext(persona)}

**Concept to analyze:** "${feedbackContent}"

Respond in JSON format:

{
  "personaName": "${persona.name}",
  "age": ${persona.age},
  "location": "${persona.location}",
  "occupation": "${persona.occupation}",
  "trait": "${persona.trait}",
  "sentiment": "positive/neutral/negative",
  "confidence": <number 0-100>,
  "summary": "<One-line quick reaction in first person>",
  "pros": [
    "<Specific pro 1>",
    "<Specific pro 2>",
    "<Specific pro 3>"
  ],
  "cons": [
    "<Specific con 1>",
    "<Specific con 2>"
  ],
  "interestLevel": "low/medium/high",
  "adoptionLikelihood": "low/medium/high",
  "priceSensitivity": "low/medium/high",
  "socialImpact": "low/medium/high"
}
`;

const OVERALL_ANALYSIS_TEMPLATE = `As an expert analyst, provide a comprehensive analysis of multiple persona feedback responses. 
Focus on identifying patterns, consensus, and divergent views.

Return a detailed JSON response in this exact format:
{
  "overallSentiment": "positive/neutral/negative",
  "confidenceScore": <number 0-100>,
  "responseRate": <number 0-100>,
  "sentimentBreakdown": {
    "Positive": <percentage>,
    "Neutral": <percentage>,
    "Negative": <percentage>
  },
  "keyInsights": "<2-3 sentence executive summary>",
  "keyThemes": [
    "<recurring theme with specific example>",
    "<recurring theme with specific example>",
    "<recurring theme with specific example>"
  ],
  "recommendations": [
    "<specific actionable recommendation with reasoning>",
    "<specific actionable recommendation with reasoning>",
    "<specific actionable recommendation with reasoning>"
  ],
  "riskFactors": [
    "<specific risk factor with mitigation strategy>",
    "<specific risk factor with mitigation strategy>",
    "<specific risk factor with mitigation strategy>"
  ],
  "consensusPoints": [
    "<point of agreement across personas with example>",
    "<point of agreement across personas with example>"
  ],
  "divergentViews": [
    "<specific differing perspective with persona context>",
    "<specific differing perspective with persona context>"
  ]
}`;

export const generateDigitalTwinFeedback = async (content, persona, type) => {
  try {
    const prompt = type === 'detailed' ? DETAILED_PROMPT_TEMPLATE(persona, content) : QUICK_PROMPT_TEMPLATE(persona, content);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that MUST respond with valid JSON only. No additional text before or after the JSON object is allowed."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const result = response.choices[0].message.content.trim();
    
    try {
      const parsedResult = JSON.parse(result);
      // Ensure numeric metrics are within 0-100 range
      return {
        ...parsedResult,
        interestLevel: Math.min(100, Math.max(0, parsedResult.interestLevel || 50)),
        adoptionLikelihood: Math.min(100, Math.max(0, parsedResult.adoptionLikelihood || 50)),
        priceSensitivity: Math.min(100, Math.max(0, parsedResult.priceSensitivity || 50)),
        socialImpact: Math.min(100, Math.max(0, parsedResult.socialImpact || 50)),
        sentimentScore: calculateSentimentScore(parsedResult.sentiment),
        confidence: response.choices[0].finish_reason === 'stop' ? 85 : 70
      };
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', result);
      // Provide default values if parsing fails
      return {
        personaName: persona.name,
        sentiment: "neutral",
        analysis: "Analysis unavailable due to processing error",
        keyPoints: [],
        recommendations: [],
        interestLevel: 50,
        adoptionLikelihood: 50,
        priceSensitivity: 50,
        socialImpact: 50,
        sentimentScore: 50,
        confidence: 70
      };
    }
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};

// Helper function to calculate sentiment score
const calculateSentimentScore = (sentiment) => {
  switch(sentiment?.toLowerCase()) {
    case 'positive':
      return Math.floor(Math.random() * (95 - 75) + 75); // 75-95
    case 'negative':
      return Math.floor(Math.random() * (45 - 25) + 25); // 25-45
    case 'neutral':
      return Math.floor(Math.random() * (74 - 46) + 46); // 46-74
    default:
      return 50;
  }
};

const generateOverallAnalysis = async (responses) => {
  try {
    // Clean and validate the responses before processing
    const cleanedResponses = responses.map(response => {
      // Ensure all fields are properly formatted
      return {
        personaName: response.personaName,
        sentiment: response.sentiment,
        summary: response.summary,
        keyPoints: Array.isArray(response.keyPoints) ? response.keyPoints : [],
        recommendations: Array.isArray(response.recommendations) ? response.recommendations : []
      };
    });

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: OVERALL_ANALYSIS_TEMPLATE
        },
        {
          role: "user",
          content: JSON.stringify(cleanedResponses, null, 2)
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(analysis.choices[0].message.content.trim());
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      // Attempt to clean the response and parse again
      const cleanedContent = analysis.choices[0].message.content
        .replace(/^[^{]*/, '') // Remove any text before the first '{'
        .replace(/[^}]*$/, ''); // Remove any text after the last '}'
      try {
        parsedAnalysis = JSON.parse(cleanedContent);
      } catch (secondParseError) {
        console.error("Error parsing cleaned OpenAI response:", secondParseError);
        // If parsing fails again, return a default structure
        return {
          overallSentiment: "neutral",
          confidenceScore: 70,
          responseRate: 100,
          sentimentBreakdown: {
            Positive: 33,
            Neutral: 34,
            Negative: 33
          },
          keyInsights: "Unable to generate insights due to processing error",
          keyThemes: [],
          recommendations: [],
          riskFactors: [],
          consensusPoints: [],
          divergentViews: []
        };
      }
    }

    return parsedAnalysis;
  } catch (error) {
    console.error("Error generating overall analysis:", error);
    throw error;
  }
};

export { generateOverallAnalysis };