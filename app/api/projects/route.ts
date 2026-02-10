import { createClient } from "@/lib/supabase/server";

export const getProjects = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*");

  return projects || null;
}

