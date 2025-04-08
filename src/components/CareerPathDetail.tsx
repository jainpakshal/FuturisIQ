
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Briefcase, 
  ExternalLink,
  MapPin
} from 'lucide-react';
import type { CareerPath } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CareerPathDetailProps {
  path: CareerPath;
  onBack: () => void;
}

// Sample historical growth data (fictional data for demonstration)
const generateHistoricalGrowthData = (currentGrowthRate: number) => {
  // Create a semi-realistic growth curve based on the current growth rate
  const baseValue = currentGrowthRate - (Math.random() * 5);
  
  return [
    { year: '2020', growthRate: Math.max(1, baseValue - 2 + (Math.random() * 2)).toFixed(1) },
    { year: '2021', growthRate: Math.max(1, baseValue - 1 + (Math.random() * 3)).toFixed(1) },
    { year: '2022', growthRate: Math.max(1, baseValue + (Math.random() * 4)).toFixed(1) },
    { year: '2023', growthRate: Math.max(1, baseValue + 1 + (Math.random() * 4)).toFixed(1) },
    { year: '2024', growthRate: Math.max(1, baseValue + 2 + (Math.random() * 3)).toFixed(1) },
    { year: '2025', growthRate: currentGrowthRate.toFixed(1) }
  ];
};

export function CareerPathDetail({ path, onBack }: CareerPathDetailProps) {
  const growthData = generateHistoricalGrowthData(path.marketTrends?.growthRate || 0);
  
  const searchNotableProfessionals = () => {
    window.open(`https://www.google.com/search?q=notable+professionals+in+${path.title}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 mb-6 text-indigo-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to all paths</span>
          </button>
          <h2 className="text-2xl font-bold">{path.title}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full 
              ${path.type === 'traditional' ? 'bg-indigo-200 text-indigo-800' : 
                path.type === 'modern' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
              {path.type.charAt(0).toUpperCase() + path.type.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
          <p className="text-gray-600 mb-6">{path.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <h4 className="font-medium text-gray-800">Key Skills Required</h4>
            </div>
            <ul className="space-y-2">
              {path.skills.map((skill, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  <span className="text-gray-600">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Journey</h3>
          <div className="relative pl-8 border-l-2 border-indigo-100 space-y-8 mb-8">
            {path.journey && path.journey.map((stage, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">{stage.title}</h4>
                  <p className="text-gray-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {path.marketTrends && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Growth (2020-2025)</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-600 mb-4">{path.marketTrends.overview}</p>
                
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={growthData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="growthRate" 
                        name="Growth Rate (%)" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {path.notableProfessionals && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Notable Professionals</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {path.notableProfessionals.slice(0, 2).map((professional, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{professional.name}</h4>
                        <p className="text-gray-500 text-sm">{professional.achievement}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{professional.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={searchNotableProfessionals}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span>See more notable professionals</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <a 
          href="/roadmap"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
        >
          <span className="mr-2">Create Your Career Roadmap</span>
          <MapPin className="h-5 w-5" />
        </a>
        <a 
          href="/ai-mentor"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
        >
          <span className="mr-2">Ask AI Mentor</span>
          <Briefcase className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  );
}
