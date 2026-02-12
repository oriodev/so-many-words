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
import { AllProjectData, Project, Words } from "@/types";
import { getActualDailyWordcounts, getDaysRemaining, getDuration, getPercentageCompleted, getProjectedDailyWordcounts, getWordsLeftToWrite, getWordsPerDay } from "@/lib/utils";
import ProjectGoalsCard from "./cards/project-goals-card";
import ProjectProgressCard from "./cards/project-progress-card";
import DailyProgressCard from "./cards/daily-progress.card";
import { useState } from "react";
import DailyProgressChartCard from "./cards/daily-progress-chart-card";

interface ProjectTabsProps {
  userId: string;
  project: Project;
  allWordcounts: Words[];
}

export default function ProjectTabs ({ userId, project, allWordcounts }: ProjectTabsProps) {
  const [wordCounts, setWordCounts] = useState<Words[]>(allWordcounts);
  const [totalWordsWritten, setTotalWordsWritten] = useState<number>(project.totalWordsWritten);

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
  const wordsLeftToWrite = getWordsLeftToWrite(wordcountGoal, totalWordsWritten);
  const wordsPerDay = getWordsPerDay(wordsLeftToWrite, durationDays);
  const initialWordsPerDay = getWordsPerDay(wordcountGoal, durationDays);
  const daysRemaining = getDaysRemaining(projectEndDate);
  const projectPercentageCompleted = getPercentageCompleted(wordcountGoal, totalWordsWritten);
  const projectedDailyWordcounts = getProjectedDailyWordcounts(initialWordsPerDay, projectStartDate, projectEndDate);
  const actualDailyWordcounts = getActualDailyWordcounts(wordCounts, projectStartDate, projectEndDate);

  const allProjectData: AllProjectData = {
    project,
    wordcountGoal,
    durationDays,
    initialWordsPerDay,
    wordsPerDay,
    totalWordsWritten,
    setTotalWordsWritten,
    wordCounts,
    setWordCounts,
    wordsLeftToWrite,
    daysRemaining,
    projectPercentageCompleted,
    projectedDailyWordcounts,
    actualDailyWordcounts
  }

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
            <ProjectGoalsCard allProjectData={allProjectData} />
            <ProjectProgressCard allProjectData={allProjectData} />
          </div>
          <DailyProgressCard allProjectData={allProjectData} userId={userId} />
          <DailyProgressChartCard allProjectData={allProjectData} />
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