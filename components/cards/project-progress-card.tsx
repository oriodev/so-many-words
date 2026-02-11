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

interface ProjectProgressCardProps {

}

export default function ProjectProgressCard({
  
}: ProjectProgressCardProps ) {
  return (
    <Card className="@container/card w-full flex flex-col justify-between">
      <CardHeader>
        <CardDescription>Before xxx of xxx, xxxx, you need to write:</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          BIG NUMBER more words
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between gap-1.5 text-sm">
        <div>
          <div className="line-clamp-1 flex gap-2 font-medium items-center">
            xxxx words per day
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