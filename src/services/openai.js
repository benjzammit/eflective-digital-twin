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
Background:
- Name: ${persona.name} (${persona.age} years old)
- Title: ${persona.title}
- Location: ${persona.location}
- Occupation: ${persona.occupation}
- Education: ${persona.education}
- Income: ${persona.income}

Personality & Values:
- Personality: ${Object.entries(persona.personality_traits)
    .map(([trait, level]) => `${trait}: ${level}`)
    .join(', ')}
- Values: ${persona.values_and_beliefs.value_priorities.join(', ')}
- Environmental Concern: ${persona.values_and_beliefs.environmental_concern}/5
- Social Responsibility: ${persona.values_and_beliefs.social_responsibility}

Consumer Behavior:
- Shopping Preferences: ${persona.consumer_behavior.shopping_preferences.join(', ')}
- Purchase Factors:
  * Price: ${persona.consumer_behavior.purchase_factors.price}/5
  * Quality: ${persona.consumer_behavior.purchase_factors.quality}/5
  * Brand Reputation: ${persona.consumer_behavior.purchase_factors.brand_reputation}/5
  * Sustainability: ${persona.consumer_behavior.purchase_factors.sustainability}/5
  * Customer Service: ${persona.consumer_behavior.purchase_factors.customer_service}/5
- Online Shopping: ${persona.consumer_behavior.online_shopping_frequency}

Technology Usage:
- Adoption Level: ${persona.technology_usage.adoption_of_technology}
- Devices: ${persona.technology_usage.devices_owned.join(', ')}
- Internet Usage: ${persona.technology_usage.internet_usage_hours} daily
- Activities: ${persona.technology_usage.primary_online_activities.join(', ')}

Additional Insights:
- Communication Style: ${persona.communication_style.preferred_channels.join(', ')}
- Decision Making: ${persona.behavioral_patterns.decision_making_style}
- Brand Loyalty: ${persona.behavioral_patterns.brand_loyalty}
`;
};

const DETAILED_PROMPT_TEMPLATE = (persona, feedbackContent) => `
You are ${persona.name}, analyzing the following concept based on your detailed persona:

${createPersonaContext(persona)}

Analyze this concept:
"${feedbackContent}"

Provide a detailed analysis in the following JSON structure:
{
  "sentiment": "positive/neutral/negative",
  "confidence": <number between 0-100>,
  "keyPoints": [
    "<key point 1>",
    "<key point 2>",
    "<key point 3>"
  ],
  "analysis": "<detailed paragraph analysis from your perspective>",
  "recommendations": [
    "<recommendation 1>",
    "<recommendation 2>",
    "<recommendation 3>"
  ],
  "responseType": "detailed"
}

Ensure your analysis reflects your persona's characteristics, values, and behavior patterns.`;

const QUICK_SUMMARY_PROMPT_TEMPLATE = (persona, feedbackContent) => `
You are ${persona.name}, providing a quick reaction to the following concept based on your persona:

${createPersonaContext(persona)}

Quick analysis of:
"${feedbackContent}"

Respond in the following JSON structure:
{
  "sentiment": "positive/neutral/negative",
  "summary": "<1-2 sentence summary of your reaction>",
  "pros": [
    "<pro point 1>",
    "<pro point 2>",
    "<pro point 3>"
  ],
  "cons": [
    "<con point 1>",
    "<con point 2>"
  ],
  "responseType": "quick"
}

Ensure your response reflects your persona's characteristics, values, and behavior patterns.`;

export const generateDigitalTwinFeedback = async (feedbackContent, persona, responseType) => {
  try {
    // Validate inputs
    if (!feedbackContent) {
      throw new Error('Feedback content is required');
    }
    if (!persona) {
      throw new Error('Persona is required');
    }
    if (!responseType) {
      throw new Error('Response type is required');
    }

    console.log('Generating feedback with:', {
      feedbackContent,
      personaName: persona.name,
      responseType
    });

    const promptTemplate = responseType === 'detailed' 
      ? DETAILED_PROMPT_TEMPLATE(persona, feedbackContent)
      : QUICK_SUMMARY_PROMPT_TEMPLATE(persona, feedbackContent);

    console.log('Using prompt template:', promptTemplate);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI that provides feedback from the perspective of specific personas. Always maintain the persona's viewpoint and characteristics in your analysis. Ensure your response is in valid JSON format."
        },
        {
          role: "user",
          content: promptTemplate
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('OpenAI response:', completion.choices[0].message.content);

    const parsedResponse = JSON.parse(completion.choices[0].message.content);
    return parsedResponse;

  } catch (error) {
    console.error('Detailed error in generateDigitalTwinFeedback:', {
      error: error.message,
      stack: error.stack,
      feedbackContent,
      personaName: persona?.name,
      responseType
    });
    
    // Throw a more specific error
    if (error.message.includes('API key')) {
      throw new Error('OpenAI API key error. Please check your configuration.');
    }
    if (error.message.includes('rate limit')) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw error;
  }
};

export const generateOverallAnalysis = async (individualFeedback) => {
  try {
    // Validate input
    if (!individualFeedback || Object.keys(individualFeedback).length === 0) {
      throw new Error('Individual feedback is required');
    }

    console.log('Generating overall analysis for feedback:', individualFeedback);

    const feedbackSummary = Object.values(individualFeedback)
      .map(f => `${f.name}: ${f.sentiment} sentiment, ${f.responseType === 'detailed' ? f.analysis : f.summary}`)
      .join('\n\n');

    console.log('Feedback summary:', feedbackSummary);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Analyze multiple pieces of feedback and provide a comprehensive summary. Ensure your response is in valid JSON format."
        },
        {
          role: "user",
          content: `Based on the following individual feedback:\n\n${feedbackSummary}\n\nProvide an overall analysis in this JSON structure:
          {
            "overallSentiment": "positive/neutral/negative",
            "consensusPoints": [
              "<point 1>",
              "<point 2>",
              "<point 3>"
            ],
            "keyInsights": "<paragraph of key insights>",
            "marketPotential": "<assessment of market potential>",
            "recommendedActions": [
              "<action 1>",
              "<action 2>",
              "<action 3>"
            ]
          }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('OpenAI response for overall analysis:', completion.choices[0].message.content);

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error('Detailed error in generateOverallAnalysis:', {
      error: error.message,
      stack: error.stack,
      feedbackCount: Object.keys(individualFeedback || {}).length
    });
    throw error;
  }
}; 