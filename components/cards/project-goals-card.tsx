import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/utils";
import { Pen, PartyPopper } from "lucide-react"

interface ProjectGoalsCardProps {
  projectStartDate: string;
  projectEndDate: string;
  wordcountGoal: number;
  wordsPerDay: number;
  durationDays: number;
}

export default function ProjectGoalsCard({
  projectStartDate,
  projectEndDate,
  wordcountGoal,
  wordsPerDay,
  durationDays
}: ProjectGoalsCardProps ) {
  return (
    <Card className="@container/card w-full flex flex-col justify-between">
      <CardHeader>
        <CardDescription>Between {formatDate(projectStartDate)} and {formatDate(projectEndDate)}, you are aiming to write:</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {wordcountGoal.toLocaleString()} Words
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between gap-1.5 text-sm">
        <div>
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            <Pen size={15} />
            {wordsPerDay.toLocaleString()} word{wordsPerDay !== 1 ? 's' : ''} per day
          </div>
          <div className="text-muted-foreground">
            Over {durationDays.toLocaleString()} day{durationDays !== 1 ? 's' : ''}
          </div>
        </div>
        <CardAction>
          <Badge variant="outline" className="p-5">
            <PartyPopper />
            On Track
          </Badge>
        </CardAction>
      </CardFooter>
    </Card>
  )
}