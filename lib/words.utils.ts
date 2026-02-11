import { Words } from "@/types";

/**
 * Gets a days wordcount given a user id, project slug, and date
 * @param userId string
 * @param slug string
 * @param date string
 * @returns Words
 */
export const getWords = async (userId: string, projectId: string, date: string): Promise<Words | null> => {
  const wordsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/words/${userId}/${projectId}/${date}`;
  const fetchedWords = await fetch(wordsUrl);

  if (!fetchedWords.ok) return null;

  const words = (await fetchedWords.json())[0];
  return {
    projectId: words.project_id,
    wordcount: words.wordcount,
    date: date
  } as Words;
}