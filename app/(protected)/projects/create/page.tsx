import { CreateProjectForm } from "@/components/forms/create-project-form";
import { SiteHeader } from "@/components/site-header";

export default async function CreateProject() {

  return (
    <div>
      <SiteHeader title="Create New Project" />
      <CreateProjectForm />
    </div>
  )
}



