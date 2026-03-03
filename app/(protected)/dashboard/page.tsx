import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
import { DashboardWordTotalCards } from "@/components/section-cards"

// import data from "./data.json"
import { SiteHeader } from "@/components/site-header"
import { getAllTimeTotalWordcount } from "@/lib/project.utils";
import { getUser } from "@/app/api/user.api";
import { getTotalWordcountGivenDate } from "@/lib/words.utils";
import { AllDashboardData } from "@/types";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  
  const user = await getUser();
  if (!user) redirect('/login');

  const today = new Date();

  const alltimeTotalWordcount = await getAllTimeTotalWordcount(user.id) || 0;
  const yearTotalWordcount = await getTotalWordcountGivenDate(today, 'year') || 0;
  const monthTotalWordcount = await getTotalWordcountGivenDate(today, 'month') || 0;
  const weekTotalWordcount = await getTotalWordcountGivenDate(today, 'week') || 0;

  const dashboardData: AllDashboardData = {
    alltimeTotalWordcount,
    yearTotalWordcount,
    monthTotalWordcount,
    weekTotalWordcount
  }
  
  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DashboardWordTotalCards dashboardData={dashboardData} user={user}/>
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </>
  )
}
