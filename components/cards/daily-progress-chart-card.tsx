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


// NOT COMPONENTS
import { AllProjectData } from "@/types";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// PROPS
interface DailyProgressChartCardProps {
  allProjectData: AllProjectData;
}

// FUNCTION
export default function DailyProgressChartCard({
  allProjectData
}: DailyProgressChartCardProps) {
  // GRAB WHAT WE NEED FROM PROJECT DATA
  const { projectedAndActualWordcounts: chartData } = allProjectData;

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

const largestLabel = chartData.length > 0
  ? (chartData[chartData.length - 1]['projectedWordcount'] > chartData[chartData.length - 1]['actualWordcount']
      ? 'projectedWordcount'
      : 'actualWordcount')
  : 'projectedWordcount';

  return (
    <Card className="@container/card w-full">
      <CardHeader className="w-full flex justify-center items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle>Look how many words you've written!</CardTitle>
          <CardDescription>
            That's crazy bro.
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
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => format(value, 'dd/MM')}
            />
            <YAxis
              dataKey={largestLabel}
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => parseInt(value).toLocaleString()}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
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
