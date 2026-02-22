import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProgressBadge } from "@/lib/badges.utils";
import { AllProjectData } from "@/types";
import { differenceInCalendarDays } from "date-fns";


interface ProjectProgressCardProps {
  allProjectData: AllProjectData
}

export default function ProjectProgressCard({
  allProjectData
}: ProjectProgressCardProps ) {
  const { project, totalWordsWritten, wordsLeftToWrite, initialWordsPerDay, projectPercentageCompleted } = allProjectData;
  const { wordcountGoal, projectStartDate } = project;

  const wordsProgressTitle = totalWordsWritten > wordcountGoal ?
    `${ Math.abs(wordsLeftToWrite).toLocaleString() } Words Over!` :
    `${ wordsLeftToWrite.toLocaleString() } Words Left`;

  const currentDay = differenceInCalendarDays(new Date(), projectStartDate) + 1;
  const expectedWordcount = currentDay * initialWordsPerDay;

  const progressBadge = getProgressBadge(totalWordsWritten, wordcountGoal, expectedWordcount);




  return (
    <Card className="@container/card w-full flex flex-col justify-between">
      <CardHeader>
        <CardDescription>{totalWordsWritten.toLocaleString()} words written so far!</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          { wordsProgressTitle }
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between gap-1.5 text-sm">
        <div>
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            {projectPercentageCompleted}% Completed
          </div>
          <div className="text-muted-foreground">
          </div>
        </div>
        <CardAction>
          <Badge 
            variant="outline" 
            className="p-5" 
            style={{ backgroundColor: progressBadge.colour }}
          >
            < progressBadge.icon />
            { progressBadge.text }
          </Badge>
        </CardAction>
      </CardFooter>
    </Card>
  )
}