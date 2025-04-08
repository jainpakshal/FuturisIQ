
export interface User {
  id: string;
  name: string;
  email: string;
  profileType: 'student' | 'parent' | 'teacher';
  careerDNA?: CareerDNA;
}

export interface CareerDNA {
  interests: string[];
  personality: string[];
  aptitude: string[];
  learningStyle: string;
  careerArchetypes: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  type: 'traditional' | 'modern' | 'emerging';
  skills: string[];
  outlook: string;
  salary: {
    entry: number;
    mid: number;
    senior: number;
  };
  journey?: CareerJourneyStage[];
  marketTrends?: {
    overview: string;
    growthRate: number;
    stability: number;
    emergingOpportunities?: string[];
  };
  notableProfessionals?: NotableProfessional[];
}

export interface CareerJourneyStage {
  title: string;
  description: string;
  duration?: string; // Now optional
}

export interface NotableProfessional {
  name: string;
  achievement: string;
  description: string;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}
