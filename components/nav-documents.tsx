"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Project } from "@/types"
import { MoreHorizontalIcon, FolderIcon, ShareIcon, Trash2Icon, Book } from "lucide-react"
import { useRouter } from "next/navigation"

export function NavDocuments({
  projects,
}: {
  projects: Project[]
}) {
  const router = useRouter();
  const { isMobile } = useSidebar()
  const numOfProjects = projects.length;

  const cappedProjects = projects.slice(0, 10);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects ({numOfProjects})</SidebarGroupLabel>
      <SidebarMenu>
        {cappedProjects.map((project) => (
          <SidebarMenuItem key={project.title}>
            <SidebarMenuButton asChild tooltip={project.title}>
              <a href={`/projects/project/${project.slug}`}>
                <Book />
                <span>{project.title}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <MoreHorizontalIcon
                  />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon
                  />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon
                  />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon
                  />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {
          numOfProjects > 10 && (
            <SidebarMenuItem
              onClick={() => router.push('/profile')}
              className="hover:cursor-pointer"
            >
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontalIcon className="text-sidebar-foreground/70" />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
