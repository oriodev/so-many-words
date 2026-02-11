import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats date into 'ddth mmm yyyy' given a date
 * @param dateInput string | date
 * @returns string
 */
export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;

  const day = format(date, 'do');
  const month = format(date, 'MMM');
  const year = format(date, 'yyyy');
  
  return `${day} ${month} ${year}`;
}

/**
 * Returns duration of time between two dates
 * @param projectStartDate string
 * @param projectEndDate string
 * @returns number
 */
export function getDuration(projectStartDate: string, projectEndDate: string): number {
  const startDate = parseISO(projectStartDate);
  const endDate = parseISO(projectEndDate); 

  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1; 
}

/**
 * Returns words needed to write per day to reach wordcount given duration of time
 * @param wordcountGoal number
 * @param durationDays number
 * @returns number
 */
export function getWordsPerDay(wordcountGoal: number, durationDays: number): number {
  return Math.ceil(wordcountGoal / durationDays);
}
