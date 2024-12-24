import React from 'react';
import { strings } from '@/const/strings';
import { useAppointments } from '@/features/appointments/contexts/AppointmentContext';

const Header = () => {
    const { selectedTime } = useAppointments();
    return (
        <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">{selectedTime ? strings.enterDetails : strings.selectDateTime}</h1>
        </div>
    );
};

export default Header;
