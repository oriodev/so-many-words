import { Words, WordsSchema } from "@/types";
import { getUser } from "./user.utils";

/**
 * Gets a days wordcount given a user id, project slug, and date
 * @param userId string
 * @param slug string
 * @param date string
 * @returns Words
 */
export const getWords = async (userId: string, projectId: string, date: string): Promise<Words | null> => {
  const wordsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/words/user/${userId}/${projectId}/${date}`;
  const fetchedWords = await fetch(wordsUrl);

  if (!fetchedWords.ok) return null;

  const words = (await fetchedWords.json())[0];
  return {
    id: words.id,
    projectId: words.project_id,
    wordcount: words.wordcount,
    date: date
  } as Words;
}

/**
 * Gets all wordcounts for a probject given a user id and projectId
 * @param userId string
 * @param projectId string
 * @returns Words
 */
export const getAllWords = async (userId: string, projectId: string): Promise<Words[] | null> => {
  const wordsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/words/user/${userId}/${projectId}`;
  const fetchedWords = await fetch(wordsUrl);

  if (!fetchedWords.ok) return null;

  const words = (await fetchedWords.json());
  // @ts-expect-error because i'm not typing word there
  const formattedWords = words.map((word) => ({
    id: word.id,
    projectId: word.project_id,
    wordcount: word.wordcount,
    date: word.date
  }))
  return formattedWords as Words[];
}

/**
 * Creates a new words entry
 * @param data WordsSchema { projectId, wordcount, date }
 */
export const createWords = async (data: WordsSchema): Promise<Words | null> => {
  const user = await getUser();
  if (!user) return null;

  const { projectId, wordcount, date } = data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/words/user/${user.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, wordcount, date }),
  });

  if (!response.ok) {
    return null;
  }

  const returnedWords = (await response.json())['data'][0];
  return {
    id: returnedWords.id,
    projectId: returnedWords.project_id,
    wordcount: returnedWords.wordcount,
    date: returnedWords.date
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
  const wordsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/words/${wordsId}`;
  const response = await fetch(wordsUrl, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ wordcount })
  })

  if (!response.ok) {
    const error = await response.json();
    console.log('Update Words Error: ', error);
    return null;
  }

  const tempRes = await response.json()

  // const returnResponse = (await response.json())['data'][0];
  return tempRes;
}

