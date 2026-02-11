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
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createProject } from "@/lib/project.utils"
import { useRouter } from "next/navigation"
import { Project } from "@/types"

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Project title must be at least 1 character.")
    .max(100, "Project title must be at most 100 characters."),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters."),
})

export function CreateProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data: ', data);
    const project = await createProject(data) as Project | null;
    if (project) {
      router.push(`/projects/project/${project.slug}`);
    }

  }

  return (
    <div className="p-10 flex flex-col gap-10">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
