'use server'

import { ProfileSchema } from "@/types";
import { createClient } from "./supabase/server";

export const updateProfile = async (updatedProfile: ProfileSchema) => {
  const { id, yearlyWordGoal, monthlyWordGoal, weeklyWordGoal } = updatedProfile;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .update(
      {
        yearly_word_goal: yearlyWordGoal,
        monthly_word_goal: monthlyWordGoal,
        weekly_word_goal: weeklyWordGoal
      }
    )
    .eq('id', id)
    .select();

    if (error) {
      console.log('error updating profile: ', error);
      return null;
    }

    return data;
}
