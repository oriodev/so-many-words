import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export function SiteHeader({
  title,
  backBtnText="Return",
  backBtnUrl
}: {
  title: string;
  backBtnText?: string;
  backBtnUrl?: string;
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="w-full flex justify-between">
          <h1 className="text-base font-medium">{title}</h1>
          { backBtnUrl &&
            ( <Link href={backBtnUrl} className="flex gap-2">
                <ChevronsLeft size={20} />
                <p>{backBtnText}</p>
              </Link> )
          }
        </div>
      </div>
    </header>
  )
}
