export type DateFormatView = 'dd-mm-yyyy' | 'yyyy-mm-dd' | 'mm-yyyy' | 'yyyy-mm';

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
  let dd: string = '01';
  let mm: string | number = month;

  if (month < 10) {
    mm = '0' + month;
  }
  return doFormatDate(format, dd, mm, year);
}

function doFormatDate(format: DateFormatView, dd: string | number, mm: string | number, yyyy: number): string {
  switch (format) {
    case 'dd-mm-yyyy':
      return dd + '-' + mm + '-' + yyyy;
    case 'yyyy-mm-dd':
      return yyyy + '-' + mm + '-' + dd;
    case 'mm-yyyy':
      return mm + '-' + yyyy;
    case 'yyyy-mm':
      return yyyy + '-' + mm;
  }
}