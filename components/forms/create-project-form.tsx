"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { createProject } from "@/lib/project.utils"
import { useRouter } from "next/navigation"
import { Project } from "@/types"
import { useProjectsStore } from "@/lib/providers/projects-store-provider"

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Project title must be at least 1 character.")
    .max(100, "Project title must be at most 100 characters."),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters."),
  wordcountGoal: z
    .number()
    .min(1, "Wordcount goal must be at least 1 word."),
  projectStartDate: z
    .date()
    .refine((startDate) => !isNaN(startDate.getTime()), {
      message: "Start date must be valid.",
    }),
  projectEndDate: z
    .date()
    .refine((endDate) => !isNaN(endDate.getTime()), {
      message: "End date must be valid.",
    })
}).refine((data) => data.projectEndDate > data.projectStartDate, {
  message: "End date must be after the start date.",
  path: ["projectEndDate"],
});

export function CreateProjectForm() {
  const today = new Date();
  const in30Days = new Date();
  in30Days.setDate(today.getDate() + 30);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      wordcountGoal: 1,
      projectStartDate: today,
      projectEndDate: in30Days
    },
  })

  const { watch } = form;
  const projectStartDate = watch("projectStartDate");
  const projectEndDate = watch("projectEndDate");
  const wordcountGoal = watch("wordcountGoal");
  const durationDays = projectStartDate && projectEndDate 
    ? Math.ceil((projectEndDate.getTime() - projectStartDate.getTime()) / (1000 * 3600 * 24)) + 1 
    : 0;
  const wordsPerDay = wordcountGoal && durationDays 
    ? Math.ceil(wordcountGoal / durationDays) : 0;

  const router = useRouter();
  const { addProject } = useProjectsStore((state) => state);
  

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const project = await createProject(data) as Project | null;
    if (project) {
      addProject(project);
      router.push(`/projects/project/${project.slug}`);
    }

  }

  return (
    <div className="p-10 flex flex-col gap-10">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          
          <FieldGroup>
            {/* TITLE */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Project Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* DESCRIPTION */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/200 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    The plot, the characters, the things you stay up all night thinking about.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* WORD COUNT GOAL */}
            <Controller
              name="wordcountGoal"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Wordcount Goal
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                  />
                  <FieldDescription>
                    How many words are you aiming for? You can update this later, don't worry :)
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
            />

          <div className="flex flex-col sm:flex-row gap-5">
            {/* PROJECT START DATE */}
            <Controller
              name="projectStartDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-start-date">
                    Project Start Date
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="form-rhf-demo-start-date"
                      value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                          field.onChange(date);
                        }
                      }}
                      placeholder="YYYY-MM-DD"
                    />
                    <InputGroupAddon align="inline-end">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            aria-label="Select date"
                            className="w-8 h-8"
                          >
                            <CalendarIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* PROJECT END DATE */}
            <Controller
              name="projectEndDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-start-date">
                    Project End Date
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="form-rhf-demo-start-date"
                      value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                          field.onChange(date);
                        }
                      }}
                      placeholder="YYYY-MM-DD"
                    />
                    <InputGroupAddon align="inline-end">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            aria-label="Select date"
                            className="w-8 h-8"
                          >
                            <CalendarIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Project Duration Description */}
          <FieldDescription>
            That gives you {durationDays} day{durationDays !== 1 ? 's' : ''} at {wordsPerDay.toLocaleString()} words per day{wordsPerDay !== 1 ? 's' : ''}!
          </FieldDescription>
          

          </FieldGroup>
        </form>

        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()} className="hover:cursor-pointer">
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" className="hover:cursor-pointer">
            Submit
          </Button>
        </Field>
    </div>
  )
}
