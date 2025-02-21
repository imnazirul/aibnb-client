import { format } from 'date-fns';

export const formatCheckDate = (date: Date, dateFormat?: string) => {
  console.log(`formatCheckDate: ${date}`);
  if (!date) return '';
  return format(date, dateFormat || 'MMM d');
};

export const formatRangeDate = (startDate, endDate) => {
  if (!startDate || !endDate) return false;
  let template = `${formatCheckDate(startDate)} - ${formatCheckDate(endDate)}`;
  if (formatCheckDate(startDate, 'd M yyyy') === formatCheckDate(endDate, 'd M yyyy')) {
    template = `${formatCheckDate(startDate)} - ${
      parseInt(formatCheckDate(endDate, 'd')) + 1
    }`;
  }

  if (formatCheckDate(startDate, 'yyyy') !== formatCheckDate(endDate, 'yyyy')) {
    template = `${formatCheckDate(startDate, 'MMM d, yyyy')} - ${formatCheckDate(
      endDate,
      'MMM d, yyyy'
    )}`;
  }
  return template;
};
