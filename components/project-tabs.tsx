'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteProject } from "@/lib/project.utils";
import { redirect } from "next/navigation";
import { useProjectsStore } from "@/lib/providers/projects-store-provider";

interface ProjectTabsProps {
  userId: string;
  slug: string;
}

export default function ProjectTabs ({ userId, slug }: ProjectTabsProps) {

  const { deleteProject: deleteProjectFromStore } = useProjectsStore((state) => state);

  const handleDelete = async () => {
    const response = await deleteProject(userId, slug);
    if (!response) return;
    deleteProjectFromStore(slug);
    
    redirect('/dashboard');
  }

  const handleEdit = async () => {
    redirect(`/projects/project/${slug}/edit`);
  }

  return (
    <Tabs defaultValue="overview">
        <TabsList variant={'line'}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="pt-5 pl-2">
          <h2>Coming Soon</h2>
        </TabsContent>

        {/* ANALYTICS */}
        <TabsContent value="analytics" className="pt-5 pl-2">
          <h2>Coming Soon</h2>
        </TabsContent>

        {/* SETTINIGS */}
        <TabsContent value="settings" className="pt-5 pl-2 flex flex-col gap-5">
          <Separator />

          <div className="flex gap-2">

            <Button onClick={handleEdit}>Edit Project</Button>

            {/* DELETE DIALOG */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete Project</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your project from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Nooo I take it back</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                  >Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

 
        </TabsContent>
      </Tabs>
  )
}