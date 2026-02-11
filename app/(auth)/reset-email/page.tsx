'use client'

import { SendPasswordResetEmailForm } from "@/components/forms/send-password-reset-email-form";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { useState } from "react"

export default function PasswordResetEmail() {
  const supabase = createBrowserSupabase();
  const [error, setError] = useState<string | undefined>();

  async function handleSendPasswordResetEmail(
    email: string, 
  ) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`
    })

    if (error) {
      setError(error?.message);
    } else {
      setError("Email sent! Check your inbox.")
    }
  }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SendPasswordResetEmailForm handleSendPasswordResetEmail={handleSendPasswordResetEmail} error={error} />
      </div>
    </div>
  )
}