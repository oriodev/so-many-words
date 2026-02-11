// src/stores/counter-store.ts
import { Project } from '@/types'
import { createStore } from 'zustand/vanilla'

export type ProjectsState = {
  projects: Project[]
}

export type ProjectsActions = {
  setProjects: (projects: Project[]) => void
  addProject: (newProject: Project) => void
  deleteProject: (projectTitle: string) => void
  editProject: (projectTitle: string, newTitle: string) => void
}

export type ProjectsStore = ProjectsState & ProjectsActions;

export const defaultInitState: ProjectsState = {
  projects: [],
}

export const createProjectsStore = (
  initState: ProjectsState = defaultInitState,
) => {
  return createStore<ProjectsStore>()((set) => ({
    ...initState,
    setProjects: (projects: Project[]) => set(() => ({
      projects: [...projects],
    })),
    addProject: (newProject: Project) => set((state) => ({
      projects: [...state.projects, newProject],
    })),
    deleteProject: (projectSlug: string) => set((state) => ({
      projects: state.projects.filter(project => project.slug !== projectSlug),
    })),
    editProject: (projectTitle: string, newTitle: string) => set((state) => {
      const updatedProjects = state.projects.map(project => 
        project.title === projectTitle ? { ...project, title: newTitle } : project
      );
      return { projects: updatedProjects };
    }),
  }))
}
