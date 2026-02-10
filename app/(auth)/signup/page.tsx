'use client'

import { SignupForm } from "@/components/forms/signup-form"
import { createBrowserSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
    const supabase = createBrowserSupabase();
      const router = useRouter();

    const [error, setError] = useState<string | undefined>();

    async function handleSignup(email: string, username: string, password: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      })

      if (data?.user) {
        router.push('/dashboard');
      }
     else {
      setError(error?.message);
     }
    }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm handleSignup={handleSignup} error={error} />
      </div>
    </div>
  )
}
