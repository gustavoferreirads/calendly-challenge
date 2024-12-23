import { useAppointments } from "@/features/appointments/contexts/AppointmentContext";
import appointmentService from "@/features/appointments/services/appointment.service";
import { format, isSameDay, setHours, setMinutes, setSeconds } from "date-fns";
import { useCallback, useEffect } from "react";

export default function useLoadAvailableTimes() {
  const {
    availableTimes,
    isLoading,
    setAvailableTimes,
    setIsLoading,
    date,
    selectedTime,
    setSelectedTime,
    appointments,
  } = useAppointments();

  const loadAvailableTimes = useCallback(async () => {
    if (!date) return;

    setIsLoading(true);
    setAvailableTimes([]);
    setSelectedTime(null);

    const startDateTime = format(
      setSeconds(setMinutes(setHours(date, 8), 0), 0),
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    const endDateTime = format(
      setSeconds(setMinutes(setHours(date, 23), 59), 59),
      "yyyy-MM-dd'T'HH:mm:ss"
    );

    try {
      const { available_times } = await appointmentService.findAll({
        start_date_time: new Date(startDateTime),
        end_date_time: new Date(endDateTime),
      });
      const filteredTimes = available_times.filter((time) => {
        return !appointments.some(
          (appointment) =>
            isSameDay(appointment.date, date) && appointment.hour === time
        );
      });

      setAvailableTimes(filteredTimes);
    } catch (error) {
      console.error("Error loading available times:", error);
      setAvailableTimes([]);
    } finally {
      setIsLoading(false);
    }
  }, [date, setAvailableTimes, setIsLoading, setSelectedTime, appointments]);

  useEffect(() => {
    loadAvailableTimes();
  }, [date]);

  return {
    isLoading,
    availableTimes,
    selectedTime,
  }
}
