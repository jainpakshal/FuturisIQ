
// This file contains both the mock data (assessment questions) and the OpenAI integration
import type { CareerDNA as CareerDNAType } from '../types';
import { generateCareerDNAWithOpenAI } from '../utils/openaiUtils';

type StudentType = '10th' | '12th';
type AssessmentCategory = 'interests' | 'personality' | 'learningStyle' | 'careerArchetypes';

interface Question {
  question: string;
  options: string[];
}

type QuestionSet = {
  [key in AssessmentCategory]: Question[];
};

// Questions for 10th grade students (focused on academic streams)
const tenthGradeQuestions: QuestionSet = {
  interests: [
    {
      question: "Which academic subjects do you find most engaging and enjoyable?",
      options: [
        "Mathematics and Physics (quantitative and analytical subjects)",
        "Biology and Chemistry (life and physical sciences)",
        "Literature and Languages (communication and expression)",
        "History and Social Sciences (human society and behavior)",
        "Arts and Design (creativity and aesthetics)"
      ]
    },
    {
      question: "When working on school projects, which aspects do you naturally gravitate towards?",
      options: [
        "Solving complex problems and puzzles requiring logical thinking",
        "Researching information and organizing findings systematically",
        "Writing and communicating ideas to others effectively",
        "Leading the team and coordinating everyone's efforts",
        "Adding creative elements and innovative approaches"
      ]
    },
    {
      question: "Outside of school, which activities do you find most intellectually stimulating?",
      options: [
        "Technology-related activities (coding, electronics, robotics)",
        "Reading books and exploring new ideas and concepts",
        "Participating in debates, discussions, or public speaking",
        "Sports or team-based activities requiring strategy",
        "Creating art, music, videos, or other creative content"
      ]
    }
  ],
  personality: [
    {
      question: "How do you typically approach studying for an important exam?",
      options: [
        "Create a detailed study schedule and methodically work through material",
        "Focus on understanding core concepts rather than memorizing details",
        "Study in groups to discuss ideas and test understanding with others",
        "Use visual aids, diagrams, and mind maps to organize information",
        "Practice with past papers and apply knowledge to realistic scenarios"
      ]
    },
    {
      question: "When faced with a challenging problem in a subject, how do you usually respond?",
      options: [
        "Break it down into smaller, manageable parts and solve step by step",
        "Look for patterns or connections to previously solved problems",
        "Discuss it with teachers or classmates to gain different perspectives",
        "Research different approaches before attempting a solution",
        "Try creative or unconventional approaches to find a solution"
      ]
    },
    {
      question: "In group projects, which role do you naturally tend to take on?",
      options: [
        "The organizer who creates plans and ensures deadlines are met",
        "The researcher who gathers and analyzes necessary information",
        "The communicator who presents ideas and facilitates discussions",
        "The problem-solver who addresses challenges as they arise",
        "The innovator who contributes unique ideas and creative solutions"
      ]
    }
  ],
  learningStyle: [
    {
      question: "Which method helps you retain new academic information most effectively?",
      options: [
        "Reading detailed explanations and writing comprehensive notes",
        "Visualizing concepts through diagrams, charts, and illustrations",
        "Hands-on experiments and practical applications of theories",
        "Discussing concepts and explaining them to others verbally",
        "Relating information to real-world examples and applications"
      ]
    },
    {
      question: "When mastering a difficult academic concept, what approach works best for you?",
      options: [
        "Following a step-by-step tutorial or guide with detailed explanations",
        "Watching video demonstrations that show the concept in action",
        "Directly implementing and experimenting with the concept yourself",
        "Participating in interactive discussions about the concept",
        "Connecting the concept to your existing knowledge and experiences"
      ]
    },
    {
      question: "How do you prefer to demonstrate your knowledge in school assessments?",
      options: [
        "Written essays or reports where I can explain my thinking thoroughly",
        "Visual presentations using graphs, diagrams, and illustrations",
        "Practical demonstrations or creating working models",
        "Oral presentations or discussions where I can articulate ideas",
        "Creative projects that show practical applications of knowledge"
      ]
    }
  ],
  careerArchetypes: [
    {
      question: "Which academic stream are you most interested in pursuing after 10th grade?",
      options: [
        "Science with Mathematics (Engineering, Computer Science, etc.)",
        "Science with Biology (Medicine, Life Sciences, etc.)",
        "Commerce (Business, Economics, Accounting, etc.)",
        "Humanities and Social Sciences (Law, Psychology, etc.)",
        "Creative Arts and Design (Fine Arts, Media, etc.)"
      ]
    },
    {
      question: "What type of professional environment do you see yourself thriving in?",
      options: [
        "Structured environment with clear guidelines and processes",
        "Research-oriented setting focused on innovation and discovery",
        "Dynamic business environment with diverse challenges",
        "Social environment involving extensive human interaction",
        "Creative studio encouraging artistic expression and design"
      ]
    },
    {
      question: "What long-term career goals are most appealing to you?",
      options: [
        "Building technical expertise and solving complex problems",
        "Contributing to scientific advancements and research",
        "Building or managing successful organizations",
        "Helping others and making a positive social impact",
        "Expressing creativity and producing meaningful work"
      ]
    }
  ]
};

// Questions for 12th grade students (focused on college majors and careers)
const twelfthGradeQuestions: QuestionSet = {
  interests: [
    {
      question: "Which area of study are you most drawn to for your higher education?",
      options: [
        "Engineering and Technology (Computer Science, Mechanical, etc.)",
        "Medical and Health Sciences (Medicine, Pharmacy, Biotechnology)",
        "Business and Commerce (Management, Finance, Economics)",
        "Arts, Humanities and Social Sciences (Psychology, Literature, etc.)",
        "Creative and Applied Arts (Design, Media, Architecture, etc.)"
      ]
    },
    {
      question: "What type of professional activities would you find most fulfilling?",
      options: [
        "Developing innovative technologies and solving technical problems",
        "Diagnosing issues and providing solutions or care to others",
        "Analyzing markets, managing resources, and making strategic decisions",
        "Researching human behavior and societal patterns",
        "Creating original content, designs, or artistic expressions"
      ]
    },
    {
      question: "Which subject areas have you consistently performed well in throughout school?",
      options: [
        "Mathematics, Physics, and Computing subjects",
        "Biology, Chemistry, and related laboratory work",
        "Economics, Accounting, and Business Studies",
        "Languages, History, Political Science, and Sociology",
        "Art, Music, Design, and Performing Arts"
      ]
    }
  ],
  personality: [
    {
      question: "How do you typically manage complex projects and assignments?",
      options: [
        "Create detailed plans with milestones and follow a systematic approach",
        "Focus on understanding the key requirements first, then adapt as needed",
        "Collaborate with others to divide responsibilities and integrate ideas",
        "Research thoroughly before starting, then proceed methodically",
        "Start with a creative vision and develop the details as you progress"
      ]
    },
    {
      question: "In challenging academic situations, what is your typical response?",
      options: [
        "Analyze the problem methodically and work through potential solutions",
        "Seek additional resources and explanations to deepen understanding",
        "Discuss with peers or teachers to gain different perspectives",
        "Take time to reflect on the challenge before determining an approach",
        "Try unconventional approaches or creative solutions"
      ]
    },
    {
      question: "How would you describe your preferred work style?",
      options: [
        "Highly structured with clear processes and defined outcomes",
        "Analytical and detail-oriented, focusing on accuracy and precision",
        "Collaborative and team-based, valuing diverse perspectives",
        "Independent and self-directed, with space for critical thinking",
        "Flexible and adaptive, allowing for creativity and innovation"
      ]
    }
  ],
  learningStyle: [
    {
      question: "When preparing for competitive exams or challenging assignments, what strategy works best for you?",
      options: [
        "Creating comprehensive study notes and practice with systematic revision",
        "Using visual aids, concept maps, and diagrammatic representations",
        "Taking practice tests and analyzing mistakes to improve understanding",
        "Participating in study groups or explaining concepts to others",
        "Applying concepts to real-world scenarios or case studies"
      ]
    },
    {
      question: "How do you most effectively acquire new skills or knowledge in your areas of interest?",
      options: [
        "Following structured courses or tutorials with clear learning paths",
        "Watching demonstrations and visualizing the processes",
        "Hands-on practice and learning through direct experience",
        "Interactive discussions, debates, and question-answer sessions",
        "Self-directed exploration guided by curiosity and interest"
      ]
    },
    {
      question: "When learning complex academic material, what helps you understand it best?",
      options: [
        "Breaking it down into logical steps and building understanding gradually",
        "Seeing visual representations or diagrams of the concept",
        "Working through practical examples and applications",
        "Discussing the material and verbalizing your understanding",
        "Connecting it to broader contexts or real-world applications"
      ]
    }
  ],
  careerArchetypes: [
    {
      question: "Which career pathway aligns most closely with your aspirations?",
      options: [
        "Technology and Engineering (Software Development, Engineering, Data Science)",
        "Healthcare and Medicine (Doctor, Researcher, Healthcare Administrator)",
        "Business and Finance (Entrepreneur, Manager, Consultant, Analyst)",
        "Public Service and Social Impact (Law, Education, Psychology, Policy)",
        "Creative Industries (Design, Media Production, Architecture, Arts)"
      ]
    },
    {
      question: "What factors are most important to you in your future career?",
      options: [
        "Intellectual challenge and opportunities to solve complex problems",
        "Making a direct positive impact on individuals' lives and wellbeing",
        "Financial security and potential for career advancement",
        "Work that contributes to social good and addresses important issues",
        "Freedom to express creativity and develop innovative solutions"
      ]
    },
    {
      question: "In your ideal professional future, what role would you like to play?",
      options: [
        "Technical expert or specialist with deep domain knowledge",
        "Professional providing essential services to others",
        "Leader managing teams or organizations towards strategic goals",
        "Analyst or researcher generating insights and knowledge",
        "Creator or innovator developing original ideas and solutions"
      ]
    }
  ]
};

// Function to get appropriate questions based on student type
export const getAssessmentQuestions = (studentType: StudentType): QuestionSet => {
  return studentType === '10th' ? tenthGradeQuestions : twelfthGradeQuestions;
};

// This function now uses the real OpenAI API
export const generateCareerDNA = async (
  responses: Record<string, string[]>,
  studentType: StudentType
): Promise<CareerDNAType> => {
  try {
    // In a production app, you should get this from an environment variable or secure storage
    // For demo purposes, using a temporary API key input
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      // If no API key is available, fall back to mock implementation
      console.warn("No OpenAI API key found, using mock data");
      return generateMockCareerDNA(responses, studentType);
    }
    
    // Call OpenAI API
    return await generateCareerDNAWithOpenAI(responses, studentType, apiKey);
  } catch (error) {
    console.error("Error generating Career DNA with OpenAI:", error);
    // Fallback to mock data if the API call fails
    return generateMockCareerDNA(responses, studentType);
  }
};

// Keep the mock implementation as fallback
const generateMockCareerDNA = (
  responses: Record<string, string[]>,
  studentType: StudentType
): CareerDNAType => {
  // For 10th grade students - more specific career archetypes
  const tenthGradeAnalysis = {
    interests: determineTopCategories(responses.interests, [
      "Mathematics & Quantitative Analysis", "Life Sciences & Healthcare", "Literary Arts & Communication", "Social Sciences & Humanities", "Visual Arts & Design"
    ]),
    personality: determineTopCategories(responses.personality, [
      "Methodical & Structured", "Analytical & Logical", "Collaborative & Communicative", "Investigative & Detail-oriented", "Creative & Innovative"
    ]),
    aptitude: ["Critical Thinking", "Information Processing", "Communication Skills", "Research Capabilities", "Creative Problem-Solving"],
    learningStyle: determineLearningStyle(responses.learningStyle),
    careerArchetypes: determineCareerArchetypes(responses.careerArchetypes, studentType),
  };
  
  // For 12th grade students - more specific career archetypes
  const twelfthGradeAnalysis = {
    interests: determineTopCategories(responses.interests, [
      "Computer Science & Software Engineering", "Medical Sciences & Healthcare Delivery", "Business Management & Financial Analysis", "Psychology & Human Behavior", "Creative Design & Media Production"
    ]),
    personality: determineTopCategories(responses.personality, [
      "Strategic Planner & Organizer", "Analytical Problem-Solver", "Collaborative Team Leader", "Methodical Researcher", "Innovative Content Creator"
    ]),
    aptitude: ["Technical Problem-Solving", "Data Analysis & Interpretation", "Project Management", "Research & Development", "Creative Implementation"],
    learningStyle: determineLearningStyle(responses.learningStyle),
    careerArchetypes: determineCareerArchetypes(responses.careerArchetypes, studentType),
  };

  return studentType === '10th' ? tenthGradeAnalysis : twelfthGradeAnalysis;
};

// Helper functions
function determineTopCategories(responses: string[], categories: string[]): string[] {
  if (responses.length === 0) return categories.slice(0, 2);
  
  // Map responses to categories based on keywords in responses
  const categoryScores = new Map<string, number>();
  categories.forEach(category => categoryScores.set(category, 0));
  
  // Simple implementation: assign scores based on position of keywords
  responses.forEach(response => {
    categories.forEach(category => {
      // Convert both to lowercase for case-insensitive matching
      const lowerResponse = response.toLowerCase();
      const lowerCategory = category.toLowerCase();
      
      // Check if category keywords appear in response
      const keywords = lowerCategory.split(" ");
      keywords.forEach(keyword => {
        if (keyword.length > 3 && lowerResponse.includes(keyword)) {
          const currentScore = categoryScores.get(category) || 0;
          categoryScores.set(category, currentScore + 1);
        }
      });
    });
  });
  
  // Sort categories by score and get top ones
  const sortedCategories = Array.from(categoryScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
    
  return sortedCategories.slice(0, Math.min(3, sortedCategories.length));
}

function determineLearningStyle(responses: string[]): string {
  if (responses.length === 0) return "Visual";
  
  // Map learning style responses to styles
  const styleMatches = {
    "Reading/Writing": ["reading", "writing", "notes", "written", "text"],
    "Visual": ["visual", "diagram", "chart", "graph", "illustration", "map"],
    "Kinesthetic": ["hands-on", "practical", "experiment", "apply", "doing"],
    "Auditory": ["discussion", "talk", "verbal", "explain", "listen"],
    "Applied": ["real-world", "practical", "application", "relate", "connect"]
  };
  
  const styleScores = new Map<string, number>();
  Object.keys(styleMatches).forEach(style => styleScores.set(style, 0));
  
  // Count matches for each style
  responses.forEach(response => {
    const lowerResponse = response.toLowerCase();
    
    Object.entries(styleMatches).forEach(([style, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerResponse.includes(keyword)) {
          const currentScore = styleScores.get(style) || 0;
          styleScores.set(style, currentScore + 1);
        }
      });
    });
  });
  
  // Get the style with highest score
  let topStyle = "Visual"; // Default
  let topScore = 0;
  
  styleScores.forEach((score, style) => {
    if (score > topScore) {
      topScore = score;
      topStyle = style;
    }
  });
  
  return topStyle + " Learner - You acquire knowledge best through visual aids, diagrams, and spatial relationships";
}

// New function to provide more specific career archetypes
function determineCareerArchetypes(responses: string[], studentType: StudentType): string[] {
  if (responses.length === 0) {
    return studentType === '10th' 
      ? ["STEM Specialist", "Healthcare Professional", "Business Analyst"] 
      : ["Software Engineer", "Medical Researcher", "Financial Analyst"];
  }
  
  // Define specific career archetypes for each education level
  const tenthGradeArchetypes = {
    "Science/Engineering": ["Aspiring Engineer", "Future Technologist", "Budding Scientist", "Mathematical Mind"],
    "Healthcare/Medicine": ["Pre-Medical Candidate", "Healthcare Enthusiast", "Biological Sciences Focus", "Patient Care Oriented"],
    "Business/Commerce": ["Business Minded", "Economic Thinker", "Future Entrepreneur", "Finance Oriented"],
    "Humanities/Social": ["Social Observer", "Cultural Analyst", "Communication Specialist", "People-Oriented Thinker"],
    "Arts/Creative": ["Creative Visionary", "Design Thinker", "Artistic Innovator", "Digital Media Creator"]
  };
  
  const twelfthGradeArchetypes = {
    "Technology/Engineering": ["Software Developer", "Computer Engineer", "Data Scientist", "Robotics Engineer"],
    "Healthcare/Medicine": ["Medical Professional", "Biomedical Researcher", "Healthcare Administrator", "Public Health Specialist"],
    "Business/Finance": ["Financial Analyst", "Business Consultant", "Marketing Strategist", "Entrepreneurial Leader"],
    "Social Impact": ["Policy Analyst", "Education Professional", "Counseling Psychologist", "Non-Profit Leader"],
    "Creative Industries": ["UX/UI Designer", "Digital Media Producer", "Architectural Designer", "Content Creator"]
  };
  
  // Map responses to archetypes
  const archetypes = studentType === '10th' ? tenthGradeArchetypes : twelfthGradeArchetypes;
  const archetypeScores = new Map<string, number>();
  
  // Flatten the archetypes for scoring
  const allArchetypes: string[] = [];
  Object.values(archetypes).forEach(categoryArchetypes => {
    categoryArchetypes.forEach(archetype => {
      allArchetypes.push(archetype);
      archetypeScores.set(archetype, 0);
    });
  });
  
  // Score each archetype based on responses
  responses.forEach(response => {
    const lowerResponse = response.toLowerCase();
    
    allArchetypes.forEach(archetype => {
      const keywords = archetype.toLowerCase().split(" ");
      let matched = false;
      
      // Check for broader category matches from responses
      Object.keys(archetypes).forEach(category => {
        if (lowerResponse.includes(category.toLowerCase())) {
          const categoryArchetypes = archetypes[category as keyof typeof archetypes];
          if (categoryArchetypes.includes(archetype)) {
            matched = true;
          }
        }
      });
      
      // Check for direct keyword matches
      keywords.forEach(keyword => {
        if (keyword.length > 3 && lowerResponse.includes(keyword)) {
          matched = true;
        }
      });
      
      if (matched) {
        const currentScore = archetypeScores.get(archetype) || 0;
        archetypeScores.set(archetype, currentScore + 1);
      }
    });
  });
  
  // Sort archetypes by score and get top ones
  const sortedArchetypes = Array.from(archetypeScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  // Return top 3 archetypes
  return sortedArchetypes.slice(0, 3);
}
