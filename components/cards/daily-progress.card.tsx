// COMPONENTS
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// NOT COMPONENTS
import { formatDate, getPercentageCompleted, getUpdatedWordcountGoalForGivenDay } from "@/lib/utils";
import { AllProjectData, Words, WordsSchema } from "@/types";
import { addDays, differenceInCalendarDays, differenceInDays, isAfter, isBefore, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWords, updateWord } from "@/lib/words.utils";

// PROPS
interface DailyProgressCardProps {
  userId: string;
  allProjectData: AllProjectData;
}

// FUNCTION
export default function DailyProgressCard({
  userId,
  allProjectData
}: DailyProgressCardProps) {
  // GRAB WHAT WE NEED FROM PROJECT DATA
  const { projectedAndActualWordcounts, project, wordCounts, initialWordsPerDay, currentWordsPerDay, setWordCounts, setTotalWordsWritten } = allProjectData;
  const { projectStartDate, projectEndDate, id: projectId, wordcountGoal } = project;
  
  // HANDLE DATES
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  // HANDLES BACK AND FORTH BUTTONS
  const onTomorrow = () => {
    const tomorrow = addDays(date, 1);
    const endDate = new Date(projectEndDate);
    if (isBefore(tomorrow, endDate) || tomorrow.toDateString() === endDate.toDateString()) {
      setDate(tomorrow);
    }
  };

  const onYesterday = () => {
    const yesterday = addDays(date, -1);
    const startDate = new Date(projectStartDate);
    if (isAfter(yesterday, startDate) || yesterday.toDateString() === startDate.toDateString()) {
      setDate(yesterday);
    }
  };

  // USED FOR STYLING AND DISABLING BUTTONS
  const canGoBackward = isAfter(date, new Date(projectStartDate));
  const canGoForward = isBefore(date, new Date(projectEndDate));

  // HANDLE WORDCOUNTS
  const matchedWordcount = wordCounts.find((word) => isSameDay(date, word.date));
  const initialWordCount = matchedWordcount ? matchedWordcount.wordcount : 0;
  
  // GET UPDATED WORD COUNT GOAL FOR GIVEN DAY
  const updatedwordcountGoalForGivenDay = getUpdatedWordcountGoalForGivenDay(
    projectEndDate,
    date,
    projectedAndActualWordcounts,
    wordcountGoal
  );
  
  // GET PERCENTAGE COMPLETED PER DAY
  const percentageComplete = getPercentageCompleted(updatedwordcountGoalForGivenDay, matchedWordcount?.wordcount || 0);
  const dailyWordgoalText = updatedwordcountGoalForGivenDay > 0
    ? `Write ${ updatedwordcountGoalForGivenDay } words to stay on track`
    : `You've already won! Write whatever you like <3`;


  // SET UP THE INPUT FORM
  const formSchema = z.object({
    wordCount: z
      .number()
      .min(0, "Word count must be at least 0.")
      .int("Word count must be a whole number."),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { wordCount: initialWordCount },
    mode: "onSubmit",
    shouldUnregister: false,
  });

  // UPDATE THE DEFAULT VALUE IN INPUT WHEN WE SWITCH DAYS
  useEffect(() => {
    reset({ wordCount: matchedWordcount ? matchedWordcount.wordcount : 0 });
  }, [date, matchedWordcount, reset]);

  // HANDLES UPDATING A WORDCOUNT (SUBMIT ON INPUT)
  const handleUpdate = async (data: { wordCount: number }) => {

    // IF THERE IS A WORDCOUNT ENTRY ALREADY
    if (matchedWordcount) {
      const previousWordCount = matchedWordcount.wordcount;

      // UPDATE IT IN DB
      const response = await updateWord(matchedWordcount.id, data.wordCount);
      if (!response) return;

      // AND THEN UPDATE IT IN STATE
      setWordCounts((prevCounts) =>
        prevCounts.map((word) =>
          word.id === matchedWordcount.id ? { ...word, wordcount: data.wordCount } : word
        )
      );

      setTotalWordsWritten((prevTotal) => prevTotal - previousWordCount + data.wordCount);
    
      // IF THERE IS NO WORDCOUNT ENTRY IN DB
    } else {
      // UPDATE IN DB
      const newWords: WordsSchema = {
        projectId,
        wordcount: data.wordCount,
        date
      }
      const response: Words | null = await createWords(newWords);
      if (!response) return;

      // UPDATE IN STATE
      setWordCounts((prevCounts) => [...prevCounts, { ...response }]);
      setTotalWordsWritten((prevTotal) => prevTotal + data.wordCount); 
    }
  };

  return (
    <Card className="@container/card w-full">
      <CardHeader className="w-full flex flex-col gap-2 items-center">

        <div className="w-full flex justify-center items-center">
          {/* ARROWS AND DATE */}
          <ChevronLeft
            size={30}
            className={`${canGoBackward ? 'hover:cursor-pointer hover:opacity-80 transition' : 'opacity-50 text-gray-400 cursor-default'}`}
            onClick={canGoBackward ? onYesterday : undefined}
          />
          <CardTitle className="no-highlight text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatDate(date)}
          </CardTitle>
          <ChevronRight
            size={30}
            className={`${canGoForward ? "hover:cursor-pointer hover:opacity-80 transition" : 'opacity-50 text-gray-400 cursor-default'}`}
            onClick={canGoForward ? onTomorrow : undefined}
          />

        </div>

        <div>
          <p>{ dailyWordgoalText }</p>
        </div>
      </CardHeader>

      {/* WORDCOUNT INPUT */}
      <CardContent className="w-full flex flex-col gap-1 justify-center items-center pt-3">
        
        {/* SELECT */}
        <FieldGroup className="w-1/3 flex flex-row justify-center gap-2">
          <Select defaultValue="words_today">
            <SelectTrigger aria-invalid className="rounded-lg bg-cyan-900">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="words_today">Words Today</SelectItem>
                <SelectItem value="total_words">Total Words</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* INPUT */}
          <Controller
            name="wordCount"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <Input
                  {...field}
                  type="number"
                  className="rounded-lg"
                  placeholder="Enter word count"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
                {fieldState.invalid && (
                  <span className="text-red-600">{fieldState.error?.message}</span>
                )}
              </div>
            )}
          />

          {/* BUTTON */}
          <Button className="rounded-lg bg-cyan-900 hover:bg-cyan-700" onClick={handleSubmit(handleUpdate)}>
            Update
          </Button>
        </FieldGroup>

        {/* PROGRESS BAR */}
        <Field className="w-2/3">
          <FieldLabel htmlFor="progress-upload">
            <span className="ml-auto">{percentageComplete}%</span>
          </FieldLabel>
          <Progress value={percentageComplete} id="progress-upload" className="h-[15px]" />
        </Field>
      </CardContent>
    </Card>
  );
}
