import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getUser } from "@/api/user.api";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getProjects } from "@/api/project.api";
import ProjectCard from "@/components/cards/project-card";

export default async function Profile() {
    const user = await getUser();
    if (!user) redirect('/login');

    const { yearlyWordGoal } = user;

    const projects = await getProjects(user.id);
    const activeProjects = projects.filter(project => project.active);
    const inactiveProjects = projects.filter(project => !project.active);

  return (
    <div className="w-full">
      <SiteHeader title="Profile" />
      
      <div className="p-5">

        {/* TOP PROFILE SECTION */}
        <div className="flex justify-between border-b-1 pb-5">
          <div className="flex gap-5">
            {/* PROFILE IMAGE */}
            <div className="flex justify-center items-center w-18 h-18 border-4 border-primary rounded-full overflow-hidden">
              <Image
                src={'/avatar.png'} 
                alt="Profile Picture" 
                width={50} 
                height={50}
              />
            </div>

            <div>
              <h2 className="text-2xl">@{user.username}</h2>
              <p className="italic">Aiming for {yearlyWordGoal.toLocaleString()} words this year.</p>
            </div>

          </div>

          <Link href={'/profile/edit'}>
            <Button>Edit Profile</Button>
          </Link>
        </div>

        {/* PROJECTS */}
        <div className="">
          {/* CURRENT PROJECTS */}
          <div className="flex flex-col gap-5 pt-5 border-b-1 pb-5">
            <h2 className="text-2xl">Current Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                activeProjects.map(project => (
                  <ProjectCard project={project} key={project.slug} />
                ))
              }
            </div>
          </div>

          {/* INACTIVE PROJECTS */}
          <div className="flex flex-col gap-5 pt-5 border-b-1 pb-5">
            <h2 className="text-2xl">Inactive Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                inactiveProjects.map(project => (
                  <ProjectCard project={project} key={project.slug} />
                ))
              }
            </div>
          </div>

        </div>


      </div>

      
      
    </div>
  )
}