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
import { AllProjectData } from "@/types";
import { Pen, PartyPopper } from "lucide-react"

interface ProjectProgressCardProps {
  allProjectData: AllProjectData
}

export default function ProjectProgressCard({
  allProjectData
}: ProjectProgressCardProps ) {
  const { totalWordsWritten, wordsLeftToWrite, projectPercentageCompleted } = allProjectData;

  return (
    <Card className="@container/card w-full flex flex-col justify-between">
      <CardHeader>
        <CardDescription>{totalWordsWritten.toLocaleString()} words written so far!</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          { wordsLeftToWrite.toLocaleString() } words left
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between gap-1.5 text-sm">
        <div>
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            {projectPercentageCompleted}% Completed
          </div>
          <div className="text-muted-foreground">
            xxx days left
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