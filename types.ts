export type User = {
  id: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  username: string;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  slug: string;
  wordcountGoal: number;
  projectStartDate: string;
  projectEndDate: string;
  createdAt: string;
  totalWordsWritten: number;
}

export type ProjectSchema = {
  title: string;
  description: string;
  wordcountGoal: number;
  projectStartDate: Date;
  projectEndDate: Date;
}

export type Words = {
  id: string;
  projectId: string;
  wordcount: number;
  date: string;
}

export type WordsSchema = {
  projectId: string;
  wordcount: number;
  date: Date;
}

/**
 * Makes it easier to pass data between components in project pages
 */
export type AllProjectData = {
  project: Project;
  wordcountGoal: number;
  durationDays: number;
  initialWordsPerDay: number;
  wordsPerDay: number;
  totalWordsWritten: number;
  setTotalWordsWritten: React.Dispatch<React.SetStateAction<number>>;
  wordCounts: Words[];
  setWordCounts: React.Dispatch<React.SetStateAction<Words[]>>
  wordsLeftToWrite: number;
  daysRemaining: number;
  projectPercentageCompleted: number;
  projectedDailyWordcounts: { date: Date, wordcount: number }[]
  actualDailyWordcounts: { date: Date, wordcount: number }[]
}