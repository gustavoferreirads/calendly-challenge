import { useAppointments } from '@/features/appointments/contexts/AppointmentContext';
import React from 'react';
import CustomDatePicker from '@/components/DatePicker';
import TimeSlots from '@/components/TimeSlots';
import Header from './Header';
import useLoadAvailableTimes from '../hooks/useLoadAvailableTimes';
import ScheduleForm from '../screens/Schedule';
import useAppointmentActions from '@/features/appointments/hooks/useAppointmentsActions';
import clsx from 'clsx';

const Content: React.FC = () => {
  const { date, showScheduleForm, availableTimes, selectedTime, setDate, setSelectedTime } = useAppointments();
  const { isLoading } = useLoadAvailableTimes();
  const { handleShowScheduleForm, handleSchedule } = useAppointmentActions();
  const enableScheduleForm = date && selectedTime && showScheduleForm;

  return (
    <div className="flex flex-col w-full lg:w-auto p-8 justify-start items-start flex-grow">
      <Header />

      <div className="flex flex-col lg:flex-row w-full justify-start items-start flex-grow gap-4">
        {enableScheduleForm ? (
          <ScheduleForm onSubmit={handleSchedule} defaultValues={{ date: date, hour: selectedTime, email: '', name: '' }} />
        ) : (
          <>
            <div className={clsx('lg:flex-1', { 'lg:block hidden': true })}>
              <CustomDatePicker selectedDate={date} setSelectedDate={setDate} />
            </div>

            <div className={clsx('flex-1 w-full', { 'lg:hidden': !date })}>
              {!date && <CustomDatePicker selectedDate={date} setSelectedDate={setDate} />}
            </div>

            <div className="flex-1 w-full">
              {date && (
                <TimeSlots
                  selectedDate={date}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  availableTimes={availableTimes}
                  handleContinue={handleShowScheduleForm}
                  isLoading={isLoading}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
