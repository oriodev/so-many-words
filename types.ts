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
  created_at: string;
}

export type ProjectSchema = {
  title: string;
  description: string;
}
