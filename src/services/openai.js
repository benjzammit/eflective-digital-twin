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

    const response = completion.choices[0].message.content;
    console.log('OpenAI response:', response);

    const parsedResponse = JSON.parse(response);
    return {
      ...parsedResponse,
      personaName: persona.name,
      personaId: persona.id
    };

  } catch (error) {
    console.error('Detailed error in generateDigitalTwinFeedback:', error);
    throw error;
  }
};

export const generateOverallAnalysis = async (responses) => {
  try {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      throw new Error('Valid responses array is required');
    }

    // Create a summary of all feedback
    const feedbackSummary = responses.map(response => 
      `${response.personaName}: ${response.sentiment} sentiment, ${response.analysis}`
    ).join('\n\n');

    console.log('Feedback summary:', feedbackSummary);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI that analyzes multiple pieces of feedback and provides an overall analysis. 
          Your response must be in the following JSON format:
          {
            "overallSentiment": "positive/negative/neutral",
            "keyInsights": "A detailed paragraph summarizing key insights from all feedback",
            "marketPotential": "A detailed assessment of market potential based on the feedback",
            "consensusPoints": ["point1", "point2", "point3"],
            "recommendedActions": ["action1", "action2", "action3"]
          }`
        },
        {
          role: "user",
          content: `Please analyze these different perspectives and provide a comprehensive overall analysis that includes sentiment analysis, key insights, market potential, points of consensus, and recommended actions:\n\n${feedbackSummary}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    console.log('OpenAI response for overall analysis:', response);

    const parsedResponse = JSON.parse(response);
    
    // Ensure all required fields exist
    return {
      overallSentiment: parsedResponse.overallSentiment || 'neutral',
      keyInsights: parsedResponse.keyInsights || 'No insights available',
      marketPotential: parsedResponse.marketPotential || 'No market potential analysis available',
      consensusPoints: parsedResponse.consensusPoints || [],
      recommendedActions: parsedResponse.recommendedActions || []
    };

  } catch (error) {
    console.error('Error in generateOverallAnalysis:', error);
    // Return a default structure in case of error
    return {
      overallSentiment: 'neutral',
      keyInsights: 'Analysis currently unavailable',
      marketPotential: 'Market potential analysis currently unavailable',
      consensusPoints: ['No consensus points available'],
      recommendedActions: ['No recommended actions available']
    };
  }
}; 