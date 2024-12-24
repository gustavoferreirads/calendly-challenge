import clsx from 'clsx';
import React, { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isToday, isWeekend, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { getWeekdays } from '@/helpers/helpers';

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CustomCalendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    if (currentMonth.getMonth() !== new Date().getMonth()) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const startOfCalendar = startOfWeek(start);
    const endOfCalendar = endOfWeek(end);

    const days = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });
    return days;
  };

  const isPastDate = (date: Date) => {
    return date < new Date();
  };

  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentMonth.getMonth();
  };

  const isWeekendOrHoliday = (day: Date) => {
    return isWeekend(day);
  };

  const renderDayCell = (day: Date) => {
    const isPast = isPastDate(day) && !isToday(day);
    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
    const isFromOtherMonth = !isCurrentMonth(day);
    const isHolidayOrWeekend = isWeekendOrHoliday(day);

    let dayClass = 'rounded-full p-2 flex justify-center items-center ';
    if (isFromOtherMonth) {
      dayClass += 'bg-transparent text-transparent';
    } else {
      dayClass += isPast || isHolidayOrWeekend ? 'bg-transparent text-gray-400' : `bg-blue-100 ${isSelected ? 'text-gray-100' : 'text-blue-600'} font-semibold`;
      dayClass += isSelected ? ' bg-blue-600 font-semibold' : '';
    }

    return (
        <button
            key={day.toString()}
            className={dayClass}
            onClick={() => !isPast && !isHolidayOrWeekend && setSelectedDate(day)}
            disabled={isPast || isHolidayOrWeekend}
        >
          <div className="relative">
            {format(day, 'd')}
          </div>
        </button>
    );
  };

  const weekdays = getWeekdays();
  const daysInMonth = getDaysInMonth();

  return (
      <div
          className={clsx(
              'w-full flex flex-col gap-4',
              'lg:min-w-[340px]',
              'min-w-[calc(90vw-48px)]'
          )}
      >
        <div className="flex items-center justify-center gap-8 mb-4">
          <button
              onClick={handlePrevMonth}
              disabled={currentMonth.getMonth() === new Date().getMonth()}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 disabled:bg-transparent disabled:text-transparent`}
          >
            <LuChevronLeft />
          </button>
          <span className="text-base font-normal">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
          <button
              onClick={handleNextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600"
          >
            <LuChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2">
          {weekdays.map((weekday) => (
              <div key={weekday} className="text-gray-500">
                {weekday}
              </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day) => renderDayCell(day))}
        </div>
      </div>
  );
};

export default CustomCalendar;
