import React from 'react';
import { format } from 'date-fns';
import { strings } from '@/const/strings';
import SkeletonTimeSlots from '@/components/TimeSlotsSkeleton';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  availableTimes: string[] | null;
  handleContinue: () => void;
  isLoading: boolean;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ selectedDate, availableTimes, selectedTime, setSelectedTime, handleContinue, isLoading }) => {
  const formattedDate = format(selectedDate, 'EEEE, MMMM d');

  if (isLoading) {
    return <SkeletonTimeSlots />;
  }

  return (
    <div className="lg:min-w-[180px] w-full max-h-[400px] overflow-y-auto">
      <div className="mb-8 text-base font-normal text-gray-800">{formattedDate}</div>

      {availableTimes && availableTimes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mr-4">
          {availableTimes.map((time) => (
            <div key={time} className={`flex gap-2 transition-all duration-300 ${selectedTime === time ? 'flex-row' : 'flex-col'}`}>
              <button
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 border rounded-md w-full transition-all font-semibold duration-300 ${
                  selectedTime === time
                    ? 'bg-gray-500 text-white border-gray-500'
                    : 'border-blue-500 text-blue-500 hover:border-blue-900 hover:text-blue-900'
                }`}
              >
                {time}
              </button>

              {selectedTime === time && (
                <button
                onClick={handleContinue}
                  className="py-2 px-4 border font-semibold text-gray-100 bg-blue-500 border-blue-500 rounded-md w-1/2 hover:bg-blue-500 hover:border-blue-900 transition-all duration-300"
                >
                  {strings.next}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] px-4 text-center text-gray-500">
          {strings.noAvailableDates}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
