'use server'

import { Words, WordsSchema } from "@/types";
import { getUser } from "./user.api";
import { endOfWeek, format, parseISO, startOfWeek, subDays, subMonths, subYears } from "date-fns";
import { createClient } from "@/lib/supabase/server";

/**
 * Gets a days wordcount given a user id, project slug, and date
 * @param userId string
 * @param slug string
 * @param date string
 * @returns Words
 */
export const getWords = async (userId: string, projectId: string, date: string): Promise<Words | null> => {
    const supabase = await createClient();
  
    const { data: fetchedWords, error } = await supabase
      .from("words")
      .select('*')
      .eq('user_id', userId)
      .eq('project_id', projectId)
      .eq('date', new Date(date));

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  const words = fetchedWords[0];

  return {
    id: words.id,
    projectId: words.project_id,
    wordcount: words.wordcount,
    date: date
  } as Words;
}

export const getAllWordsGivenTime = async ( userId: string, timeframe: '7d' | '30d' | '365d' ): Promise<Words[] | null> => {
  const supabase = await createClient();
  const now = new Date();
  let cutoffDate: Date;

  switch (timeframe) {
    case '7d':
      cutoffDate = subDays(now, 7);
      break;
    case '30d':
      cutoffDate = subMonths(now, 1);
      break;
    case '365d':
      cutoffDate = subYears(now, 1);
      break;
    default:
      return null;
  }

   const cutoffDateISO = cutoffDate.toISOString();

  const { data: fetchedWords, error } = await supabase
    .from("words")
    .select('*')
    .eq('user_id', userId)
    .gt('date', cutoffDateISO);

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  const words = fetchedWords.map((word) => ({
    id: word.id,
    projectId: word.project_id,
    wordcount: word.wordcount,
    date: word.date
  }))

  return words as Words[];
}

/**
 * Gets all wordcounts for a probject given a user id and projectId
 * @param userId string
 * @param projectId string
 * @returns Words
 */
export const getAllWordsGivenProject = async (userId: string, projectId: string): Promise<Words[] | null> => {
  const supabase = await createClient();

  const { data: fetchedWords, error } = await supabase
    .from("words")
    .select('*')
    .eq('user_id', userId)
    .eq('project_id', projectId);

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  const words = fetchedWords.map((word) => ({
    id: word.id,
    projectId: word.project_id,
    wordcount: word.wordcount,
    date: word.date
  }))

  return words as Words[];
}

/**
 * Creates a new words entry
 * @param data WordsSchema { projectId, wordcount, date }
 */
export const createWords = async (data: WordsSchema): Promise<Words | null> => {
  const user = await getUser();
  if (!user) return null;

  const { projectId, wordcount, date } = data;

  if (!projectId || !wordcount || !date) {
    console.log('need projectId, wordcount, and date');
    return null;
  }

  const supabase = await createClient();

  const { data: createdWord, error } = await supabase
    .from('words')
    .insert([
      { project_id: projectId,
        wordcount,
        date,
        user_id: user.id  },
    ])
    .select();

  if (error) {
    console.log('error: ', error);
    return null;
  }

  const word = createdWord[0];
  return {
    id: word.id,
    projectId: word.project_id,
    wordcount: word.wordcount,
    date: word.date
  } as Words;
  
}

/**
 * Update the wordcount on a word
 * @param userId string
 * @param slug string
 * @param date string
 * @param wordcount number
 * @returns Words
 */
export const updateWord = async (wordsId: string, wordcount: number): Promise<Words | null> => {
  const supabase = await createClient();

  const { data: updatedWord, error } = await supabase
    .from('words')
    .update({ wordcount })
    .eq('id', wordsId)
    .select();

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  return updatedWord[0];
}

export const getTotalWordcountGivenDate = async (date: Date, period: string): Promise<number | null> => {
  const user = await getUser();
  if (!user) return null;

  const formattedDate = format(date, 'yyyy-MM-dd');
  const supabase = await createClient();
  
  if (period !== 'year' && period !== 'month' && period !== 'week' && period !== 'day') {
    console.log('Period must be year, month, week, or day');
    return null;
  }
  
  const parsedDate = parseISO(formattedDate);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // returns jan as 0 by default
  
  let startDate;
  let endDate;
  
  if (period === 'year') {
    startDate = `${year}-01-01`;
    endDate = `${year + 1}-01-01`;
  }

  if (period === 'month') {
    startDate = `${year}-${month}-01`;
    endDate = `${year}-${month + 1}-01`;
  }

  if (period === 'week') {
    const startOfWeekDate = startOfWeek(parsedDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(parsedDate, { weekStartsOn: 1 });

    startDate = format(startOfWeekDate, 'yyyy-MM-dd');
    endDate = format(endOfWeekDate, 'yyyy-MM-dd');
  }
  
  if (period === 'day') {
    startDate = formattedDate;
    endDate = format(new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
  }

  const { data: words, error } = await supabase
    .from("words")
    .select('wordcount')
    .eq('user_id', user.id)
    .gte('date', startDate)
    .lt('date', endDate);

  if (error) {
    console.log('Error: ', error);
    return null;
  }
  
  const totalWordCount = words.reduce((acc, item) => acc + (item.wordcount || 0), 0);
  return totalWordCount;
}
