import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProjects } from "@/lib/project.utils";
import { getUser } from "@/lib/user.utils";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const user = await getUser();
    if (!user) redirect('/login');
    
    const projects = await getProjects(user.id);

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