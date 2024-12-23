import { FindAllGetResponse, FindAllPromiseResponse, FindByFilters } from "@/features/appointments/types/appointment";
import api from "@/lib/api";
import { format, isAfter, isBefore, parseISO } from "date-fns";

enum ApiEndpoint {
  AVAILABILITIES = '/appointment_availabilities/available_times'
}
class AppointmentService {
  async findAll(filters: FindByFilters): Promise<FindAllPromiseResponse> {
    const params = {
      start_date_time: filters.start_date_time?.toISOString().replace('.000Z', ''),
      end_date_time: filters.end_date_time?.toISOString().replace('.000Z', ''),
    };

    const month = filters.start_date_time?.getMonth();
    let mockResponseName = 'Default';
  
    if (month === 11) mockResponseName = 'Dec2024';
    else if (month === 0) mockResponseName = 'Jan2025';
    else if (month === 1) mockResponseName = 'Feb2025';
  
    const response = await api.get<FindAllGetResponse>(ApiEndpoint.AVAILABILITIES, {
      params,
      headers: { 'x-mock-response-name': mockResponseName },
    });
  
    const filteredTimes = response.data.data.available_times.filter((time) => {
      const timeDate = parseISO(time);
      return (
        (filters.start_date_time && isAfter(timeDate, filters.start_date_time)) &&
        (filters.end_date_time && isBefore(timeDate, filters.end_date_time))
      );
    });

    const formattedTimes = filteredTimes.map((time) => format(parseISO(time), "HH:mm"));

    return {
      available_times: formattedTimes,
    };
  }
}

export default new AppointmentService();
