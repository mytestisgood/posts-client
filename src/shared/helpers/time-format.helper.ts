import { months } from '@shared/entities';

export type DateFormatView = 'dd-mm-yyyy' | 'yyyy-mm-dd' | 'mm-yyyy' | 'yyyy-mm';

const dateToday = new Date();
const dayOfWeekName:string = dateToday.toLocaleString('default', { weekday: 'short' });
const currentMonth: string = dateToday.toLocaleString('default', { month: 'short' });

export function formattedCurrentDateTo(format: DateFormatView): string {
  const today: Date = new Date();
  const yyyy: number = today.getFullYear();
  let mm: number | string = today.getMonth() + 1;
  let dd: number | string = today.getDate();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return doFormatDate(format, dd, mm, yyyy);
}

export function formattedMonthAndYearDateTo(month: number, year: number, format: DateFormatView): string {
  const dd: string = '01';
  let mm: string | number = month;

  if (month < 10) {
    mm = '0' + month;
  }
  return doFormatDate(format, dd, mm, year);
}

function doFormatDate(format: DateFormatView, dd: string | number, mm: string | number, yyyy: number): string {
  let newDd: string | number = dd;
  let newMm: string | number = mm;

  if (dd < '10') {
    newDd = '0' + dd;
  }
  if (mm < '10') {
    newMm = '0' + mm;
  }

  switch (format) {
    case 'dd-mm-yyyy':
      return newDd + '-' + newMm + '-' + yyyy;
    case 'yyyy-mm-dd':
      return yyyy + '-' + newMm + '-' + newDd;
    case 'mm-yyyy':
      return newMm + '-' + yyyy;
    case 'yyyy-mm':
      return yyyy + '-' + newMm;
  }
}

export function getYearFromStringDate(format: DateFormatView, date: string | undefined): string {
  if (!date) {
    return '';
  }

  const dateArray: string[] = date.split('-');

  switch (format) {
    case 'dd-mm-yyyy':
      return dateArray[2];
    case 'yyyy-mm-dd':
      return dateArray[0];
    default:
      return '';
  }
}

export function getMonthAndYearFromStringDate(format: DateFormatView, date: string | undefined): string {
  if (!date) {
    return '';
  }

  const dateArray: string[] = date.split('-');

  switch (format) {
    case 'dd-mm-yyyy':
      return dateArray[1] + '-' + dateArray[2];
    case 'yyyy-mm-dd':
      return dateArray[2] + '-' + dateArray[0];
    default:
      return '';
  }
}

export function formattedFromTextToNumericMonth(month: string): number {
  return months.indexOf(month) + 1;
}
export function getCurrentMonthStartDayDate(format: DateFormatView): string {
  const firstDay: Date = new Date(dateToday.getFullYear(), dateToday.getMonth(), 1);

  return doFormatDate(format, firstDay.getDate(), firstDay.getMonth() + 1, firstDay.getFullYear());
}

export function getCurrentMonthLastDayDate(format: DateFormatView): string {
  const lastDay: Date = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 0);

  return doFormatDate(format, lastDay.getDate(), lastDay.getMonth() + 1, lastDay.getFullYear());
}

export function getDayOfWeekAndCurrentDayDate(): string {
  return dayOfWeekName + ' ' + dateToday.getDay() + ' ' + currentMonth + ', ' + dateToday.getFullYear();
}