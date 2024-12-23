import { eachDayOfInterval, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const getWeekdays = () => {
  const daysOfWeek = eachDayOfInterval({ start: new Date(), end: new Date(new
    Date().setDate(new Date().getDate() + 6)) });
  return daysOfWeek.map((day) => format(day, 'EEE', {locale: enUS}));
};