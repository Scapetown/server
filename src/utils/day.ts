import dayjs from 'dayjs';
import 'dayjs/locale/nl';

export default dayjs;
{
  dayjs.locale(navigator.language || process.env.LOCALE || 'en');
}
