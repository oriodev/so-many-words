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
import { Project } from "@/types";
import { getDuration, getWordsPerDay } from "@/lib/utils";
import ProjectGoalsCard from "./cards/project-goals-card";
import ProjectProgressCard from "./cards/project-progress-card";
import DailyProgressCard from "./cards/daily-progress.card";

interface ProjectTabsProps {
  userId: string;
  project: Project;
}

export default function ProjectTabs ({ userId, project }: ProjectTabsProps) {

  const { deleteProject: deleteProjectFromStore } = useProjectsStore((state) => state);
  const { slug, wordcountGoal, projectStartDate, projectEndDate } = project;

  const handleDelete = async () => {
    const response = await deleteProject(userId, slug);
    if (!response) return;
    deleteProjectFromStore(slug);
    
    redirect('/dashboard');
  }

  const handleEdit = async () => {
    redirect(`/projects/project/${slug}/edit`);
  }

  const durationDays = getDuration(projectStartDate, projectEndDate);
  const wordsPerDay = getWordsPerDay(wordcountGoal, durationDays);

  return (
    <Tabs defaultValue="overview">
        <TabsList variant={'line'}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="flex flex-col gap-5 pt-5 pl-2">
          <div className="w-full flex flex-col lg:flex-row gap-5">
            <ProjectGoalsCard projectStartDate={projectStartDate} projectEndDate={projectEndDate} wordcountGoal={wordcountGoal} durationDays={durationDays} wordsPerDay={wordsPerDay} />
            <ProjectProgressCard />
          </div>
          <DailyProgressCard project={project} userId={userId}/>
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