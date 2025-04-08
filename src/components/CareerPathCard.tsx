
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import type { CareerPath } from '../types';

interface CareerPathCardProps {
  path: CareerPath;
  onSelect: () => void;
}

export function CareerPathCard({ path, onSelect }: CareerPathCardProps) {
  const getPathTypeColorClass = (type: string) => {
    switch (type) {
      case 'traditional':
        return 'bg-blue-100 text-blue-700';
      case 'modern':
        return 'bg-purple-100 text-purple-700';
      case 'emerging':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIcon = () => {
    return <Briefcase className="h-6 w-6 text-indigo-600" />;
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-indigo-100 p-2 rounded-full">
            {getIcon()}
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPathTypeColorClass(path.type)}`}>
            {path.type.charAt(0).toUpperCase() + path.type.slice(1)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{path.title}</h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{path.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {path.skills.slice(0, 2).map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {path.skills.length > 2 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{path.skills.length - 2} more
              </span>
            )}
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
