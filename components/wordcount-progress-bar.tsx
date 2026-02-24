import { Field, FieldLabel } from "./ui/field";
import { Progress } from "./ui/progress";

interface WordcountProgressBarProps {
  percentageComplete: number;
}

export function WordcountProgressBar({ percentageComplete }: WordcountProgressBarProps) {
    
  
  return (
    <Field className="w-2/3">
      <FieldLabel htmlFor="progress-upload">
        <span className="ml-auto">{percentageComplete}%</span>
      </FieldLabel>
      <Progress value={percentageComplete} id="progress-upload" className="h-[15px]" />
    </Field>
  )
}