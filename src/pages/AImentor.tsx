
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, BookOpen, Briefcase, Award, FileText, MessageSquare, RefreshCcw, PanelLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Message } from '../types';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  sampleQuestions: string[];
}

export function AImentor() {
  const { openAIKey } = useStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Career Mentor. How can I help with your career journey today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(openAIKey || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!openAIKey);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: 'guidance',
      name: 'Career Guidance',
      icon: <Briefcase className="h-5 w-5 text-indigo-500" />,
      description: 'Get personalized advice for career decisions and planning your path forward.',
      sampleQuestions: [
        'What career aligns with my interest in technology and creativity?',
        'How can I transition from my current field to data science?',
        'What should I consider when choosing between multiple job offers?',
      ],
    },
    {
      id: 'skills',
      name: 'Skill Development',
      icon: <Award className="h-5 w-5 text-green-500" />,
      description: 'Learn which skills to develop for career success and how to acquire them efficiently.',
      sampleQuestions: [
        'Which programming languages should I learn for web development?',
        'How can I improve my leadership skills?',
        'What soft skills are most important for marketing careers?',
      ],
    },
    {
      id: 'industry',
      name: 'Industry Insights',
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      description: 'Understand trends, challenges, and opportunities in your industry of interest.',
      sampleQuestions: [
        'What are the emerging trends in healthcare technology?',
        'How is AI changing the finance industry?',
        'What sustainability practices are important in manufacturing?',
      ],
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      description: 'Get help preparing for interviews with common questions and effective responses.',
      sampleQuestions: [
        'What are common interview questions for software engineers?',
        'How should I answer "What is your greatest weakness?"',
        'Can you help me prepare for a behavioral interview?',
      ],
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      if (input.trim()) {
        handleSubmit();
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleSampleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // If using OpenAI integration
      if (apiKey) {
        const response = await generateAIResponse(input.trim(), apiKey);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Fallback to predefined responses
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: generateFallbackResponse(input.trim()),
            isUser: false,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      // Handle error - add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    useStore.setState({ openAIKey: apiKey });
    setShowApiKeyInput(false);
  };

  const generateAIResponse = async (prompt: string, apiKey: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are an AI Career Mentor specializing in career guidance for students. 
              Provide helpful, concise advice about career planning, skill development, education paths, 
              and job opportunities. Be encouraging, practical, and focus on actionable steps.
              If you don't know something specific about a career, be honest and suggest resources for further research.
              Respond comprehensively like ChatGPT would, providing detailed and helpful answers.`
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return generateFallbackResponse(prompt);
    }
  };

  const generateFallbackResponse = (prompt: string): string => {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('software') || promptLower.includes('programming') || promptLower.includes('developer')) {
      return `Software development is an excellent career choice with strong growth prospects. I recommend:
      
1. Start with learning fundamentals of programming through languages like Python or JavaScript
2. Build projects to apply your knowledge and create a portfolio
3. Consider a Computer Science degree or coding bootcamp for structured learning
4. Practice data structures and algorithms for technical interviews
5. Join developer communities and contribute to open source projects

The average salary range for software developers in India is ₹5,00,000 to ₹20,00,000 depending on experience and specialization.`;
    } 
    
    else if (promptLower.includes('data science') || promptLower.includes('machine learning') || promptLower.includes('ai')) {
      return `Data Science and AI are rapidly growing fields with excellent opportunities. Here's my advice:

1. Build a strong foundation in statistics, linear algebra, and calculus
2. Learn Python and libraries like Pandas, NumPy, Scikit-learn, and TensorFlow
3. Take courses on machine learning algorithms and deep learning
4. Work on projects using public datasets to build your portfolio
5. Consider a Master's degree in Data Science or related field for advanced roles

Top skills in demand include statistical analysis, machine learning, data visualization, and cloud computing. The field offers competitive salaries ranging from ₹6,00,000 to ₹24,00,000 annually in India.`;
    } 
    
    else if (promptLower.includes('interview') || promptLower.includes('resume') || promptLower.includes('cv')) {
      return `Here are my top interview preparation tips:

1. Research the company thoroughly - understand their products, values, and culture
2. Prepare concise stories about your experiences using the STAR method (Situation, Task, Action, Result)
3. Practice common interview questions and technical problems relevant to your field
4. Prepare thoughtful questions to ask the interviewers
5. Follow up with a thank-you email within 24 hours of your interview

For your resume, focus on quantifiable achievements rather than just listing responsibilities. Keep it concise (1-2 pages) and tailor it for each position you apply for.`;
    } 
    
    else if (promptLower.includes('skill') || promptLower.includes('learn') || promptLower.includes('course')) {
      return `Developing in-demand skills is crucial for career advancement. Here are recommendations:

1. Technical skills: Programming, data analysis, digital marketing depending on your field
2. Soft skills: Communication, problem-solving, adaptability, and teamwork are universally valued
3. Industry-specific certifications can boost your credibility and marketability
4. Platforms like Coursera, edX, and LinkedIn Learning offer excellent courses
5. Consider the 70-20-10 learning model: 70% hands-on practice, 20% feedback and mentorship, 10% formal education

The most efficient way to learn is by applying knowledge to real projects and getting feedback from peers or mentors.`;
    }
    
    else {
      return `Thank you for your question. As a career mentor, I can provide guidance on:

1. Career planning and development strategies
2. Skill acquisition and educational pathways
3. Industry trends and job market insights
4. Resume building and interview preparation
5. Networking and professional development

Could you provide more details about your current situation and specific career interests so I can give you more tailored advice?`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Career Mentor</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with categories */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <PanelLeft className="mr-2 h-5 w-5 text-indigo-600" />
                Conversation Topics
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-indigo-100 border border-indigo-200' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-2 font-medium">{category.name}</span>
                    </div>
                    
                    {selectedCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="space-y-1">
                          {category.sampleQuestions.map((question, index) => (
                            <div 
                              key={index} 
                              className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer p-1 hover:bg-indigo-50 rounded"
                              onClick={() => handleSampleQuestionClick(question)}
                            >
                              "{question}"
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {showApiKeyInput && (
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-md font-medium mb-2">Connect ChatGPT</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enter your OpenAI API key for enhanced AI capabilities.
                </p>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full p-2 border rounded-md mb-2"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={!apiKey.trim().startsWith('sk-')}
                >
                  Connect
                </button>
              </div>
            )}
            
            {!showApiKeyInput && (
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">ChatGPT Connected</h3>
                  <button 
                    onClick={() => setShowApiKeyInput(true)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center mt-2 text-green-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Active
                </div>
              </div>
            )}
          </div>

          {/* Chat area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[calc(100vh-10rem)]">
              {/* Messages area */}
              <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 ${
                          message.isUser
                            ? 'bg-indigo-100 text-gray-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <RefreshCcw className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input area */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="border-t border-gray-200 p-4">
                <div className="flex items-end space-x-2">
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about careers, skills, interviews, or education..."
                    className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                    rows={2}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-lg ${
                      isLoading || !input.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
