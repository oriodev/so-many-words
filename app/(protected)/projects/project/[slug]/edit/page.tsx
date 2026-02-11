import { EditProjectForm } from "@/components/forms/edit-project-form";
import { SiteHeader } from "@/components/site-header";
import { getProject } from "@/lib/project.utils";
import { getUser } from "@/lib/user.utils";
import { redirect } from "next/navigation";

export default async function EditPage (
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const user = await getUser();
  if (!user) redirect('/login');
  
  const project = await getProject(user.id, slug);
  if (!project) redirect('/dashboard');

  return (
    <div>
      <SiteHeader
        title={`Edit ${project.title}`} 
        backBtnText={`Return to ${project.title}`}
        backBtnUrl={`/projects/project/${project.slug}`}
      />
      <EditProjectForm project={project} userId={user.id} slug={slug}/>
    </div>
  )
}