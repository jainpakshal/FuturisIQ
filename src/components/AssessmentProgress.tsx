
import { motion } from 'framer-motion';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const AssessmentProgress = ({ currentStep, totalSteps }: AssessmentProgressProps) => {
  // Ensure currentStep is never greater than totalSteps
  const validCurrentStep = Math.min(currentStep, totalSteps);
  
  // Calculate progress percentage (0 to 100)
  // Start from 0% and increase only after answering questions
  // For the first question (currentStep = 1), progress should be 0%
  const progress = totalSteps > 0 ? Math.floor(((validCurrentStep - 1) / totalSteps) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
          Question {validCurrentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-indigo-800">
          {progress}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-2.5"
        />
      </div>
    </div>
  );
};
