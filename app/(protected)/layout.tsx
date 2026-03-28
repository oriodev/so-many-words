import { getUser } from "@/api/user.api";
import { AppSidebar } from "@/components/misc/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProjects } from "@/api/project.api";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const user = await getUser();
    if (!user) redirect('/login');
    
    const projects = await getProjects(user.id);
    const activeProjects = projects.filter(project => project.active);

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
            <AppSidebar variant="inset" user={user} projects={activeProjects}/>
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default ProtectedLayout;