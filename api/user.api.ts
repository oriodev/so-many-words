'use server'

import { createClient } from "@/lib/supabase/server";
import { User } from "@/types";

/**
 * Gets user data for logged in user.
 * @returns User | null
 */
export const getUser = async () => {
  const supabase = await createClient();
  const { data: { user: fetchedUser } } = await supabase.auth.getUser();
  if (!fetchedUser) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('yearly_word_goal, monthly_word_goal, weekly_word_goal, daily_word_goal')
    .eq('id', fetchedUser.id)
    .single();

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  const user = {
    id: fetchedUser.id,
    createdAt: fetchedUser.created_at,
    ...fetchedUser.user_metadata,
    yearlyWordGoal: profile.yearly_word_goal,
    monthlyWordGoal: profile.monthly_word_goal,
    weeklyWordGoal: profile.weekly_word_goal,
    dailyWordGoal: profile.daily_word_goal,
  } as User;

  return user;

}