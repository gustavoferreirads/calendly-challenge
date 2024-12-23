import React from 'react';

const SkeletonTimeSlots: React.FC = () => {
  return (
    <div className="lg:min-w-[180px] w-full max-h-[400px] overflow-y-auto">
      <div className="mb-8 text-base font-normal text-gray-800 animate-pulse bg-gray-300 h-4 rounded w-1/3"></div>
      <div className="grid grid-cols-1 gap-4 mr-4 mt-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex gap-2 animate-pulse">
            <div className="w-full h-12 bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SkeletonTimeSlots;