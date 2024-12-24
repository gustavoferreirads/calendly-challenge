"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { format } from 'date-fns';
import { Schedule } from '@/features/appointments/types/schedule';

type AppointmentContextType = {
    date: Date | null
    setDate: React.Dispatch<React.SetStateAction<Date | null>>
    selectedTime: string | null
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
    availableTimes: string[] | null
    setAvailableTimes: React.Dispatch<React.SetStateAction<string[] | null>>
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    showScheduleForm: boolean;
    setShowScheduleForm: (value: boolean) => void;
    appointments: Schedule[]
    setAppointments: React.Dispatch<React.SetStateAction<Schedule[]>>
    formattedDate: string
    feedbackMessage: string | null
    setFeedbackMessage: React.Dispatch<React.SetStateAction<string | null>>
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
    const [date, setDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<Schedule[]>([])
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

    return (
        <AppointmentContext.Provider value={{
            date,
            setDate,
            selectedTime,
            setSelectedTime,
            availableTimes,
            setAvailableTimes,
            isLoading,
            setIsLoading,
            showScheduleForm,
            setShowScheduleForm,
            appointments,
            setAppointments,
            formattedDate: date ? format(date, "eeee, MMMM dd, yyyy") : "",
            feedbackMessage,
            setFeedbackMessage,
        }}>
            {children}

            {feedbackMessage && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
                    {feedbackMessage}
                </div>
            )}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = (): AppointmentContextType => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within a AppointmentProvider');
    }
    return context;
};
