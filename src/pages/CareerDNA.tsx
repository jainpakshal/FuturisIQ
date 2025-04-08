
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Brain, User, Book, Compass, GraduationCap, School, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import { AssessmentQuestion } from '../components/AssessmentQuestion';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { 
  getAssessmentQuestions, 
  generateCareerDNA 
} from '../services/openaiService';
import type { CareerDNA as CareerDNAType } from '../types';

type StudentType = '10th' | '12th' | null;

export function CareerDNA() {
  const navigate = useNavigate();
  const { setAssessmentComplete } = useStore();
  const [isAssessing, setIsAssessing] = useState(false);
  const [studentType, setStudentType] = useState<StudentType>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string[]>>({
    interests: [],
    personality: [],
    learningStyle: [],
    careerArchetypes: []
  });
  const [careerDNA, setCareerDNA] = useState<CareerDNAType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const sections = ['interests', 'personality', 'learningStyle', 'careerArchetypes'];
  const assessmentQuestions = studentType ? getAssessmentQuestions(studentType) : { interests: [], personality: [], learningStyle: [], careerArchetypes: [] };
  const totalQuestions = sections.reduce((acc, section) => acc + assessmentQuestions[section as keyof typeof assessmentQuestions].length, 0);
  
  // Calculate questions answered based on the responses array length
  const questionsAnswered = Object.values(responses).flat().length;

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleApiKeySave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  const handleStudentTypeSelect = (type: StudentType) => {
    setStudentType(type);
    setResponses({
      interests: [],
      personality: [],
      learningStyle: [],
      careerArchetypes: []
    });
    setIsAssessing(true);
    setCurrentSection('interests');
    setCurrentQuestionIndex(0);
  };

  const handleStartAssessment = () => {
    setIsAssessing(true);
    setStudentType(null);
    setCareerDNA(null);
  };

  const handleAnswer = (answer: string) => {
    if (!currentSection) return;

    setResponses(prev => {
      const updatedSection = [...prev[currentSection]];
      
      if (currentQuestionIndex === updatedSection.length) {
        updatedSection.push(answer);
      } else {
        updatedSection[currentQuestionIndex] = answer;
        return {
          ...prev,
          [currentSection]: updatedSection.slice(0, currentQuestionIndex + 1)
        };
      }
      
      return {
        ...prev,
        [currentSection]: updatedSection
      };
    });

    const currentSectionQuestions = assessmentQuestions[currentSection as keyof typeof assessmentQuestions];
    
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const currentSectionIndex = sections.indexOf(currentSection);
      
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        completeAssessment();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      const currentSectionIndex = sections.indexOf(currentSection!);
      if (currentSectionIndex > 0) {
        const previousSection = sections[currentSectionIndex - 1];
        const previousSectionQuestions = assessmentQuestions[previousSection as keyof typeof assessmentQuestions];
        setCurrentSection(previousSection);
        setCurrentQuestionIndex(previousSectionQuestions.length - 1);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClearAnswer = () => {
    if (!currentSection) return;
    
    setResponses(prev => {
      const updatedSection = [...prev[currentSection]];
      updatedSection.pop(); // Remove the last answer from the current section
      
      return {
        ...prev,
        [currentSection]: updatedSection
      };
    });
  };

  const canGoBack = () => {
    if (currentSection === sections[0] && currentQuestionIndex === 0) {
      return false;
    }
    return true;
  };

  const getCurrentAnswer = () => {
    if (!currentSection) return null;
    
    return responses[currentSection][currentQuestionIndex];
  };

  const completeAssessment = async () => {
    setIsLoading(true);
    try {
      if (!studentType) {
        throw new Error("Student type is not selected");
      }
      
      const result = await generateCareerDNA(responses, studentType);
      setCareerDNA(result);
      setAssessmentComplete(true);
    } catch (error) {
      console.error("Error generating Career DNA:", error);
    } finally {
      setIsLoading(false);
      setIsAssessing(false);
    }
  };

  const handleExplorePaths = () => {
    navigate('/career-paths');
  };

  const getCurrentQuestion = () => {
    if (!currentSection) return null;
    
    const questions = assessmentQuestions[currentSection as keyof typeof assessmentQuestions];
    return questions[currentQuestionIndex];
  };

  const renderApiKeyInput = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">OpenAI API Key Required</h3>
        <p className="text-gray-600 mb-4">
          To analyze your responses and generate a personalized Career DNA, we need an OpenAI API key.
          Your key is stored only in your browser and is never sent to our servers.
        </p>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            OpenAI API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="sk-..."
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setShowApiKeyInput(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApiKeySave}
            disabled={!apiKey.startsWith('sk-')}
            className={`px-4 py-2 rounded-md ${
              apiKey.startsWith('sk-')
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            Save & Continue
          </button>
        </div>
      </motion.div>
    );
  };

  const renderStudentTypeSelection = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Let's personalize your assessment</h2>
          <p className="text-gray-600 mb-6">
            Please select your current academic stage so we can provide you with the most relevant career guidance:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleStudentTypeSelect('10th')}
              className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-6 rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex flex-col items-center group"
            >
              <div className="bg-indigo-100 p-4 rounded-full mb-3 group-hover:bg-indigo-200 transition-colors">
                <School className="h-10 w-10 text-indigo-600" />
              </div>
              <span className="text-lg font-medium">10th Grade Student</span>
              <span className="text-sm text-gray-500 mt-1 text-center">Exploring academic streams and future possibilities</span>
            </button>
            
            <button 
              onClick={() => handleStudentTypeSelect('12th')}
              className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-6 rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex flex-col items-center group"
            >
              <div className="bg-indigo-100 p-4 rounded-full mb-3 group-hover:bg-indigo-200 transition-colors">
                <GraduationCap className="h-10 w-10 text-indigo-600" />
              </div>
              <span className="text-lg font-medium">12th Grade Student</span>
              <span className="text-sm text-gray-500 mt-1 text-center">Planning college majors and professional careers</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderAssessment = () => {
    const currentQuestion = getCurrentQuestion();
    const currentAnswer = getCurrentAnswer();
    
    if (!currentQuestion) return null;

    const sectionInfo: Record<string, { icon: JSX.Element, name: string }> = {
      interests: { 
        icon: <Compass className="h-5 w-5" />, 
        name: "Interests & Preferences" 
      },
      personality: { 
        icon: <User className="h-5 w-5" />, 
        name: "Personality Traits" 
      },
      learningStyle: { 
        icon: <Book className="h-5 w-5" />, 
        name: "Learning Style" 
      },
      careerArchetypes: { 
        icon: <Brain className="h-5 w-5" />, 
        name: "Career Inclinations" 
      }
    };
    
    return (
      <div className="max-w-3xl mx-auto">
        <AssessmentProgress 
          currentStep={questionsAnswered + 1} 
          totalSteps={totalQuestions} 
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-indigo-600 px-6 py-3 flex items-center space-x-2 text-white">
            {currentSection && sectionInfo[currentSection].icon}
            <h3 className="text-lg font-medium">{currentSection && sectionInfo[currentSection].name}</h3>
          </div>
          
          <AssessmentQuestion 
            question={currentQuestion.question} 
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            onBack={handleBack}
            canGoBack={canGoBack()}
            currentAnswer={currentAnswer}
            onClear={handleClearAnswer}
          />
        </motion.div>
      </div>
    );
  };

  const renderResults = () => {
    if (!careerDNA) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Career DNA Profile</h2>
          <p className="text-gray-600 mt-2">
            Based on your responses, we've created your personalized Career DNA profile.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Compass className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Your Interests</h3>
            </div>
            <p className="text-gray-600 mb-3">Your top interests include:</p>
            <ul className="space-y-2">
              {careerDNA.interests.map((interest, index) => (
                <li key={index} className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-indigo-500 mr-2" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Personality Type</h3>
            </div>
            <p className="text-gray-600 mb-3">Your personality traits:</p>
            <ul className="space-y-2">
              {careerDNA.personality.map((trait, index) => (
                <li key={index} className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-indigo-500 mr-2" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Learning Style</h3>
            </div>
            <p className="text-gray-600 mb-3">You learn best through:</p>
            <div className="bg-indigo-50 px-4 py-3 rounded-lg flex items-center">
              <Lightbulb className="h-5 w-5 text-indigo-500 mr-2" />
              <p className="font-medium text-indigo-700">{careerDNA.learningStyle}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Career Archetypes</h3>
            </div>
            <p className="text-gray-600 mb-3">Your career archetypes:</p>
            <ul className="space-y-2">
              {careerDNA.careerArchetypes.map((archetype, index) => (
                <li key={index} className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-indigo-500 mr-2" />
                  <span>{archetype}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button 
            onClick={handleStartAssessment}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <span>Retake Assessment</span>
          </button>
          
          <button 
            onClick={handleExplorePaths}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <span>Explore Career Paths</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {showApiKeyInput ? (
          <motion.div
            key="api-key-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderApiKeyInput()}
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Your Career DNA</h1>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Complete our academically focused assessment to uncover your unique career profile, customized
              to your current educational stage. This analysis will help guide your academic and career decisions.
            </p>
            
            {!isAssessing && !careerDNA && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:flex-1">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interactive Assessment</h2>
                    <p className="text-gray-600 mb-6">
                      Complete our comprehensive assessment to uncover your unique career DNA profile.
                      This will help us provide personalized academic and career recommendations tailored to your
                      interests, personality, and aptitude.
                    </p>
                    <button 
                      onClick={handleStartAssessment}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Start Assessment</span>
                      )}
                    </button>
                  </div>
                  <div className="hidden md:block md:flex-1 md:ml-8">
                    <img 
                      src="https://www.careersingovernment.com/tools/wp-content/uploads/2014/02/david.shindler.job_.hunt_.jpg" 
                      alt="Confused man about career choices" 
                      className="rounded-lg object-cover h-64 w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {isAssessing && !studentType && renderStudentTypeSelection()}
            {isAssessing && studentType && renderAssessment()}
            
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your responses with AI...</p>
                <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
              </div>
            )}

            {careerDNA && renderResults()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
