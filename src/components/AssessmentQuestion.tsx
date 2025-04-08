
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

interface AssessmentQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  currentAnswer?: string | null;
  onClear?: () => void;
}

export const AssessmentQuestion = ({ 
  question, 
  options, 
  onAnswer, 
  onBack, 
  canGoBack = false,
  currentAnswer = null,
  onClear
}: AssessmentQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(currentAnswer);
  const [isAnimating, setIsAnimating] = useState(false);

  // Take only the first 4 options to reduce options count
  const limitedOptions = options.slice(0, 4);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsAnimating(true);
    
    // Animate the selection but don't auto-submit
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Submit the selected answer
      onAnswer(selectedOption);
    }
  };

  const handleBack = () => {
    if (onBack && canGoBack) {
      onBack();
    }
  };

  const handleClear = () => {
    if (onClear) {
      setSelectedOption(null);
      onClear();
    }
  };

  return (
    <div className="p-6">
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-6 text-gray-800"
      >
        {question}
      </motion.h3>
      <div className="space-y-3 mb-6">
        {limitedOptions.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center ${
              selectedOption === option
                ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-200'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: selectedOption === option && isAnimating ? 1.03 : 1
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className={`mr-4 flex-shrink-0 h-6 w-6 rounded-full border ${
              selectedOption === option ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
            } flex items-center justify-center transition-colors duration-300`}>
              {selectedOption === option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </div>
            <span className="flex-grow">{option}</span>
            {selectedOption === option && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2"
              >
                <ArrowRight className="h-5 w-5 text-indigo-600" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between"
      >
        <div className="flex space-x-2">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors duration-300 ${
              canGoBack
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          {currentAnswer && onClear && (
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-300"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Clear</span>
            </button>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors duration-300 ${
            selectedOption
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  );
}
