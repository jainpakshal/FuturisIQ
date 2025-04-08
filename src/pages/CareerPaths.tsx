
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { 
  Compass,
  ChevronRight
} from 'lucide-react';
import { generateCareerPathSuggestions, getCareerPathDetails } from '../services/careerPathService';
import type { CareerPath } from '../types';
import { CareerPathCard } from '../components/CareerPathCard';
import { CareerPathDetail } from '../components/CareerPathDetail';

export function CareerPaths() {
  const { isAssessmentComplete } = useStore();
  const [suggestedPaths, setSuggestedPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      setIsLoading(true);
      try {
        const paths = await generateCareerPathSuggestions();
        // Get a good variety of career paths
        setSuggestedPaths(paths);
      } catch (error) {
        console.error("Error fetching career path suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  const handlePathSelect = async (path: CareerPath) => {
    setIsDetailLoading(true);
    try {
      const detailedPath = await getCareerPathDetails(path.id);
      setSelectedPath(detailedPath);
    } catch (error) {
      console.error("Error fetching career path details:", error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedPath(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <Compass className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Career Pathways</h1>
        </div>

        {!isAssessmentComplete && localStorage.getItem('isAssessmentComplete') !== 'true' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-amber-200 p-2 rounded-full">
                <Compass className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">Complete Your Career DNA First</h3>
                <p className="text-amber-700">
                  For the most accurate and personalized career path recommendations, 
                  please complete your Career DNA assessment first.
                </p>
                <a 
                  href="/career-dna"
                  className="inline-flex items-center space-x-1 text-indigo-600 font-medium mt-3 hover:text-indigo-700"
                >
                  <span>Go to Career DNA Assessment</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {!selectedPath ? (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Explore Career Paths</h2>
              <p className="text-gray-600 mb-6">
                Based on your Career DNA profile, we've identified these most relevant career paths that align well with your 
                interests, personality traits, aptitudes, and learning style.
              </p>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedPaths.map((path) => (
                    <CareerPathCard 
                      key={path.id} 
                      path={path} 
                      onSelect={() => handlePathSelect(path)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {isDetailLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <CareerPathDetail path={selectedPath} onBack={handleBackToList} />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
