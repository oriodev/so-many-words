// app/api/projects/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(projects);
}
