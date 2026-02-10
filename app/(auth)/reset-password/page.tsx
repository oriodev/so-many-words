'use client'

import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { useState } from "react"

export default function PasswordReset() {
  const supabase = createBrowserSupabase();
  const [error, setError] = useState<string | undefined>();

  async function handlePasswordReset(
    new_password: string, 
  ) {
    const { error } = await supabase.auth.updateUser({
      password: new_password
    })

    if (error) {
      setError(error?.message);
    } else {
      setError("Password updated! Return to login.")
    }
  }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <ResetPasswordForm handlePasswordReset={handlePasswordReset} error={error} />
      </div>
    </div>
  )
}