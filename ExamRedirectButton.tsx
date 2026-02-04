import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GOOGLE_SCRIPT_EXAM_URL } from '../constants';

interface ExamRedirectButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const ExamRedirectButton: React.FC<ExamRedirectButtonProps> = ({ 
  label = "Vào làm bài", 
  className = "", 
  variant = 'primary',
  fullWidth = false
}) => {
  
  const handleClick = () => {
    window.open(GOOGLE_SCRIPT_EXAM_URL, '_blank');
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all duration-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    secondary: "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-500",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      aria-label="Redirect to Online Exam System"
    >
      <span>{label}</span>
      <ExternalLink size={18} />
    </button>
  );
};

export default ExamRedirectButton;