import { CreateProjectForm } from "@/components/forms/create-project-form";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/lib/user.utils";
import { ProjectSchema } from "@/types";
import { redirect } from "next/navigation";

export default async function CreateProject() {
  const user = await getUser();
  if (!user) redirect('/login');

  const handleCreateProject = async (data: ProjectSchema): Promise<void> => {
    'use server';
    
    const { title, description } = data;

    const response = await fetch(`${process.env.BASE_URL}/api/projects/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    
  }

  return (
    <div>
      <SiteHeader title="Create New Project" />
      <CreateProjectForm handleCreateProject={handleCreateProject} />
    </div>
  )
}



