"use client"

// COMPONENTS
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCombineProjectedAndActualWordcountArrays } from "@/lib/utils";

// NOT COMPONENTS
import { AllProjectData } from "@/types";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

// PROPS
interface DailyProgressChartCardProps {
  allProjectData: AllProjectData;
}

// FUNCTION
export default function DailyProgressChartCard({
  allProjectData
}: DailyProgressChartCardProps) {
  // GRAB WHAT WE NEED FROM PROJECT DATA
  const { project, durationDays, projectedDailyWordcounts, actualDailyWordcounts } = allProjectData;
  const { projectStartDate } = project;

  const chartData = getCombineProjectedAndActualWordcountArrays(projectedDailyWordcounts, actualDailyWordcounts);

  const chartConfig = {
    words: {
      label: "Words",
    },
    projectedWordcount: {
      label: "Projected",
      color: "var(--chart-1)",
    },
    actualWordcount: {
      label: "Actual",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const [timeRange, setTimeRange] = useState(`${durationDays}d`);
  
  return (
    <Card className="@container/card w-full">
      <CardHeader className="w-full flex justify-center items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            Showing words vs projected words
          </CardDescription>
        </div>
      </CardHeader>

      {/* CHART */}
      <CardContent className="">
        <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="projectedWordcount"
              type="monotone"
              stroke="var(--color-projectedWordcount)"
              strokeWidth={5}
              dot={false}
            />
            <Line
              dataKey="actualWordcount"
              type="monotone"
              stroke="var(--color-actualWordcount)"
              strokeWidth={5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
