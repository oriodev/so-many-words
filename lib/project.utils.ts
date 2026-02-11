'use server'

import { Project, ProjectSchema } from "@/types";
import { redirect } from "next/navigation";
import { getUser } from "./user.utils";

/**
 * Gets a project given a user id and project slug
 * @param userId 
 * @param slug 
 * @returns 
 */
export const getProject = async (userId: string, slug: string): Promise<Project | null> => {
  const projectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${userId}/${slug}`;
  const fetchedProject = await fetch(projectUrl);
  if (!fetchedProject) return null;

  const project = (await fetchedProject.json())[0];
  return project;
}

/**
 * Creates a project
 * @param data ProjectSchema { title, description }
 */
export const createProject = async (data: ProjectSchema): Promise<void | null> => {
  const user = await getUser();
  if (!user) return null;

  const { title, description } = data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${user.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    return null;
  }

  const returnedProject = (await response.json())['data'][0];
  return returnedProject;
  
}

/**
 * Deletes a project given a user ID and string
 * @param userId string
 * @param slug string
 * @returns 
 */
export const deleteProject = async (userId: string, slug: string) => {
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
    return error;
  }

  redirect('/dashboard');

}