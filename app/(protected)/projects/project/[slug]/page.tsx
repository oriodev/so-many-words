import ProjectTabs from "@/components/project-tabs";
import { SiteHeader } from "@/components/site-header";
import { getProject } from "@/lib/project.utils";
import { getUser } from "@/lib/user.utils";
import { getAllWords } from "@/lib/words.utils";
import { redirect } from "next/navigation";

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const user = await getUser();
  if (!user) redirect('/login');

  const project = await getProject(user.id, slug);
  if (!project) redirect('/dashboard');

  const allWordcounts = await getAllWords(user.id, project.id);

  return (
    <div>
      <SiteHeader title={project.title}/>
      <div className="p-5 flex flex-col gap-2">
        <div className="pl-3 pb-5 flex flex-col gap-2">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-sm italic">{project.description}</p>
        </div>
        <ProjectTabs userId={user.id} project={project} allWordcounts={allWordcounts || []}/>
      </div>
    </div>
  )
}