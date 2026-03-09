import { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  createdAt: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  username: string;
  yearlyWordGoal: number;
  monthlyWordGoal: number;
  weeklyWordGoal: number;
  dailyWordGoal: number;
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
  active: boolean;
}

export type ProfileSchema = {
  id: string;
  yearlyWordGoal: number;
  monthlyWordGoal: number;
  weeklyWordGoal: number;
  dailyWordGoal: number;
}

export type ProjectSchema = {
  title: string;
  description: string;
  wordcountGoal: number;
  projectStartDate: Date;
  projectEndDate: Date;
  active: boolean;
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
  durationDays: number;
  initialWordsPerDay: number;
  currentWordsPerDay: number;
  totalWordsWritten: number;
  setTotalWordsWritten: React.Dispatch<React.SetStateAction<number>>;
  wordCounts: Words[];
  setWordCounts: React.Dispatch<React.SetStateAction<Words[]>>
  wordsLeftToWrite: number;
  daysRemaining: number;
  projectPercentageCompleted: number;
  projectedAndActualWordcounts: ProjectedAndActualWordcounts;
}

export type AllDashboardData = {
  alltimeTotalWordcount: number;
  yearTotalWordcount: number;
  monthTotalWordcount: number;
  weekTotalWordcount: number;
  dayTotalWordcount: number;
  lastYearTotalWordcount: number;
  lastMonthTotalWordcount: number;
  lastWeekTotalWordcount: number;
  yesterdayTotalWordcount: number;
}

export type ProjectedAndActualWordcounts = { projectedWordcount: number, actualWordcount: number, date: Date }[];

export type ProgressBadge = {
  text: string;
  icon: LucideIcon;
  colour: string;
}