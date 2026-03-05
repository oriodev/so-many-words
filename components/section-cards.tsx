"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPercentChangesAndIcons, safeDivide } from "@/lib/utils"
import { AllDashboardData, User } from "@/types"
import { differenceInDays, startOfMonth, startOfWeek, startOfYear } from "date-fns"
import React from "react"

interface DashboardWordTotalCardsProps {
  dashboardData: AllDashboardData;
  user: User;
}

export function DashboardWordTotalCards({ dashboardData, user }: DashboardWordTotalCardsProps) {
  // IMPORT DATA
  const { yearTotalWordcount, monthTotalWordcount, weekTotalWordcount, dayTotalWordcount,
    lastYearTotalWordcount, lastMonthTotalWordcount, lastWeekTotalWordcount, yesterdayTotalWordcount
   } = dashboardData;
  const { yearlyWordGoal, monthlyWordGoal, weeklyWordGoal, dailyWordGoal } = user;

  // GET DATES
  const today = new Date();
  const startOfThisYear = startOfYear(today);
  const startOfThisMonth = startOfMonth(today);
  const startOfThisWeek = startOfWeek(today);

  // GET WORDS PER DAY AVERAGES
  const daysThisYear = differenceInDays(today, startOfThisYear);
  const yearAverageWordsPerDay = Math.ceil(yearTotalWordcount / daysThisYear);

  const daysThisMonth = differenceInDays(today, startOfThisMonth);
  const monthAverageWordsPerDay = Math.ceil(monthTotalWordcount / daysThisMonth);

  const daysThisWeek = differenceInDays(today, startOfThisWeek);
  const weekAverageWordsPerDay = Math.ceil(weekTotalWordcount / daysThisWeek);


  // GET GOAL PROGRESS PERCENTAGES
  const percentOfYearlyGoal = safeDivide(yearTotalWordcount, yearlyWordGoal);
  const percentOfMonthlyGoal = safeDivide(monthTotalWordcount, monthlyWordGoal);
  const percentOfWeeklyGoal = safeDivide(weekTotalWordcount, weeklyWordGoal);
  const percentOfDailyGoal = safeDivide(dayTotalWordcount, dailyWordGoal);


  // GET PERCENT CHANGES AND ICONS
  const { percent: yearChangePercent, icon: YearChangeIcon } = getPercentChangesAndIcons(yearTotalWordcount, lastYearTotalWordcount);
  const { percent: monthChangePercent, icon: MonthChangeIcon } = getPercentChangesAndIcons(monthTotalWordcount, lastMonthTotalWordcount);
  const { percent: weekChangePercent, icon: WeekChangeIcon } = getPercentChangesAndIcons(weekTotalWordcount, lastWeekTotalWordcount);
  const { percent: dayChangePercent, icon: DayChangeIcon } = getPercentChangesAndIcons(dayTotalWordcount, yesterdayTotalWordcount);


  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Words This Year</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { yearTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <YearChangeIcon />
              {yearChangePercent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            { yearAverageWordsPerDay.toLocaleString() } Average Words Per Day
          </div>
          <div className="text-muted-foreground">
            { percentOfYearlyGoal.toLocaleString() }% of {yearlyWordGoal.toLocaleString()} Word Goal
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Words This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { monthTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <MonthChangeIcon />
              {monthChangePercent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            { monthAverageWordsPerDay.toLocaleString() } Average Words Per Day
          </div>
          <div className="text-muted-foreground">
            { percentOfMonthlyGoal.toLocaleString() }% of {monthlyWordGoal.toLocaleString()} Word Goal
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Words This Week</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { weekTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <WeekChangeIcon />
              {weekChangePercent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            { weekAverageWordsPerDay.toLocaleString() } Average Words Per Day
          </div>
          <div className="text-muted-foreground">
            { percentOfWeeklyGoal.toLocaleString() }% of {weeklyWordGoal.toLocaleString()} Word Goal
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Words Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { dayTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <DayChangeIcon />
              {dayChangePercent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Your projects await you.
          </div>
          <div className="text-muted-foreground">
            { percentOfDailyGoal.toLocaleString() }% of {dailyWordGoal.toLocaleString()} Word Goal
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
