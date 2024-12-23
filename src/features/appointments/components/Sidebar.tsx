import Avatar from '@/components/Avatar';
import { strings } from '@/const/strings';
import { useAppointments } from '@/features/appointments/contexts/AppointmentContext';
import useAppointmentActions from '@/features/appointments/hooks/useAppointmentsActions';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { LuClock, LuVideo, LuArrowLeft, LuCalendar } from 'react-icons/lu';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const { showScheduleForm, date, selectedTime, formattedDate } = useAppointments();
  const { handleGoBack } = useAppointmentActions();

  return (
    <div className="w-full lg:w-auto lg:max-w-[390px] bg-white border-b lg:border-r border-gray-200 flex flex-col h-auto lg:h-[500px] relative">
      <div
        className={clsx(
          'absolute top-4 left-8 w-10 h-10 flex items-center justify-center border-2 border-blue-400 rounded-full cursor-pointer',
          date || showScheduleForm ? 'flex lg:flex' : 'hidden lg:hidden'
        )}
        onClick={handleGoBack}
      >
        <LuArrowLeft className="text-blue-400" size={20} />
      </div>

      <div className="h-[40%] py-4 lg:py-0 lg:h-[25%] border-b border-gray-200 flex items-center justify-center">
        <FaGithub size={100} className="text-gray-700 hidden lg:block" />
        <FaGithub size={50} className="text-gray-700 lg:hidden" />
      </div>

      <div className="h-[60%] lg:h-[75%] flex px-10 flex-col items-center lg:items-start gap-2 lg:gap-4 mt-4 mb-12 lg:mb-0">
        <div className="flex flex-col items-center lg:items-start w-full gap-2">
          <div className={clsx('flex-col items-center lg:items-start gap-2', { 'hidden lg:flex': true })}>
            <Avatar />
            <p className="text-base text-gray-500 font-semibold">{strings.interviewer}</p>
          </div>

          <div className={clsx('flex lg:hidden flex-col items-center gap-2 w-full', { 'hidden': showScheduleForm })}>
            {!showScheduleForm && (
              <>
                <Avatar />
                <p className="text-base text-gray-500 font-semibold">{strings.interviewer}</p>
              </>
            )}
          </div>

          <p className="text-xl text-gray-900 font-bold">{strings.interviewLongText}</p>
        </div>

        <div className="flex flex-col justify-start gap-2 lg:gap-4 overflow-hidden w-full">
          <div className="flex items-center gap-2 text-gray-500 font-semibold flex-nowrap text-link lg:text-base">
            <LuClock size={20} className="text-gray-600" />
            <span>{strings.defaultInterviewTime}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 font-semibold text-link lg:text-base">
            <LuVideo className={clsx('text-gray-700', { 'hidden lg:flex': true })} size={32} />
            <LuVideo className={clsx('text-gray-700', { 'lg:hidden': true })} size={24} />
            <span>{strings.webConferencingDetails}</span>
          </div>

          {date && selectedTime && (
            <div className="flex items-start gap-2 text-gray-500 font-semibold text-link lg:text-base">
              <LuCalendar className="text-gray-600" size={18} />
              <span>{formattedDate}, {selectedTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
