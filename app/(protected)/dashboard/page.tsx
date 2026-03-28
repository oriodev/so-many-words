import { ChartAreaInteractive } from "@/components/misc/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
import { DashboardWordTotalCards } from "@/components/misc/section-cards"

// import data from "./data.json"
import { SiteHeader } from "@/components/misc/site-header"
import { getAllTimeTotalWordcount } from "@/api/project.api";
import { getUser } from "@/api/user.api";
import { AllDashboardData } from "@/types";
import { redirect } from "next/navigation";
import { getAllWordsGivenTime, getTotalWordcountGivenDate } from "@/api/words.api";
import { startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subWeeks, subYears } from "date-fns";
import { get356DayWordcounts } from "@/lib/utils";

export default async function Dashboard() {
  
  const user = await getUser();
  if (!user) redirect('/login');

  const today = new Date();

  const yearDaysWordcounts = await getAllWordsGivenTime(user.id, '365d');

  const alltimeTotalWordcount = await getAllTimeTotalWordcount(user.id) || 0;
  const yearTotalWordcount = await getTotalWordcountGivenDate(today, 'year') || 0;
  const monthTotalWordcount = await getTotalWordcountGivenDate(today, 'month') || 0;
  const weekTotalWordcount = await getTotalWordcountGivenDate(today, 'week') || 0;
  const dayTotalWordcount = await getTotalWordcountGivenDate(today, 'day') || 0;

  // Get comparison dates using date-fns
  const lastYearStart = startOfYear(subYears(today, 1));
  const lastMonthStart = startOfMonth(subMonths(today, 1));
  const lastWeekStart = startOfWeek(subWeeks(today, 1));
  const yesterdayStart = subDays(today, 1);

  // Total word counts for comparison dates
  const lastYearTotalWordcount = await getTotalWordcountGivenDate(lastYearStart, 'year') || 0;
  const lastMonthTotalWordcount = await getTotalWordcountGivenDate(lastMonthStart, 'month') || 0;
  const lastWeekTotalWordcount = await getTotalWordcountGivenDate(lastWeekStart, 'week') || 0;
  const yesterdayTotalWordcount = await getTotalWordcountGivenDate(yesterdayStart, 'day') || 0;

  // Years word counts mapped to dates
  const yearDaysWordcountsFullAray = yearDaysWordcounts ? get356DayWordcounts(yearDaysWordcounts) : [];

  const dashboardData: AllDashboardData = {
    alltimeTotalWordcount,
    yearTotalWordcount,
    monthTotalWordcount,
    weekTotalWordcount,
    dayTotalWordcount,
    lastYearTotalWordcount,
    lastMonthTotalWordcount,
    lastWeekTotalWordcount,
    yesterdayTotalWordcount
  }
  
  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DashboardWordTotalCards dashboardData={dashboardData} user={user}/>
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive data={yearDaysWordcountsFullAray}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
