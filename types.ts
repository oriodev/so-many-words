export type User = {
  id: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  username: string;
}

export type Project = {
  title: string;
  description: string;
  slug: string;
  wordcountGoal: number;
  projectStartDate: string;
  projectEndDate: string;
  createdAt: string;
}

export type ProjectSchema = {
  title: string;
  description: string;
  wordcountGoal: number;
  projectStartDate: Date;
  projectEndDate: Date;
}

export type Words = {
  projectId: string;
  wordcount: number;
  date: string;
}

export type WordsSchema = {
  wordcount: number;
  date: Date;
}