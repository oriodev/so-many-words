import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/user.utils";
import { Project, User } from "@/types";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const user = await getUser();
    if (!user) redirect('/login');
    
    let projects: Project[] = [];
    const projectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${user.id}`;
    const fetchedProjects = await fetch(projectUrl);
    if (fetchedProjects.status === 200) {
      projects = await fetchedProjects.json();
    }

    return (
        <div>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" user={user} projects={projects}/>
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default ProtectedLayout;