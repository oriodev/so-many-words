import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { differenceInCalendarDays, differenceInDays, format, parseISO } from 'date-fns';
import { AllProjectData, Project, ProjectedAndActualWordcounts, Words } from "@/types";

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
export function getDuration(projectStartDate: string | Date, projectEndDate: string | Date): number {
  const startDate = typeof projectStartDate === 'string' ? parseISO(projectStartDate) : projectStartDate;
  const endDate = typeof projectEndDate === 'string' ? parseISO(projectEndDate) : projectEndDate;

  return differenceInDays(endDate, startDate) + 1;
}

/**
 * Returns words needed to write per day to reach wordcount given duration of time
 * @param words number
 * @param durationDays number
 * @returns number
 */
export function getWordsPerDay(words: number, durationDays: number): number {
  return Math.ceil(words / durationDays);
}

/**
 * Returns the number of words left to write to achieve wordcount goal
 * @param wordcountGoal number
 * @param totalWordsWritten number
 * @returns number
 */
export function getWordsLeftToWrite(wordcountGoal: number, totalWordsWritten: number): number {
  return wordcountGoal - totalWordsWritten;
}

/**
 * Returns the days remaining until the project end date
 * @param projectEndDate string
 */
export function getDaysRemaining(projectEndDate: string): number {
  const today = new Date();
  const end = new Date(projectEndDate);

  return differenceInDays(end, today);
}

/**
 * Get percentage completed
 * @param totalWords 
 * @param currentWords 
 * @returns 
 */
export function getPercentageCompleted(totalWords: number, currentWords: number): number {
  if (totalWords <= 0) return 0;
  return Math.ceil(( currentWords / totalWords ) * 100);
}

/**
 * Returns projected daily wordcounts in array of { date, wordcount }.
 * @param wordsPerDay number
 * @param startDate string
 * @param endDate string
 * @returns { date: Date, wordcount: number }[]
 */
export function getProjectedDailyWordcounts (wordsPerDay: number, startDate: string, endDate: string): { date: Date, wordcount: number }[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if ( start > end ) return [];

    const daysDifference = getDuration(start, end);

    const projectedWordcounts = Array.from({ length: daysDifference }, (_, index) => {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + index);
      return {
        date: currentDate,
        wordcount: wordsPerDay * (index + 1),
      };
    })

    return projectedWordcounts;
  }

/**
 * Returns an array of the current culminative wordcount over project's duration
 * @param wordCounts Words[]
 * @param startDate string
 * @param endDate string
 * @returns { date: Date, wordcount: number }[]
 */
export function getActualDailyWordcounts(wordCounts: Words[], startDate: string, endDate: string): { date: Date, wordcount: number }[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) return [];
  
  const daysDifference = getDuration(start, end);
  let culminativeWordcount = 0;
  
  const dateToWordsMap = new Map(wordCounts.map(
    (words) => [new Date(words.date).toISOString().split('T')[0], words.wordcount]
  ));
  
  const actualDailyWordcounts = Array.from({ length: daysDifference }, (_, index) => {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + index);
    const formattedDate = currentDate.toISOString().split('T')[0];

    if (dateToWordsMap.has(formattedDate)) {
      culminativeWordcount += dateToWordsMap.get(formattedDate) || 0;
    }
    
    return {
      date: currentDate,
      wordcount: culminativeWordcount
    };
  });

  return actualDailyWordcounts;
}

/**
 * Returns projected and actual wordcount arrays combined
 * @param projectedArray { wordcount: number, date: Date }[]
 * @param actualArray { wordcount: number, date: Date }[]
 * @returns { projectedWordcount: number, actualWordcount: number, date: Date }[]
 */
export function getCombineProjectedAndActualWordcountArrays(
  projectedArray: { wordcount: number, date: Date }[],
  actualArray: { wordcount: number, date: Date }[]
) {
  const projectedMap = new Map(projectedArray.map(
    item => [item.date.toISOString().split('T')[0], item.wordcount]));

  const combinedArray = actualArray.map(item => {
    const projectedWordcount = projectedMap.get(item.date.toISOString().split('T')[0]) || 0;
    return {
      projectedWordcount,
      actualWordcount: item.wordcount,
      date: item.date
    };
  });

  return combinedArray;

}

/**
 * From project and active states, return all project data and calculations
 * @param project 
 * @param wordCounts 
 * @param setWordCounts 
 * @param totalWordsWritten 
 * @param setTotalWordsWritten 
 * @returns so many things
 */
export function getAllProjectData(
  project: Project,
  wordCounts: Words[],
  setWordCounts: React.Dispatch<React.SetStateAction<Words[]>>,
  totalWordsWritten: number,
  setTotalWordsWritten: React.Dispatch<React.SetStateAction<number>>
): AllProjectData {

  // EXTRACT FROM PROJECT
  const { wordcountGoal, projectStartDate, projectEndDate } = project;
  
  // BASIC CALCULATIONS
  const durationDays = getDuration(projectStartDate, projectEndDate);
  const wordsLeftToWrite = getWordsLeftToWrite(wordcountGoal, totalWordsWritten);
  const currentWordsPerDay = getWordsPerDay(wordsLeftToWrite, durationDays);
  const initialWordsPerDay = getWordsPerDay(wordcountGoal, durationDays);
  const daysRemaining = getDaysRemaining(projectEndDate);
  const projectPercentageCompleted = getPercentageCompleted(wordcountGoal, totalWordsWritten);

  // DAILY WORD COUNT PROJECTIONS AND ACTUAL DATA
  const projectedDailyWordcounts = getProjectedDailyWordcounts(initialWordsPerDay, projectStartDate, projectEndDate);
  const actualDailyWordcounts = getActualDailyWordcounts(wordCounts, projectStartDate, projectEndDate);
  const projectedAndActualWordcounts = getCombineProjectedAndActualWordcountArrays(projectedDailyWordcounts, actualDailyWordcounts);

  // SHOVE THEM IN AN OBJECT AND RETURN THEM
  const allProjectData: AllProjectData = {
    project,
    durationDays,
    initialWordsPerDay,
    currentWordsPerDay,
    totalWordsWritten,
    setTotalWordsWritten,
    wordCounts,
    setWordCounts,
    wordsLeftToWrite,
    daysRemaining,
    projectPercentageCompleted,
    projectedAndActualWordcounts
  }

  return allProjectData;
}

/**
 * Calculates an updated wordcount goal given words already written for a specific day
 * @param projectEndDate 
 * @param date 
 * @param projectedAndActualWordcounts 
 * @param wordcountGoal 
 * @returns number
 */
export function getUpdatedWordcountGoalForGivenDay (
  projectEndDate: string, date: Date, 
  projectedAndActualWordcounts: ProjectedAndActualWordcounts,
  wordcountGoal: number
): number {
  // GET DAYS LEFT
  const remainingDays = differenceInCalendarDays(projectEndDate, date) + 1;
  const currentDay = projectedAndActualWordcounts.length - remainingDays;
  const wordsWritten = currentDay === 0 ? 0 : (projectedAndActualWordcounts[currentDay - 1].actualWordcount);
  const wordsLeftToWriteOnDate = wordcountGoal - wordsWritten;
  const wordcountGoalOnDate = Math.ceil(wordsLeftToWriteOnDate / remainingDays);
  
  return wordcountGoalOnDate;
}