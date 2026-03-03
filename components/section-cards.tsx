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
import { AllDashboardData, User } from "@/types"
import { differenceInDays, startOfMonth, startOfWeek, startOfYear } from "date-fns"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

interface DashboardWordTotalCardsProps {
  dashboardData: AllDashboardData;
  user: User;
}

export function DashboardWordTotalCards({ dashboardData, user }: DashboardWordTotalCardsProps) {
  const { alltimeTotalWordcount,
    yearTotalWordcount,
    monthTotalWordcount,
    weekTotalWordcount } = dashboardData;
  
  const { createdAt, yearlyWordGoal, monthlyWordGoal, weeklyWordGoal } = user;

  const today = new Date();
  const startOfThisYear = startOfYear(today);
  const startOfThisMonth = startOfMonth(today);
  const startOfThisWeek = startOfWeek(today);

  // to get total wordcount
  // i need to know when the user made their account
  const daysActive = differenceInDays(today, createdAt);
  const alltimeAverageWordsPerDay = Math.ceil(alltimeTotalWordcount / daysActive);

  // needs to be up to this date
  const daysThisYear = differenceInDays(today, startOfThisYear);
  const yearAverageWordsPerDay = Math.ceil(yearTotalWordcount / daysThisYear);

  const daysThisMonth = differenceInDays(today, startOfThisMonth);
  const monthAverageWordsPerDay = Math.ceil(monthTotalWordcount / daysThisMonth);

  const daysThisWeek = differenceInDays(today, startOfThisWeek);
  const weekAverageWordsPerDay = Math.ceil(weekTotalWordcount / daysThisWeek);


  // need to calculate percentage of user's goals
  // (currentWordCount / goal) * 100;
  const percentOfYearlyGoal = Math.ceil((yearTotalWordcount / yearlyWordGoal) * 100);
  const percentOfMonthlyGoal = Math.ceil((monthTotalWordcount / monthlyWordGoal) * 100);
  const percentOfWeeklyGoal = Math.ceil((weekTotalWordcount / weeklyWordGoal) * 100);


  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>All Time Words</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { alltimeTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +XX.X%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            { alltimeAverageWordsPerDay.toLocaleString() } Average Words Per Day
          </div>
          <div className="text-muted-foreground">
            That's a lot of words.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Words This Year</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { yearTotalWordcount.toLocaleString() }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon
              />
              -XX%
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
              <TrendingUpIcon
              />
              +XX.X%
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
              <TrendingUpIcon
              />
              +X.X%
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
    </div>
  )
}
