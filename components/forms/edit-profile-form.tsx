'use client'

import { ProfileSchema, User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod";
import router, { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateProfile } from "@/lib/profile.utils";

interface EditProfileFormProps {
  user: User;
}

const formSchema = z.object({
  yearlyWordGoal: z
    .number()
    .min(1, "Yearly wordcount goal must be at least 1 word."),
  monthlyWordGoal: z
    .number()
    .min(1, "Monthly wordcount goal must be at least 1 word."),
  weeklyWordGoal: z
    .number()
    .min(1, "Weekly wordcount goal must be at least 1 word."),
  dailyWordGoal: z
    .number()
    .min(1, "Daily wordcount goal must be at least 1 word.")
});

export function EditProfileForm({ user }: EditProfileFormProps) {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearlyWordGoal: user.yearlyWordGoal || 0,
      monthlyWordGoal: user.monthlyWordGoal || 0,
      weeklyWordGoal: user.weeklyWordGoal || 0,
      dailyWordGoal: user.dailyWordGoal || 0,
    },
  });
  
  const { watch } = form;
  const yearlyWordGoal = watch("yearlyWordGoal");
  const monthlyWordGoal = watch("monthlyWordGoal");
  const weeklyWordGoal = watch("weeklyWordGoal");
  const dailyWordGoal = watch("dailyWordGoal");

  const monthlyBasedOnYearly = Math.ceil(yearlyWordGoal / 12);
  const weeklyBasedOnYearly = Math.ceil(yearlyWordGoal / 52);
  const dailyBasedOnYearly = Math.ceil(yearlyWordGoal / 365);

  const yearlyBasedOnMonthly = Math.ceil(monthlyWordGoal * 12);
  const weeklyBasedOnMonthly = Math.ceil(yearlyBasedOnMonthly / 52);
  const dailyBasedOnMonthly = Math.ceil(yearlyBasedOnMonthly / 365);

  const yearlyBasedOnWeekly = Math.ceil(weeklyWordGoal * 52);
  const monthlyBasedOnWeekly = Math.ceil(yearlyBasedOnWeekly / 12);
  const dailyBasedOnWeekly = Math.ceil(yearlyBasedOnWeekly / 365);

  const yearlyBasedOnDaily = Math.ceil(dailyWordGoal * 365);
  const monthlyBasedOnDaily = Math.ceil(yearlyBasedOnDaily / 12);
  const weeklyBasedOnDaily = Math.ceil(yearlyBasedOnDaily / 52);

  async function onSubmit(data: z.infer<typeof formSchema>) {

    const updatedProfile = {
      id: user.id,
      ...data
    } as ProfileSchema;

    const editedProfile = await updateProfile(updatedProfile);
    if (editedProfile) {
      router.push('/profile');
    }
  }

  return (
    <div className="w-full lg:w-1/2 p-10 flex flex-col gap-10">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* YEARLY WORD GOAL */}
          <Controller
              name="yearlyWordGoal"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Yearly Word Goal
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
                    <b>{ monthlyBasedOnYearly.toLocaleString() }</b> words a month, <b>{ weeklyBasedOnYearly.toLocaleString() }</b> words a week, and <b>{ dailyBasedOnYearly.toLocaleString() }</b> words per day.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
            />

          {/* MONTHLY WORD GOAL */}
          <Controller
              name="monthlyWordGoal"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Monthly Word Goal
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
                    <b>{ yearlyBasedOnMonthly.toLocaleString() }</b> words a year, <b>{ weeklyBasedOnMonthly.toLocaleString() }</b> words a week, and <b>{ dailyBasedOnMonthly.toLocaleString() }</b> words per day.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
            />

          {/* WEEKLY WORD GOAL */}
          <Controller
              name="weeklyWordGoal"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Weekly Word Goal
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
                    <b>{ yearlyBasedOnWeekly.toLocaleString() }</b> words a year, <b>{ monthlyBasedOnWeekly.toLocaleString() }</b> words a month, and <b>{ dailyBasedOnWeekly.toLocaleString() }</b> words per day.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
            />

          {/* DAILY WORD GOAL */}
          <Controller
              name="dailyWordGoal"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Daily Word Goal
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
                    <b>{ yearlyBasedOnDaily.toLocaleString() }</b> words a year, <b>{ monthlyBasedOnDaily.toLocaleString() }</b> words a month, and <b>{ weeklyBasedOnDaily.toLocaleString() }</b> words per week.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}}
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