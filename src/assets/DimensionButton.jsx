import React from 'react';
import { Ruler } from 'lucide-react';

const DimensionsButton = ({ showDimensions, toggleDimensions }) => {
  return (
    <button 
      className={`flex justify-center items-center w-10 h-10 rounded-full shadow-md hover:bg-gray-100 transition-colors ${showDimensions ? 'bg-blue-100' : 'bg-white'}`}
      onClick={toggleDimensions}
      aria-label="Toggle dimensions"
    >
      <Ruler size={20} />
    </button>
  );
};

export default DimensionsButton;