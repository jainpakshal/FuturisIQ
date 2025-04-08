
import { CareerDNA, CareerPath } from '../types';
import { useStore } from '../store/useStore';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateCareerDNAWithOpenAI = async (
  responses: Record<string, string[]>, 
  studentType: '10th' | '12th',
  apiKey: string
): Promise<CareerDNA> => {
  // Prepare the messages for OpenAI
  const userResponses = Object.entries(responses)
    .map(([category, answers]) => {
      return `${category}: ${answers.join(', ')}`;
    })
    .join('\n\n');

  const messages = [
    {
      role: 'system',
      content: `You are an expert career counselor for ${studentType} grade students. 
      Analyze the student's assessment responses and generate a Career DNA profile.
      Return your response in the exact JSON format requested without any additional text.`
    },
    {
      role: 'user',
      content: `Based on these assessment responses from a ${studentType} grade student, generate a Career DNA profile:
      
      ${userResponses}
      
      Return the Career DNA as a JSON object with the following properties:
      - interests: Array of 3-5 top interest areas that are very specific and accurate
      - personality: Array of 3-5 key personality traits that are detailed and insightful
      - aptitude: Array of 3-5 areas where the student shows aptitude
      - learningStyle: String describing primary learning style in detail
      - careerArchetypes: Array of 3-5 specific career archetypes (not broad categories) that fit the student`
    }
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;
    
    // Extract the JSON object from the response
    try {
      // Find JSON in the response (in case there's additional text)
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : resultText;
      const careerDNA = JSON.parse(jsonStr);
      
      // Validate the structure
      return {
        interests: Array.isArray(careerDNA.interests) ? careerDNA.interests : [],
        personality: Array.isArray(careerDNA.personality) ? careerDNA.personality : [],
        aptitude: Array.isArray(careerDNA.aptitude) ? careerDNA.aptitude : [],
        learningStyle: typeof careerDNA.learningStyle === 'string' ? careerDNA.learningStyle : '',
        careerArchetypes: Array.isArray(careerDNA.careerArchetypes) ? careerDNA.careerArchetypes : []
      };
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error("Failed to parse Career DNA from OpenAI response");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};

export const generateCareerPathsWithAI = async (): Promise<CareerPath[]> => {
  const { openAIKey } = useStore.getState();
  
  if (!openAIKey) {
    throw new Error("OpenAI API key is required");
  }
  
  // Get the user's Career DNA from the store
  // In a real application, we would store this in the user profile
  // For now, we'll use a simplified approach with mock data
  const mockCareerDNA = {
    interests: ["Technology", "Problem Solving", "Data Analysis"],
    personality: ["Analytical", "Detail-oriented", "Creative"],
    aptitude: ["Mathematics", "Logical Reasoning", "Critical Thinking"],
    learningStyle: "Visual and hands-on",
    careerArchetypes: ["Software Developer", "Data Scientist", "UX Designer"]
  };

  const messages = [
    {
      role: 'system',
      content: `You are an expert career counselor. Based on a user's Career DNA profile, suggest suitable career paths.
      Return your response in the exact JSON format requested without any additional text.`
    },
    {
      role: 'user',
      content: `Based on this Career DNA profile, suggest 5-7 suitable career paths:
      
      Interests: ${mockCareerDNA.interests.join(', ')}
      Personality: ${mockCareerDNA.personality.join(', ')}
      Aptitude: ${mockCareerDNA.aptitude.join(', ')}
      Learning Style: ${mockCareerDNA.learningStyle}
      Career Archetypes: ${mockCareerDNA.careerArchetypes.join(', ')}
      
      Return the career paths as a JSON array of objects, each with these properties:
      - id: A unique string identifier
      - title: The name of the career path
      - description: A detailed description of what this career entails
      - type: Either "traditional", "modern", or "emerging"
      - skills: Array of 4-6 key skills required for this career
      - outlook: A brief statement about future prospects
      - salary: An object with entry, mid, and senior level annual salary estimates in USD
      `
    }
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;
    
    try {
      // Find JSON in the response
      const jsonMatch = resultText.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : resultText;
      const careerPaths = JSON.parse(jsonStr);
      
      // Validate and return
      if (Array.isArray(careerPaths)) {
        return careerPaths;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error("Failed to parse career paths from OpenAI response");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
