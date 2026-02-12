'use server'

import { Project, ProjectSchema } from "@/types";
import { getUser } from "./user.utils";

/**
 * Gets all projects given a user id. Returns [] on failure.
 * @param userId string
 * @returns Project[] or []
 */
export const getProjects = async (userId: string): Promise<Project[]> => {
  const projectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${userId}`;
  const fetchedProjects = await fetch(projectUrl);

  if (!fetchedProjects.ok) return [] as Project[];

  const projects: Project[] = await fetchedProjects.json();
  return projects;
}

/**
 * Gets a project given a user id and project slug
 * @param userId 
 * @param slug 
 * @returns Project
 */
export const getProject = async (userId: string, slug: string): Promise<Project | null> => {
  const projectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${userId}/${slug}`;
  const fetchedProject = await fetch(projectUrl);
  if (!fetchedProject) return null;

  const project = (await fetchedProject.json())[0];
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    slug,
    wordcountGoal: project.wordcount_goal,
    projectStartDate: project.project_start_date,
    projectEndDate: project.project_end_date,
    createdAt: project.created_at,
    totalWordsWritten: project.total_words_written
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${user.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, wordcountGoal, projectStartDate, projectEndDate }),
  });

  if (!response.ok) {
    return null;
  }

  const returnedProject = (await response.json())['data'][0];
  return returnedProject;
  
}

export const editProject = async (userId: string, slug: string, project: ProjectSchema): Promise<void | null> => {
  const editUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${userId}/${slug}`;
  const response = await fetch(editUrl, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ project })
  })

  if (!response.ok) {
    const error = await response.json();
    console.log('Edit Error: ', error);
    return null;
  }

  const returnResponse = (await response.json())['data'][0];
  return returnResponse;
}

/**
 * Deletes a project given a user ID and string
 * @param userId string
 * @param slug string
 * @returns 
 */
export const deleteProject = async (userId: string, slug: string): Promise<void | null> => {
  const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${userId}/${slug}`;
  const response = await fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    console.log('Delete Error: ', error);
    return null;
  }

  const returnResponse = await response.json();
  return returnResponse;

}