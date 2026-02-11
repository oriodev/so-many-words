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

interface ProjectTabsProps {
  userId: string;
  slug: string;
}

export default function ProjectTabs ({ userId, slug }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="overview" className="p-5">
        <TabsList variant={'line'}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="pt-5">
          <h2>Coming Soon</h2>
        </TabsContent>

        {/* ANALYTICS */}
        <TabsContent value="analytics" className="pt-5">
          <h2>Coming Soon</h2>
        </TabsContent>

        {/* SETTINIGS */}
        <TabsContent value="settings" className="pt-5 flex flex-col gap-5">
          <Separator />

          {/* DELETE DIALOG */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'} className="hover:cursor-pointer">Delete Project</Button>
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
                  onClick={() => deleteProject(userId, slug)}
                >Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            
        </TabsContent>
      </Tabs>
  )
}