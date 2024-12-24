import { strings } from "@/const/strings";
import { Schedule } from "@/features/appointments/types/schedule";
import { useAppointments } from "@/features/appointments/contexts/AppointmentContext";

const FEEDBACK_TIMEOUT = 3000;

export default function useAppointmentActions() {
  const {
    setFeedbackMessage,
    setAppointments,
    setAvailableTimes,
    setSelectedTime,
    setDate,
    setShowScheduleForm
  } = useAppointments();

  const handleShowScheduleForm = () => {
    setShowScheduleForm(true)
  }

  const handleGoBack = () => {
    setShowScheduleForm(false)
    setSelectedTime('')
    setAvailableTimes([])
    setDate(null)
  }

  const handleSchedule = (data: Schedule) => {
    setAppointments((prevState) => [...prevState, data]);
    setFeedbackMessage(strings.appointmentScheduled);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, FEEDBACK_TIMEOUT);
    handleGoBack()
  };

  return {
    handleSchedule,
    handleGoBack,
    handleShowScheduleForm
  }
}
