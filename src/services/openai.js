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
${persona.name} is a ${persona.age}-year-old ${persona.occupation} based in ${persona.location}. ${persona.description}

They have a ${persona.education} and earn an income of ${persona.income}. Their personality traits include ${Object.entries(persona.personality_traits)
    .map(([trait, level]) => `${trait.toLowerCase()} (${level.toLowerCase()})`)
    .join(', ')}.

They value ${persona.values_and_beliefs.value_priorities.join(', ')}, and their environmental concern is rated at ${persona.values_and_beliefs.environmental_concern} out of 5. Social responsibility is important to them: ${persona.values_and_beliefs.social_responsibility}.

In terms of consumer behavior, they prefer shopping at ${persona.consumer_behavior.shopping_preferences.join(', ')}. When making purchases, they consider factors such as price (${persona.consumer_behavior.purchase_factors.price}/5), quality (${persona.consumer_behavior.purchase_factors.quality}/5), brand reputation (${persona.consumer_behavior.purchase_factors.brand_reputation}/5), sustainability (${persona.consumer_behavior.purchase_factors.sustainability}/5), and customer service (${persona.consumer_behavior.purchase_factors.customer_service}/5). They shop online ${persona.consumer_behavior.online_shopping_frequency}.

They use technology extensively, owning devices like ${persona.technology_usage.devices_owned.join(', ')} and spending about ${persona.technology_usage.internet_usage_hours} hours online daily, primarily for ${persona.technology_usage.primary_online_activities.join(', ')}.

Additional insights: ${persona.additional_insights.exceptional_experience}. They believe that ${persona.additional_insights.improvement_suggestions}
  `;
};

const DETAILED_PROMPT_TEMPLATE = (persona, feedbackContent) => `
As ${persona.name}, please analyze the following concept based on your persona:

${createPersonaContext(persona)}

Concept to analyze:
"${feedbackContent}"

Provide a detailed analysis from your perspective, including specific references to brands, numbers, or locations relevant to you. Your response should be in the following JSON format:

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

Ensure that your analysis reflects your persona's characteristics, values, and behavior patterns, and includes specific details such as brand names, numbers, or locations that are relevant to you.
`;

const QUICK_SUMMARY_PROMPT_TEMPLATE = (persona, feedbackContent) => `
As ${persona.name}, please provide a quick reaction to the following concept based on your persona:

${createPersonaContext(persona)}

Concept:
"${feedbackContent}"

Respond in the following JSON format:

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

Ensure that your response reflects your persona's characteristics, values, and behavior patterns, and includes specific details such as brand names, numbers, or locations that are relevant to you.
`;

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
          content: "You are an AI that simulates specific personas and provides feedback from their perspective. Fully embody the persona, and respond as they would, including their mannerisms and preferences. Always ensure that your response is in valid JSON format as specified."
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
          content: `Please analyze these different perspectives and provide a comprehensive overall analysis that includes sentiment analysis, key insights, market potential, points of consensus, and recommended actions. Include specific details such as brand names, numbers, or locations where relevant:\n\n${feedbackSummary}`
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
