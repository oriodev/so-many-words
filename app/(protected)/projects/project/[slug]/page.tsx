import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/lib/user.utils";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const user = await getUser();
  if (!user) redirect('/login');

  const projectUrl = `${process.env.BASE_URL}/api/projects/${user.id}/${slug}`;
  const fetchedProject = await fetch(projectUrl);
  if (!fetchedProject) redirect('/dashboard');

  const project = (await fetchedProject.json())[0];

  return (
    <div>
      <SiteHeader title={project.title}/>
    </div>
  )
}