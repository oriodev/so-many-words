"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, SquareLibrary } from "lucide-react"
import { Project, User } from "@/types"
import { ModeToggle } from "./theme-toggle"
import { useProjectsStore } from "@/lib/providers/projects-store-provider"
import { useEffect } from "react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
  projects: Project[];
}

export function AppSidebar(
  { user, projects, ...props }: AppSidebarProps) 
{
  const { projects: ProjectsFromStore, setProjects } = useProjectsStore((state) => state);
  
  useEffect(() => {
    if (ProjectsFromStore.length === 0) {
      setProjects(projects);
    }
  }, [])

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: (
          <LayoutDashboardIcon
          />
        ),
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: (
          <Settings2Icon
          />
        ),
      },
    ],
    projects: ProjectsFromStore || []
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <SquareLibrary className="size-5!" />
                <span className="text-base font-semibold">So Many Words</span>
              </a>
            </SidebarMenuButton>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
