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

const DETAILED_PROMPT_TEMPLATE = (persona, feedbackContent) => {
  // Safely extract values with defaults
  const values = persona.values || [];
  const shoppingPreferences = persona.consumer_behavior?.shopping_preferences || [];
  const purchaseFactors = persona.consumer_behavior?.purchase_factors || {};
  const experience = persona.additional_insights?.exceptional_experience || '';

  return `
Embody ${persona.name} completely. You are a ${persona.age}-year-old ${persona.occupation} living in ${persona.location}. Consider your unique perspective:

- Income: ${persona.income_range || 'Undisclosed'}
- Shopping habits: ${shoppingPreferences.join(', ') || 'Various retailers'}
- Purchase priorities: Quality (${purchaseFactors.quality || 3}/5), Price (${purchaseFactors.price || 3}/5)
- Life experience: ${experience || 'Values quality service and community impact'}

Analyze this concept authentically as yourself: "${feedbackContent}"

Consider:
- Your shopping preferences: ${shoppingPreferences.join(' and ') || 'Various preferences'}
- Your typical spending habits
- Your community involvement
- Your daily routine and lifestyle

Respond in JSON format while maintaining your genuine voice and personality:

{
  "personaName": "${persona.name}",
  "age": ${persona.age},
  "location": "${persona.location}",
  "occupation": "${persona.occupation}",
  "sentiment": "positive/neutral/negative",
  "confidence": <number 0-100>,
  "summary": "<express your genuine, personal reaction using 'I' statements, mentioning specific aspects that matter to you based on your background>",
  "keyPoints": [
    "<share a specific observation based on your personal experience>",
    "<express a concern or opportunity you see from your perspective>",
    "<relate this to your daily life or professional experience>"
  ],
  "recommendations": [
    "<suggest an improvement that would matter to you personally>",
    "<recommend a change based on your values and lifestyle>",
    "<propose an enhancement that would benefit your community>"
  ],
  "interestLevel": <number 0-100>,
  "adoptionLikelihood": <number 0-100>,
  "priceSensitivity": <number 0-100>,
  "socialImpact": <number 0-100>
}

Remember to express yourself naturally while considering your background, values, and life experiences.`;
};

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

const OVERALL_ANALYSIS_TEMPLATE = `Analyze multiple persona feedback responses and provide a targeted, actionable summary in JSON format.

JSON Response Format:
{
  "key_metrics": {
    "overall_sentiment": "<percentage>% <positive/neutral/negative>",
    "average_interest": "<percentage>%",
    "adoption_rate": "<percentage>%",
    "context": "<One sentence explaining the metric implications>"
  },
  "key_insights": [
    {
      "persona": "<persona name>",
      "insight": "<One specific, actionable insight>",
      "impact": "high/medium/low"
    }
  ],
  "recommendations": [
    {
      "action": "<Specific action step>",
      "expected_impact": "<Expected outcome>",
      "difficulty": "easy/medium/hard",
      "timeframe": "immediate/short-term/long-term"
    }
  ],
  "audiences": [
    {
      "segment": {
        "age_range": "<age bracket>",
        "income_level": "<income range>",
        "interests": ["<interest 1>", "<interest 2>"],
        "occupation_type": "<occupation category>"
      },
      "barriers": [
        {
          "issue": "<specific barrier>",
          "severity": "high/medium/low"
        }
      ],
      "triggers": [
        {
          "motivation": "<specific trigger>",
          "effectiveness": "high/medium/low"
        }
      ],
      "messages": [
        {
          "content": "<specific message>",
          "channel": "<communication channel>",
          "call_to_action": "<specific action>"
        }
      ]
    }
  ]}`;

export const generateDigitalTwinFeedback = async (content, persona, type) => {
  try {
    const prompt = type === 'detailed' ? 
      DETAILED_PROMPT_TEMPLATE(persona, content) : 
      QUICK_PROMPT_TEMPLATE(persona, content);

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
      temperature: 0.4,
      max_tokens: 1000
    });

    const result = response.choices[0].message.content.trim();
    
    try {
      const parsedResult = JSON.parse(result);
      const sentiment = parsedResult.sentiment || 'neutral';
      const sentimentScore = calculateSentimentScore(sentiment);

      // Ensure all required metrics are present with proper numeric values
      return {
        ...parsedResult,
        sentiment,
        sentimentScore,
        interestLevel: ensureNumericValue(parsedResult.interestLevel),
        adoptionLikelihood: ensureNumericValue(parsedResult.adoptionLikelihood),
        priceSensitivity: ensureNumericValue(parsedResult.priceSensitivity),
        socialImpact: ensureNumericValue(parsedResult.socialImpact),
        confidence: response.choices[0].finish_reason === 'stop' ? 85 : 70
      };
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', result);
      return getDefaultResponse(persona);
    }
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};

// Helper function to ensure numeric values
const ensureNumericValue = (value) => {
  if (typeof value === 'number') {
    return Math.min(100, Math.max(0, value));
  }
  // Convert string values like "high", "medium", "low" to numbers
  switch(value?.toLowerCase()) {
    case 'high': return 85;
    case 'medium': return 50;
    case 'low': return 15;
    default: return 50;
  }
};

// Default response helper
const getDefaultResponse = (persona) => ({
  personaName: persona.name,
  sentiment: "neutral",
  sentimentScore: 50,
  summary: "Analysis unavailable due to processing error",
  keyPoints: [],
  recommendations: [],
  interestLevel: 50,
  adoptionLikelihood: 50,
  priceSensitivity: 50,
  socialImpact: 50,
  confidence: 70
});

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
  console.log('Starting overall analysis generation...');
  try {
    console.log('Cleaning and validating responses...');
    const cleanedResponses = responses.map(response => ({
      personaName: response.personaName,
      sentiment: response.sentiment || 'neutral',
      sentimentScore: response.sentimentScore || 50,
      interestLevel: response.interestLevel || 0,
      adoptionLikelihood: response.adoptionLikelihood || 0,
      priceSensitivity: response.priceSensitivity || 0,
      socialImpact: response.socialImpact || 0,
      summary: response.summary || '',
      keyPoints: response.keyPoints || [],
      recommendations: response.recommendations || []
    }));
    console.log('Responses cleaned:', cleanedResponses.length);

    const promptContent = `
    Analyze these detailed persona responses and provide strategic insights:
    ${JSON.stringify(cleanedResponses, null, 2)}
    
    Follow this response format exactly:
    ${OVERALL_ANALYSIS_TEMPLATE}`;

    console.log('Sending request to OpenAI...');
    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI research analyst. Provide detailed, actionable insights based on persona feedback."
        },
        {
          role: "user",
          content: promptContent
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    console.log('Received response from OpenAI');

    let parsedAnalysis;
    try {
      console.log('Parsing analysis response...');
      parsedAnalysis = JSON.parse(analysis.choices[0].message.content.trim());
      console.log('Analysis parsed successfully');
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      throw parseError;
    }

    return parsedAnalysis;
  } catch (error) {
    console.error("Error generating overall analysis:", error);
    throw error;
  }
};

export { OVERALL_ANALYSIS_TEMPLATE, generateOverallAnalysis };