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

interface SendPasswordResetEmailFormProps extends React.ComponentProps<"div"> {
  handleSendPasswordResetEmail: (email: string) => void;
  error: string | undefined;
}

export function SendPasswordResetEmailForm({
  className,
  handleSendPasswordResetEmail,
  error,
  ...props
}: SendPasswordResetEmailFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    handleSendPasswordResetEmail(email);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Get Password Reset Email</h1>
                <p className="text-muted-foreground text-balance">
                  Enter Your Email
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <p id="errors" className="text-xs italic text-rose-800">{error}</p>
                <Button type="submit">Send Email</Button>
              </Field>
              
              <FieldDescription className="text-center">
                Remembered Your Password? <a href="/login">Login</a>
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
