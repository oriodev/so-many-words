'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  handlePasswordReset: (password: string) => void;
  error: string | undefined;
}

export function ResetPasswordForm({
  className,
  handlePasswordReset,
  error,
  ...props
}: ResetPasswordFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    handlePasswordReset(password);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Your Password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter Your New Password
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <p id="errors" className="text-xs italic text-rose-800">{error}</p>
                <Button type="submit">Reset Password</Button>
              </Field>
              
              <FieldDescription className="text-center">
                Done Resetting? <a href="/login">Login</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <div className="min-h-full w-full bg-[#020617] relative">
                {/* Cosmic Aurora */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
                      radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
                      radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
                    `,
                  }}
                />
                {/* Your Content/Components */}
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
