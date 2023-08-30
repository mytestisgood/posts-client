import { months } from '@shared/entities';

export function formattedFromTextToNumericMonth(month: string): number {
  return months.indexOf(month) + 1;
}