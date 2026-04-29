import React from 'react';

const Spinner = ({ size = 'md', color = 'text-white' }) => {
  // Mapping sizes to Tailwind classes
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center" role="status">
      <div
        className={`
          ${sizes[size]} 
          ${color} 
          animate-spin 
          rounded-full 
          border-t-transparent 
          border-solid 
          border-current
        `}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;