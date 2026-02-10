'use server'

import { createClient } from "./supabase/server";
import { User } from "@/types";

/**
 * Gets user data for logged in user.
 * @returns User | null
 */
export const getUser = async () => {
  const supabase = await createClient();
  const { data: { user: fetchedUser } } = await supabase.auth.getUser();
  if (!fetchedUser) return null;

  const user = {
    id: fetchedUser.id,
    ...fetchedUser.user_metadata,
  } as User;

  return user;

}