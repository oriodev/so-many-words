'use client'

import { LoginForm } from "@/components/login-form"
import { createBrowserSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Login() {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  async function handleLogin(
    email: string, 
    password: string,
  ) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data?.session) {
      router.replace('/dashboard');
    } else {
      setError(error?.message);
    }
  }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm handleLogin={handleLogin} error={error} />
      </div>
    </div>
  )
}