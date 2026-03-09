'use server'

import { Project, ProjectSchema } from "@/types";
import { getUser } from "@/api/user.api";
import { createClient } from "@/lib/supabase/server";

/**
 * Gets all projects given a user id. Returns [] on failure.
 * @param userId string
 * @returns Project[] or []
 */
export const getProjects = async (userId: string): Promise<Project[]> => {
  const supabase = await createClient();

  const { data: fetchedProjects, error } = await supabase
    .from("projects")
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log('Error: ', error);
    return [] as Project[];
  }

  const projects: Project[] = fetchedProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    slug: project.slug,
    wordcountGoal: project.wordcount_goal,
    projectStartDate: project.project_start_date,
    projectEndDate: project.project_end_date,
    createdAt: project.created_at,
    totalWordsWritten: project.total_words_written,
    active: project.active
  }))
  return projects;
}

/**
 * Gets a project given a user id and project slug
 * @param userId 
 * @param slug 
 * @returns Project
 */
export const getProject = async (userId: string, slug: string): Promise<Project | null> => {
  const supabase = await createClient();

  const { data: fetchedProject, error } = await supabase
    .from("projects")
    .select('*')
    .eq('user_id', userId)
    .eq('slug', slug)
    .single();

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  return {
    id: fetchedProject.id,
    title: fetchedProject.title,
    description: fetchedProject.description,
    slug,
    wordcountGoal: fetchedProject.wordcount_goal,
    projectStartDate: fetchedProject.project_start_date,
    projectEndDate: fetchedProject.project_end_date,
    createdAt: fetchedProject.created_at,
    totalWordsWritten: fetchedProject.total_words_written,
    active: fetchedProject.active
  };
}

/**
 * Creates a project
 * @param data ProjectSchema { title, description }
 */
export const createProject = async (data: ProjectSchema): Promise<void | null> => {
  const user = await getUser();
  if (!user) return null;

  const { title, description, wordcountGoal, projectStartDate, projectEndDate } = data;

  
  if (!title) {
    console.log('Error: Missing title');
    return null;
  }
  
  const supabase = await createClient();

  const { data: createdProject, error } = await supabase
    .from('projects')
    .insert([
      { title, 
        description, 
        wordcount_goal: wordcountGoal, 
        project_start_date: projectStartDate, 
        project_end_date: projectEndDate, 
        user_id: user.id  },
    ])
    .select()
    .single();

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  return createdProject;
  
}

export const editProject = async (userId: string, slug: string, project: ProjectSchema): Promise<void | null> => {
  const { title, description, wordcountGoal, projectStartDate, projectEndDate, active } = project;

  const supabase = await createClient();

  const { data: editedProject, error } = await supabase
    .from('projects')
    .update(
      { title, 
        description,
        wordcount_goal: wordcountGoal, 
        project_start_date: projectStartDate, 
        project_end_date: projectEndDate,
        active: active
      })
    .eq('user_id', userId)
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  return editedProject;
}

/**
 * Deletes a project given a user ID and string
 * @param userId string
 * @param slug string
 * @returns 
 */
export const deleteProject = async (userId: string, slug: string): Promise<void | null> => {
  const supabase = await createClient();

  const { data: deletedProject, error } = await supabase
    .from('projects')
    .delete()
    .eq('user_id', userId)
    .eq('slug', slug);

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  return deletedProject;

}

/**
 * Gets total wordcount across all projects
 * @param userId 
 * @returns number
 */
export const getAllTimeTotalWordcount = async (userId: string): Promise<number | null> => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select('total_words_written', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    console.log('Error: ', error);
    return null;
  }

  const totalWordsWritten = data.reduce((sum, project) => {
    return sum + (project.total_words_written || 0);
  }, 0);
  
  return totalWordsWritten;
}