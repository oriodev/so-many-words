'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/utils";
import { Project } from "@/types";
import { addDays, isAfter, isBefore, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getWords } from "@/lib/words.utils";

interface DailyProgressCardProps {
  project: Project;
  userId: string;
}

export default function DailyProgressCard({
  project, userId
}: DailyProgressCardProps ) {
  
  // HANDLE DATES
  // CHANGE THIS TO PROJECT ID NOT ID
  const { projectStartDate, projectEndDate, slug } = project;

  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [wordcount, setWordcount] = useState<number>(0);

  useEffect(() => {
    const fetchWordcount = async () => {
      const fetchedWordcount = await getWords(userId, slug, date.toDateString());
      if (!fetchedWordcount || !fetchedWordcount.wordcount) {
        setWordcount(0);
        return;
      }

      setWordcount(fetchedWordcount.wordcount);
    }

    fetchWordcount();
  }, [date])

  const onTomorrow = () => {
    const tomorrow = addDays(date, 1);
    const endDate = new Date(projectEndDate);

    const dateBefore = isBefore(tomorrow, endDate);
    const dateEqual = tomorrow.toDateString() === endDate.toDateString();

    if (dateBefore || dateEqual) {
      setDate(tomorrow);
    }
  }

  const onYesterday = () => {
    const yesterday = addDays(date, -1);
    const startDate = new Date(projectStartDate);

    const dateAfter = isAfter(yesterday, startDate);
    const dateEqual = yesterday.toDateString() === startDate.toDateString();

    if (dateAfter || dateEqual) {
      setDate(yesterday);
    }
  }

  const canGoBackward = isAfter(date, new Date(projectStartDate));
  const canGoForward = isBefore(date, new Date(projectEndDate));


  // HANDLE UPDATING WORDS

  const formSchema = z.object({
    wordCount: z
      .number()
      .min(0, "Word count must be at least 0.")
      .int("Word count must be a whole number."),
  });

   const { control, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wordCount: wordcount
    },
    mode: "onSubmit",
    shouldUnregister: false,
  });

   const handleUpdate = (data: { wordCount: number }) => {
    console.log("Word Count Updated: ", data.wordCount);
  };


  return (
    <Card className="@container/card w-full">
      <CardHeader className="flex justify-center items-center">
        <ChevronLeft
          size={30} 
          className={`${canGoBackward ? 'hover:cursor-pointer hover:opacity-80 transition' : 'opacity-50 text-gray-400 cursor-default'}`}
          onClick={canGoBackward ? onYesterday : undefined}
        />
        <CardTitle className="no-highlight text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          { formatDate(date) }
        </CardTitle>
        <ChevronRight
          size={30} 
          className={`${canGoForward ? "hover:cursor-pointer hover:opacity-80 transition" : 'opacity-50 text-gray-400 cursor-default'}`}
          onClick={canGoForward ? onTomorrow : undefined}
        />
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-1 justify-center items-center pt-3">
        {/* <h2 className="text-4xl">1000 Words Today</h2> */}
        
        <FieldGroup className="w-1/3 flex flex-row gap-2">
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
          <Button className="rounded-lg bg-cyan-900 hover:bg-cyan-700" onClick={handleSubmit(handleUpdate)}>
            Update
          </Button>
        </FieldGroup>
        

        <Field className="w-2/3">
            <FieldLabel htmlFor="progress-upload">
              <span className="ml-auto">66%</span>
            </FieldLabel>
            <Progress value={100} id="progress-upload" className="h-[15px]"/>
          </Field>
      </CardContent>
    </Card>
  )
}