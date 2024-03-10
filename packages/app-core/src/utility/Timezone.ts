import dayjs from 'dayjs';
import dayjsTimezone from 'dayjs/plugin/timezone';
dayjs.extend(dayjsTimezone);

export const guessUserTimezone = () => {
  return dayjs.tz.guess();
};
