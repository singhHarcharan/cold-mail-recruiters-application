import React from 'react';
import { Bookmark } from 'lucide-react';

interface SaveButtonProps {
  isSaved: boolean;
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSaved, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${
        isSaved 
          ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      } transition-colors duration-150`}
      title={isSaved ? 'Remove from saved' : 'Save recruiter'}
    >
      <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  );
};

export default SaveButton;